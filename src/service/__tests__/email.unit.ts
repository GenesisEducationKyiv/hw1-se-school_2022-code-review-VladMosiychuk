import fs from 'fs/promises'

import { test, describe, expect } from '@jest/globals'
import { getEmails, addNewEmail } from '../email/email.service'

import config from '../../config'

const testEmails = ['test1@gmail.com', 'test2@gmail.com']

describe('Testing Email Service', () => {

  beforeEach(() => {
    fs.unlink(config.EMAILS_FN).catch(() => {})
  })

  test('if getEmails returns empty array by default', async () => {
    const emails = await getEmails()

    expect(emails).toHaveLength(0)
  })

  test('if adding new email works', async () => {
    const emailAdded = await addNewEmail(testEmails[0])

    expect(emailAdded).toBe(true)
  })

  test('if adding existing email fails', async () => {
    await addNewEmail(testEmails[0])

    const emailAdded = await addNewEmail(testEmails[0])

    expect(emailAdded).toBe(false)
  })

  test('if multiple emails can be accessed after added', async () => {
    for (const email of testEmails) {
      await addNewEmail(email)
    }

    const emails = await getEmails()

    expect(emails).toEqual(testEmails)
  })
})