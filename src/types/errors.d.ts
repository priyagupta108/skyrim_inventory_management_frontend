import { AuthorizationError, NotFoundError, UnprocessableEntityError, InternalServerError } from '../utils/apiErrors'

export type ApiError = AuthorizationError | NotFoundError | UnprocessableEntityError | InternalServerError