import fs from 'fs/promises'
import { constants } from 'fs'

import { test, describe, expect } from '@jest/globals'
import { getEmails, addNewEmail } from '../email/email.service'

import config from '../../config'

const testEmails = ['test1@gmail.com', 'test2@gmail.com']
const accessFn = jest.spyOn(fs, 'access')
const readFileFn = jest.spyOn(fs, 'readFile')
const writeFileFn = jest.spyOn(fs, 'writeFile')

describe('Testing Email Service', () => {

  beforeEach(() => {
    fs.unlink(config.EMAILS_FN).catch(() => { })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('if getEmails returns empty array by default', async () => {
    const emails = await getEmails()

    expect(accessFn).toBeCalledWith(config.EMAILS_FN, constants.F_OK)
    expect(emails).toHaveLength(0)
  })

  test('if adding new email works', async () => {
    const emailAdded = await addNewEmail(testEmails[0])

    expect(writeFileFn).toBeCalledWith(config.EMAILS_FN, expect.anything(), { flag: 'a' })
    expect(emailAdded).toBe(true)
  })

  test('if adding existing email fails', async () => {
    await addNewEmail(testEmails[0])

    const emailAdded = await addNewEmail(testEmails[0])

    expect(writeFileFn).toBeCalledTimes(1)
    expect(readFileFn).toBeCalledWith(config.EMAILS_FN)
    expect(emailAdded).toBe(false)
  })

  test('if multiple emails can be accessed after added', async () => {
    for (const email of testEmails) {
      await addNewEmail(email)
    }

    const emails = await getEmails()

    expect(writeFileFn).toBeCalledTimes(testEmails.length)
    expect(emails).toEqual(testEmails)
  })
})