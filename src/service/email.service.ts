import fs from 'fs/promises'
import { constants } from 'fs'
import config from '../config'


// Check if email list exists
export async function listExists() {
  return fs.access(config.EMAILS_FN, constants.F_OK)
}

// Get list of emails
export async function getEmails() {
  return listExists()
    .then(async () => (await fs.readFile(config.EMAILS_FN)).toString().split(/\r?\n/))
    .catch(() => new Array<string>())
}

// Add new email in case it wasn't added before
export async function addNewEmail(email: string) {

  const emails: string[] = await getEmails()

  // Don't add email if it's already added
  if (emails.includes(email)) {
    return false
  }

  // Append email to the list
  await fs.writeFile(config.EMAILS_FN, `${emails.length > 0 ? '\n' : ''}${email}`, { flag: 'a' })
  return true
}