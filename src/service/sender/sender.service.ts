import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport, { MailOptions } from 'nodemailer/lib/smtp-transport'
import { SendingMailError, InvalidTransporterError } from '../../common/exceptions/exceptions'
import config from '../../config'

async function verifyTransporter(transporter: Transporter) {
  return new Promise<Transporter>((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error)
        reject(new InvalidTransporterError())
      resolve(transporter)
    })
  })
}

export async function getTransporter(): Promise<Transporter> {

  const transporterOptions: SMTPTransport.Options = {
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS
    }
  }

  // In case SMTP server is not provided, we'll use SMTP by Ethereal
  if (!config.SMTP_HOST || config.SMTP_PORT == 0) {

    console.log('No SMTP settings provided. We\'ll use test SMTP by https://ethereal.email/')

    const acc = await nodemailer.createTestAccount()

    transporterOptions.host = acc.smtp.host
    transporterOptions.port = acc.smtp.port
    transporterOptions.secure = acc.smtp.secure
    transporterOptions.auth = {
      user: acc.user,
      pass: acc.pass
    }
  }

  const transporter: Transporter = nodemailer.createTransport(transporterOptions, {
    from: `"Bitcoin API" <${config.SMTP_USER}>`
  })

  return await verifyTransporter(transporter)
}

export async function sendEmail(transporter: Transporter, message: MailOptions) {
  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      if (error)
        reject(new SendingMailError(message?.to as string, error.message))
      else
        resolve()
    })
  })
}

export async function sendRateUpdates(transporter: Transporter, price: number, emails: string[]) {

  const formattedPrice = price.toFixed(2)
  const updateSubject = `⚡ Update: The price of Bitcoin is ₴${formattedPrice} now`
  const updateHTML = `<p>Looks like a good price to buy, just ₴${formattedPrice} per BTC 😁</p>
        <b>Bitcoin to the moooooon!!🚀🌕</b>`

  const sendingPromises = emails.map(email => sendEmail(transporter, {
    to: email,
    subject: updateSubject,
    html: updateHTML
  }))
  
  return Promise.allSettled(sendingPromises)
}
