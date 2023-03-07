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
    return res.json().then((json: Game[] | ErrorObject) => {
      if (res.status === 500 && typeof json === 'object' && 'errors' in json)
        throw new AuthorizationError(json.errors.join('\n'))

      return { status: res.status, json }
    })
  })
}
