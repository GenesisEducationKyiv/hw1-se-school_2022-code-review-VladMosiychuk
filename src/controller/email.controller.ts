import { Transporter } from 'nodemailer'
import { Request, Response } from 'express'
import { getRate } from '../service/rate.service'
import { SubscribeInput } from '../schema/email.schema'
import { getEmails, addNewEmail } from '../service/email.service'
import { getTransporter, sendRateUpdate } from '../service/sender.service'


export async function subscribeHandler(
  req: Request<{}, {}, {}, SubscribeInput['query']>,
  res: Response
) {

  const isAdded: boolean = await addNewEmail(req.query.email)

  return res.sendStatus(isAdded ? 200 : 409)
}

export async function sendEmailsHandler(req: Request, res: Response) {

  const emails: string[] = await getEmails()

  const transporter: Transporter | null = await getTransporter()

  if (!transporter) {
    console.log('Unable to setup smtp server for sending emails!')
    return res.send({ failed: emails })
  }

  const price: string = await getRate()
  const failed: string[] = []

  for (const email of emails) {
    let success: boolean = await sendRateUpdate(transporter, price, email)

    if (!success)
      failed.push(email)
  }

  return res.send({ failed: failed })
}