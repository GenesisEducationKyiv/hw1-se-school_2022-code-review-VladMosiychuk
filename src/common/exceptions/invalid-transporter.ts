class InvalidTransporterError extends Error {
  constructor() {
    super('Unable to setup SMTP server for sending emails.')
    this.name = 'InvalidTransporterError'
  }
}

export { InvalidTransporterError }