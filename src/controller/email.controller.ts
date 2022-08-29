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

  // Add email to the list
  const isAdded: boolean = await addNewEmail(req.query.email)

  // Send response based on result
  return res.sendStatus(isAdded ? 200 : 409)
}

export async function sendEmailsHandler(req: Request, res: Response) {

  // Read emails from file
  const emails: string[] = await getEmails()

  // Prepare transporter
  const transporter: Transporter | null = await getTransporter()

  // We can't send notifictiona if we dont have transporter
  if (!transporter) {
    console.log('Unable to setup smtp server for sending emails!')
    return res.send({ failed: emails })
  }

  // Get current BTC price
  const price: string = await getRate()

  // List of failed emails
  const failed: string[] = []

  for (const email of emails) {
    let success: boolean = await sendRateUpdate(transporter, price, email)

    if (!success)
      failed.push(email)
  }

  // OK
  return res.send({ failed: failed })
}