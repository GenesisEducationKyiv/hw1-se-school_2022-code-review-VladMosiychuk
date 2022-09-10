import dotenv from 'dotenv'

if (process.env?.ENV_FILE)
  dotenv.config({path: process.env.ENV_FILE})
else
  dotenv.config()

const DB_PATH = process.env?.DB_PATH ?? 'db'
const EMAILS_FN = process.env?.EMAILS_FN ?? 'subscribers.txt'

export default {
  VERSION: require('../package.json').version,
  HOSTNAME: process.env?.HOSTNAME ?? 'localhost',
  DB_PATH: DB_PATH,
  EMAILS_FN: `${DB_PATH}/${EMAILS_FN}`,
  PORT: parseInt(process.env?.PORT ?? '8000'),
  SMTP_HOST: process.env?.SMTP_HOST ?? '',
  SMTP_PORT: parseInt(process.env?.SMTP_PORT ?? '0'),
  SMTP_SECURE: (/true/i).test(process.env?.SMTP_SECURE ?? ''),
  SMTP_USER: process.env?.SMTP_USER ?? '',
  SMTP_PASS: process.env?.SMTP_PASS ?? ''
}