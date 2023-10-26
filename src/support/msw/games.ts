import { http } from 'msw'
import { RequestGame, type ResponseGame } from '../../types/apiData'
import { emptyGames, allGames } from '../data/games'

const BASE_URI = 'http://localhost:3000'

/**
 *
 * POST /games
 *
 */

export const postGamesSuccess = http.post(
  `${BASE_URI}/games`,
  async ({ request }) => {
    const json = await request.json() as RequestGame

    const body = {
      id: 102,
      user_id: 412,
      name: json.name || 'My Game 3',
      description:
        json.description || 'This description is just for illustration.',
      created_at: new Date(),
      updated_at: new Date(),
    }

    return new Response(JSON.stringify(body), { status: 201 })
  }
)

export const postGamesUnprocessable = http.post(
  `${BASE_URI}/games`,
  (_) => {
    const body = {
      errors: [
        "Name can only contain alphanumeric characters, spaces, commas (,), hyphens (-), and apostrophes (')",
      ],
    }

    return new Response(JSON.stringify(body), { status: 422 })
  }
)

export const postGamesServerError = http.post(
  `${BASE_URI}/games`,
  (_) => {
    const body = { errors: ['oh noes'] }

    return new Response(JSON.stringify(body), { status: 500 })
  }
)

/**
 *
 * GET /games
 *
 */

export const getGamesEmptySuccess = http.get(
  `${BASE_URI}/games`,
  (_) => {
    return new Response(JSON.stringify(emptyGames), { status: 200 })
  }
)

export const getGamesAllSuccess = http.get(
  `${BASE_URI}/games`,
  (_) => {
    return new Response(JSON.stringify(allGames), { status: 200 })
  }
)

export const getGamesServerError = http.get(
  `${BASE_URI}/games`,
  (_) => {
    return new Response(JSON.stringify({ errors: ['Something went wrong'] }), { status: 500 })
  }
)

/**
 *
 * PATCH /games/:id
 *
 */

const newOrExistingGame = (id: number): ResponseGame => {
  const existingGame = allGames.find((game) => game.id === id)

  if (existingGame) return existingGame

  return {
    id,
    user_id: 412,
    name: 'Skyrim Game',
    description: null,
    created_at: new Date(),
    updated_at: new Date(),
  }
}

export const patchGameSuccess = http.patch(
  `${BASE_URI}/games/:id`,
  async ({ request, params }) => {
    const { id } = params
    const body = await request.json() as RequestGame
    const game = newOrExistingGame(Number(id))
    const respBody = JSON.stringify({ ...game, ...body })

    return new Response(respBody, { status: 200 })
  }
)

export const patchGameUnprocessableEntity = http.patch(
  `${BASE_URI}/games/:id`,
  (_) => {
    return new Response(JSON.stringify({ errors: ['Name must be unique'] }), { status: 422 })
  }
)

export const patchGameNotFound = http.patch(
  `${BASE_URI}/games/:id`,
  (_) => {
    return new Response(null, { status: 404 })
  }
)

export const patchGameServerError = http.patch(
  `${BASE_URI}/games/:id`,
  (_) => {
    return new Response(JSON.stringify({ errors: ['oh noes'] }), { status: 500 })
  }
)

/**
 *
 * DELETE /games/:id
 *
 */

export const deleteGameSuccess = http.delete(
  `${BASE_URI}/games/:id`,
  (_) => {
    return new Response(null, { status: 204 })
  }
)

export const deleteGameNotFound = http.delete(
  `${BASE_URI}/games/:id`,
  (_) => {
    return new Response(null, { status: 404 })
  }
)

export const deleteGameServerError = http.delete(
  `${BASE_URI}/games/:id`,
  (_) => {
    return new Response(JSON.stringify({ errors: ['oh noes'] }), { status: 500 })
  }
)
