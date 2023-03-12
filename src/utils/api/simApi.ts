import { type BaseGame } from '../../types/apiData'
import {
  type PostGamesResponse,
  type PostGamesReturnValue,
  type GetGamesResponse,
  type GetGamesReturnValue,
  type DeleteGameResponse,
  type DeleteGameReturnValue,
} from './returnValues'
import {
  AuthorizationError,
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError,
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

/*
 *
 * Game Endpoints
 *
 */

// POST /games

export const postGames = (
  body: BaseGame,
  token: string
): Promise<PostGamesReturnValue> | never => {
  const uri = `${baseUri}/games`
  const headers = combinedHeaders(token)

  return fetch(uri, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  }).then((res) => {
    const response = res as PostGamesResponse

    if (response.status === 401) throw new AuthorizationError()

    return response.json().then((json) => {
      const returnValue = { status: response.status, json }

      if (returnValue.status === 500)
        throw new InternalServerError(json.errors.join(', '))
      if (returnValue.status === 422)
        throw new UnprocessableEntityError(json.errors)

      return returnValue
    })
  })
}

// GET /games

export const getGames = (
  token: string
): Promise<GetGamesReturnValue> | never => {
  const uri = `${baseUri}/games`
  const headers = combinedHeaders(token)

  return fetch(uri, { headers }).then((res: Response) => {
    const response = res as GetGamesResponse

    if (response.status === 401) throw new AuthorizationError()

    return response.json().then((json) => {
      const returnValue = { status: response.status, json }

      if (returnValue.status === 500)
        throw new InternalServerError(json.errors.join(', '))

      return returnValue
    })
  })
}

// DELETE /games/:id

export const deleteGame = (
  gameId: number,
  token: string
): Promise<DeleteGameReturnValue> | never => {
  const uri = `${baseUri}/games/${gameId}`
  const headers = combinedHeaders(token)

  return fetch(uri, { method: 'DELETE', headers }).then((res: Response) => {
    const response = res as DeleteGameResponse

    if (response.status === 401) throw new AuthorizationError()
    if (response.status === 404) throw new NotFoundError()
    if (response.status === 204) return { status: response.status }

    return res.json().then((json) => {
      throw new InternalServerError(json.errors.join(', '))
    })
  })
}
