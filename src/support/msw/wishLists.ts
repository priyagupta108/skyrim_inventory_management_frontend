import { http } from 'msw'
import { allGames } from '../data/games'
import { allShoppingLists } from '../data/wishLists'
import { shoppingListsForGame } from '../data/wishLists'
import { newShoppingList, newShoppingListWithAggregate } from './helpers/data'
import { type RequestShoppingList } from '../../types/apiData'

const BASE_URI = 'http://localhost:3000'
const gameIds = allGames.map(({ id }) => id)
const listIds = allShoppingLists.map(({ id }) => id)

/**
 *
 * POST /games/:game_id/shopping_lists
 *
 */

// Handles both 201 and 404 responses
export const postShoppingListsSuccess = http.post(
  `${BASE_URI}/games/:gameId/shopping_lists`,
  async ({ request, params }) => {
    const gameId = Number(params.gameId)

    if (gameIds.indexOf(gameId) < 0) return new Response(null, { status: 404 })

    const attributes = await request.json() as RequestShoppingList

    const responseBody = shoppingListsForGame(gameId).length
      ? newShoppingList(attributes, gameId)
      : newShoppingListWithAggregate(attributes, gameId)

    return new Response(JSON.stringify(responseBody), { status: 201 })
  }
)

// Returns the same validation errors regardless of request body
// submitted
export const postShoppingListsUnprocessable = http.post(
  `${BASE_URI}/games/:gameId/shopping_lists`,
  (_) => {
    return new Response(
      JSON.stringify({
        errors: [
          'Title must be unique per game',
          "Title can only contain alphanumeric characters, spaces, commas (,), hyphens (-), and apostrophes (')",
        ],
      }),
      { status: 422 }
    )
  }
)

export const postShoppingListsServerError = http.post(
  `${BASE_URI}/games/:gameId/shopping_lists`,
  (_) => {
    return new Response(
      JSON.stringify({
        errors: ['Something went horribly wrong'],
      }),
      { status: 500 }
    )
  }
)

/**
 *
 * GET /shopping_lists/:id
 *
 */

// Covers both success and 404 cases
export const getShoppingListsSuccess = http.get(
  `${BASE_URI}/games/:gameId/shopping_lists`,
  ({ params }) => {
    const gameId = Number(params.gameId)

    if (gameIds.indexOf(gameId) < 0) return new Response(null, { status: 404 })

    return new Response(JSON.stringify(shoppingListsForGame(gameId)), { status: 200 })
  }
)

export const getShoppingListsEmptySuccess = http.get(
  `${BASE_URI}/games/:gameId/shopping_lists`,
  (_) => {
    return new Response(JSON.stringify([]), { status: 200 })
  }
)

/**
 *
 * PATCH /shopping_lists/:id
 *
 */

// Covers both success and 404 cases
export const patchShoppingListSuccess = http.patch(
  `${BASE_URI}/shopping_lists/:id`,
  async ({ request, params }) => {
    const listId = Number(params.id)

    if (listIds.indexOf(listId) < 0) return new Response(null, { status: 404 })

    const list = allShoppingLists.find(({ id }) => id === listId)
    const { title } = await request.json() as RequestShoppingList

    return new Response(JSON.stringify({ ...list, title }), { status: 200 })
  }
)

// Returns the same validation errors regardless of request
// body submitted
export const patchShoppingListUnprocessable = http.patch(
  `${BASE_URI}/shopping_lists/:id`,
  (_) => {
    return new Response(
      JSON.stringify({
        errors: [
          'Title must be unique per game',
          "Title can only contain alphanumeric characters, spaces, commas (,), hyphens (-), and apostrophes (')",
        ],
      }),
      { status: 422 }
    )
  }
)

export const patchShoppingListServerError = http.patch(
  `${BASE_URI}/shopping_lists/:id`,
  (_) => {
    return new Response(
      JSON.stringify({
        errors: ['Something went horribly wrong'],
      }),
      { status: 500 }
    )
  }
)

/**
 *
 * DELETE /shopping_lists/:id
 *
 */

// Covers both success and 404 cases
export const deleteShoppingListSuccess = http.delete(
  `${BASE_URI}/shopping_lists/:listId`,
  ({ params }) => {
    const listId = Number(params.listId)
    const list = allShoppingLists.find(({ id }) => id === listId)

    if (!list) return new Response(null, { status: 404 })

    const lists = shoppingListsForGame(list.game_id)

    let json
    if (lists.length === 2) {
      json = {
        deleted: lists.map(({ id }) => id),
      }
    } else {
      json = {
        deleted: [list.id],
        aggregate: lists[0],
      }
    }

    return new Response(JSON.stringify(json), { status: 200 })
  }
)

export const deleteShoppingListServerError = http.delete(
  `${BASE_URI}/shopping_lists/:listId`,
  (_) => {
    return new Response(
      JSON.stringify({
        errors: ['Something went horribly wrong'],
      }),
      { status: 500 }
    )
  }
)
