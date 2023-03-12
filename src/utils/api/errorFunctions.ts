import { type ApiError } from '../../types/errors'
import { InternalServerError, UnprocessableEntityError } from './apiErrors'

interface ApiErrorConstructor {
  new (message?: string): ApiError
}

const throwIfErrorsObject = (
  json: object | null,
  errorType: ApiErrorConstructor
) => {
  if (!json || Array.isArray(json)) throw new errorType()

  // This should always be true but TypeScript doesn't know that and keeps
  // complaining.
  if ('errors' in json && Array.isArray(json.errors))
    throw new errorType(json.errors.join(', '))
}

export const throwInternalServerError = (json: object | null) => {
  throwIfErrorsObject(json, InternalServerError)
}

const DEFAULT_UNPROCESSABLE_ENTITY_MSG =
  'Resource could not be processed due to invalid attributes'

export const throwUnprocessableEntityError = (json: object | null) => {
  if (!json)
    throw new UnprocessableEntityError([DEFAULT_UNPROCESSABLE_ENTITY_MSG])

  // This should always be true but TypeScript doesn't know that and keeps
  // complaining.
  if (
    'errors' in json &&
    (Array.isArray(json.errors) || typeof json.errors === 'string')
  )
    throw new UnprocessableEntityError(json.errors)
}
