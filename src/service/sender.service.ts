import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport, { MailOptions } from 'nodemailer/lib/smtp-transport'
import config from '../config'

async function verifyTransporter(transporter: Transporter) {
  return new Promise<boolean>((resolve, reject) => {
    transporter.verify((error, success) => {
      error ? resolve(false) : resolve(true)
    })
  })
}

export async function getTransporter(): Promise<Transporter | null> {

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

  return await verifyTransporter(transporter) ? transporter : null
}

export async function sendRateUpdate(transporter: Transporter, price: string, email: string) {

  const message: MailOptions = {
    to: email,
    subject: `⚡ Update: The price of Bitcoin is ₴${price} now`,
    html: `<p>Looks like a good price to buy, just ₴${price} per BTC 😁</p>
          <b>Bitcoin to the moooooon!!🚀🌕</b>`
  }

  return new Promise<boolean>((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error(`Error while sending update to <${email}>: ${error.message}`)
        resolve(false)
      }
      resolve(true)
    })
  })
}
