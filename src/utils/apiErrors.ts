export class AuthorizationError extends Error {
  readonly code: 401
  readonly message: string
  readonly name: 'AuthorizationError'

  constructor(message: string = '401 Unauthorized') {
    super(message)

    this.code = 401
    this.name = 'AuthorizationError'
    this.message = message

    Object.setPrototypeOf(this, AuthorizationError.prototype)
  }
}

export class NotFoundError extends Error {
  readonly code: 404
  readonly message: string
  readonly name: 'NotFoundError'

  constructor(message: string = '404 Not Found') {
    super(message)

    this.code = 404
    this.name = 'NotFoundError'
    this.message = message

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}

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
