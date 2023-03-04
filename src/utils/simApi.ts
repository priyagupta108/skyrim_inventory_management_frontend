import { type Game } from '../types/games'
import { AuthorizationError } from './apiErrors'

const baseUri = import.meta.env.PROD ? 'https://sim-api.danascheider.com' : 'http://localhost:5173'

const contentTypeHeader = { 'Content-Type': 'application/json' }
const authHeader = (token: string) => ({ 'Authorization': `Bearer ${token}` })
const combinedHeaders = (token: string) => ({ ...contentTypeHeader, ...authHeader(token) })

export const getGames = (uid: string, token: string) => {
  const uri = `${baseUri}/users/${uid}/games`
  const headers = combinedHeaders(token)

  return (
    fetch(uri, { headers })
      .then((res: Response) => {
        if (res.status === 401) throw new AuthorizationError()
        return res.json().then((json: Game[]) => ({ status: res.status, json }))
      })
  )
}