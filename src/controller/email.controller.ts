import { Transporter } from 'nodemailer'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { SubscribeInput } from '../schema/email.schema'
import { getBTCUAHRate } from '../service/rate/rate.service'
import { getEmails, addNewEmail } from '../service/email/email.service'
import { getTransporter, sendRateUpdates } from '../service/sender/sender.service'
import { SendingMailError, InvalidTransporterError } from '../common/exceptions/exceptions'


export async function subscribeHandler(
  req: Request<{}, {}, {}, SubscribeInput['query']>,
  res: Response
) {

  const isAdded: boolean = await addNewEmail(req.query.email)

  return res.sendStatus(isAdded ? StatusCodes.OK : StatusCodes.CONFLICT)
}

export async function sendEmailsHandler(req: Request, res: Response) {

  try {
    const emails: string[] = await getEmails()
    const transporter: Transporter = await getTransporter()
    const price: number = await getBTCUAHRate()

    const sendingResults = await sendRateUpdates(transporter, price, emails)
    const rejectedResults = sendingResults.filter(res => res.status == 'rejected') as PromiseRejectedResult[]
    const failedEmails = rejectedResults.map(res => (res.reason as SendingMailError).email)

    return res.send({ failed: failedEmails })
  } catch (err) {
    if (err instanceof InvalidTransporterError)
      console.log('SMTP Transporter is invalid!')

    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}