import { type BaseGame, ResponseGame } from '../types/apiData'
import { type ErrorObject } from '../types/apiData'
import {
  throwInternalServerError,
  throwUnprocessableEntityError,
} from './errorFunctions'
import { AuthorizationError, NotFoundError } from './apiErrors'

const baseUri = import.meta.env.PROD
  ? 'https://sim-api.danascheider.com'
  : '/api'

const contentTypeHeader = { 'Content-Type': 'application/json' }
const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` })
const combinedHeaders = (token: string) => ({
  ...contentTypeHeader,
  ...authHeader(token),
})

/*
 *
 * Game Endpoints
 *
 */

// POST /games

interface PostGamesResponse {
  status: number
  json: ResponseGame | ErrorObject
}

export const postGames = (
  body: BaseGame,
  token: string
): Promise<PostGamesResponse> | never => {
  const uri = `${baseUri}/games`
  const headers = combinedHeaders(token)

  return fetch(uri, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  }).then((res: Response) => {
    if (res.status === 401) throw new AuthorizationError()

    return res.json().then((json: ResponseGame | ErrorObject) => {
      if (res.status === 500) throwInternalServerError(json)
      if (res.status === 422) throwUnprocessableEntityError(json)

      return { status: res.status, json }
    })
  })
}

// GET /games

interface GetGamesResponse {
  status: number
  json?: ResponseGame[] | ErrorObject | null
}

export const getGames = (token: string): Promise<GetGamesResponse> | never => {
  const uri = `${baseUri}/games`
  const headers = combinedHeaders(token)

  return fetch(uri, { headers }).then((res: Response) => {
    if (res.status === 401) throw new AuthorizationError()

    return res.json().then((json: ResponseGame[] | ErrorObject | null) => {
      if (res.status === 500) throwInternalServerError(json)

      return { status: res.status, json }
    })
  })
}

// DELETE /games/:id

interface DeleteGameResponse {
  status: number
  json?: ErrorObject | null
}

export const deleteGame = (
  gameId: number,
  token: string
): Promise<DeleteGameResponse> | never => {
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
