class SendingMailError extends Error {

  email: string

  constructor(email: string, message: string) {
    super('Unable to send email.\n' + message)
    this.name = 'SendingMailError'
    this.email = email
  }
}

export { SendingMailError }