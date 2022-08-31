import fs from 'fs/promises'
import { constants } from 'fs'
import config from '../config'


export async function listExists() {
  return fs.access(config.EMAILS_FN, constants.F_OK)
}

export async function getEmails() {
  return listExists()
    .then(async () => (await fs.readFile(config.EMAILS_FN)).toString().split(/\r?\n/))
    .catch(() => new Array<string>())
}

export async function addNewEmail(email: string) {

  const emails: string[] = await getEmails()

  if (emails.includes(email)) {
    return false
  }

  await fs.writeFile(config.EMAILS_FN, `${emails.length > 0 ? '\n' : ''}${email}`, { flag: 'a' })
  return true
}