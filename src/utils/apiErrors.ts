export class UnprocessableEntityError extends Error {
  readonly code: 422
  readonly message: string
  readonly name: 'UnprocessableEntityError'

  constructor(message: string = '422 Unprocessable Entity') {
    super(message)

    this.code = 422
    this.name = 'UnprocessableEntityError'
    this.message = message

    Object.setPrototypeOf(this, UnprocessableEntityError.prototype)
  }
}

export class InternalServerError extends Error {
  readonly code: 500
  readonly message: string
  readonly name: 'InternalServerError'

  constructor(message: string = '500 Internal Server Error') {
    super(message)

    this.code = 500
    this.name = 'InternalServerError'
    this.message = message

    Object.setPrototypeOf(this, InternalServerError.prototype)
  }
}
