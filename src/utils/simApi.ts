import { type Game } from '../types/games'
import { type ErrorObject } from '../types/apiData'
import {
  AuthorizationError,
  InternalServerError,
  NotFoundError,
} from './apiErrors'

const baseUri = import.meta.env.PROD
  ? 'https://sim-api.danascheider.com'
  : 'http://localhost:3000'

const contentTypeHeader = { 'Content-Type': 'application/json' }
const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` })
const combinedHeaders = (token: string) => ({
  ...contentTypeHeader,
  ...authHeader(token),
})

const throwInternalServerError = (json: Game[] | ErrorObject) => {
  // This will always be true if the status code was 500 but TypeScript
  // doesn't know that.
  if (typeof json === 'object' && 'errors' in json)
    throw new InternalServerError(json.errors.join('\n'))
}

/*
 *
 * Game Endpoints
 *
 */

// GET /games
export const getGames = (token: string) => {
  const uri = `${baseUri}/games`
  const headers = combinedHeaders(token)

  return fetch(uri, { headers }).then((res: Response) => {
    if (res.status === 401) throw new AuthorizationError()
    if (res.status === 500) throw new InternalServerError()
    return res.json().then((json: ErrorObject | null) => {
      if (res.status === 500 && json !== null)
        throw new InternalServerError(json.errors.join('\n'))

      return { status: res.status, json }
    })
  })
}

// DELETE /games/:id
export const deleteGame = (gameId: number, token: string) => {
  const uri = `${baseUri}/games/${gameId}`
  const headers = combinedHeaders(token)

  return fetch(uri, { method: 'DELETE', headers }).then((res: Response) => {
    if (res.status === 401) throw new AuthorizationError()

    return res.json().then((json: Game[] | ErrorObject) => {
      if (res.status === 500) throwInternalServerError(json)
      if (res.status === 404)
        throw new NotFoundError(
          `Game doesn't exist, or doesn't belong to current user.`
        )

      return { status: res.status, json }
    })
  })
}
