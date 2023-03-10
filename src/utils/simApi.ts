import { type Game } from '../types/games'
import { type ErrorObject } from '../types/apiData'
import {
  AuthorizationError,
  InternalServerError,
  NotFoundError,
} from './apiErrors'

const baseUri = import.meta.env.PROD
  ? 'https://sim-api.danascheider.com'
  : '/api'

const contentTypeHeader = { 'Content-Type': 'application/json' }
const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` })
const combinedHeaders = (token: string) => ({
  ...contentTypeHeader,
  ...authHeader(token),
})

const throwInternalServerError = (json: Game[] | ErrorObject | null) => {
  // This will always be true if the status code was 500 but TypeScript
  // doesn't know that.
  if (json && typeof json === 'object' && 'errors' in json)
    throw new InternalServerError(json.errors.join('\n'))
}

/*
 *
 * Game Endpoints
 *
 */

// GET /games

interface GetGamesResponse {
  status: number
  json?: Game[] | ErrorObject | null
}

export const getGames = (token: string): Promise<GetGamesResponse> | never => {
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

interface DeleteGameResponse {
  status: number
  json?: ErrorObject | null
}

export const deleteGame = (gameId: number, token: string): Promise<DeleteGameResponse> | never => {
  const uri = `${baseUri}/games/${gameId}`
  const headers = combinedHeaders(token)

  return fetch(uri, { method: 'DELETE', headers }).then((res: Response) => {
    if (res.status === 401) throw new AuthorizationError()
    if (res.status === 404) throw new NotFoundError()
    if (res.status === 204) return { status: res.status }

    return res.json().then((json: ErrorObject | null) => {
      if (res.status === 500) throwInternalServerError(json)

      return { status: res.status, json }
    })
  })
}
