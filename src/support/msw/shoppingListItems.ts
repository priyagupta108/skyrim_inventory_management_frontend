import { http } from 'msw'
import { allShoppingLists, shoppingListsForGame } from '../data/shoppingLists'
import { allShoppingListItems } from '../data/shoppingListItems'
import { newShoppingListItem } from './helpers/data'
import { type RequestShoppingListItem } from '../../types/apiData'

const BASE_URI = 'http://localhost:3000'
const listIds = allShoppingLists.map(({ id }) => id)

/**
 *
 * POST /shopping_lists/:list_id/list_items
 *
 */

// Handles 201 and 404 responses
export const postShoppingListItemsSuccess = http.post(
  `${BASE_URI}/shopping_lists/:listId/shopping_list_items`,
  async ({ request, params }) => {
    const listId = Number(params.listId)

    if (listIds.indexOf(listId) < 0) return new Response(null, { status: 404 })

    const attributes = await request.json() as RequestShoppingListItem

    return new Response(
      JSON.stringify(newShoppingListItem(attributes, listId)),
      { status: 201 }
    )
  }
)

// Returns the same validation errors regardless of request body
// submitted
export const postShoppingListItemsUnprocessable = http.post(
  `${BASE_URI}/shopping_lists/:listId/shopping_list_items`,
  (_) => {
    return new Response(
      JSON.stringify({
        errors: [
          'Quantity must be greater than 0',
          'Unit weight must be greater than or equal to 0',
        ],
      }),
      { status: 422 }
    )
  }
)

export const postShoppingListItemsServerError = http.post(
  `${BASE_URI}/shopping_lists/:listId/shopping_list_items`,
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
 * PATCH /shopping_list_items/:id
 *
 */

export const incrementShoppingListItemSuccess = http.patch(
  `${BASE_URI}/shopping_list_items/:id`,
  ({ params }) => {
    const itemId: number = Number(params.id)
    const item = allShoppingListItems.find(({ id }) => id === itemId)
    const list = allShoppingLists.find(({ id }) => id === item?.list_id)

    if (!item || !list) return new Response(null, { status: 404 })

    const allItems = shoppingListsForGame(list.game_id).flatMap(
      ({ list_items }) =>
        list_items.filter(({ description }) => description === item.description)
    )

    const aggListItem = { ...allItems[0], quantity: allItems[0].quantity + 1 }
    const regItem = { ...item, quantity: item.quantity + 1 }

    return new Response(JSON.stringify([aggListItem, regItem]), { status: 200 })
  }
)

export const decrementShoppingListItemSuccess = http.patch(
  `${BASE_URI}/shopping_list_items/:id`,
  ({ request, params }) => {
    const itemId: number = Number(params.id)
    const item = allShoppingListItems.find(({ id }) => id === itemId)
    const list = allShoppingLists.find(({ id }) => id === item?.list_id)

    if (!item || !list) return new Response(null, { status: 404 })

    const allItems = shoppingListsForGame(list.game_id).flatMap(
      ({ list_items }) =>
        list_items.filter(({ description }) => description === item.description)
    )
    const aggListItem = { ...allItems[0], quantity: allItems[0].quantity - 1 }
    const regItem = { ...item, quantity: item.quantity - 1 }

    return new Response(JSON.stringify([aggListItem, regItem]), { status: 200 })
  }
)

// Logic for updating shopping list items is too complex to model in an
// MSW handler. This handler is written under the assumption that only
// the list item's "notes" have been updated in the request. Updates to
// the other values are not supported by this handler. In particular,
// updates to unit weight are complex and should not be used in front-end
// tests if it can be avoided.
//
// This handler further assumes that the aggregate list item associated with
// the list item being updated has no "notes" value other than that of the
// list item being updated - i.e., none of its other associated list items, if
// any, have notes. If they did, that, too, would further complicate things.
export const updateShoppingListItemSuccess = http.patch(
  `${BASE_URI}/shopping_list_items/:id`,
  async ({ request, params }) => {
    const itemId: number = Number(params.id)
    const item = allShoppingListItems.find(({ id }) => id === itemId)
    const list = allShoppingLists.find(({ id }) => id === item?.list_id)

    if (!item || !list) return new Response(null, { status: 404 })

    const json = await request.json() as RequestShoppingListItem

    const allItems = shoppingListsForGame(list.game_id).flatMap(
      ({ list_items }) =>
        list_items.filter(({ description }) => description === item.description)
    )
    const aggListItem = { ...allItems[0], notes: json.notes }
    const regItem = { ...item, notes: json.notes }

    return new Response(JSON.stringify([aggListItem, regItem]), { status: 200 })
  }
)

// Returns the same validation errors regardless of request body
export const updateShoppingListItemUnprocessable = http.patch(
  `${BASE_URI}/shopping_list_items/:id`,
  (_) => {
    return new Response(
      JSON.stringify({
        errors: [
          'Quantity must be greater than 0',
          'Unit weight must be greater than or equal to 0',
        ],
      }),
      { status: 422 }
    )
  }
)

export const updateShoppingListItemServerError = http.patch(
  `${BASE_URI}/shopping_list_items/:id`,
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
 * DELETE /shopping_list_items/:id
 *
 */

// Note: If the list item, list, and aggregate list are all
//       found in the test data, this will delete the item
//       from the regular list AND the aggregate list regardless
//       of whether there are other matching items. This function
//       does not match the complexity of back-end behaviour.
export const deleteShoppingListItemSuccess = http.delete(
  `${BASE_URI}/shopping_list_items/:id`,
  ({ request, params }) => {
    const itemId = Number(params.id)
    const item = allShoppingListItems.find(({ id }) => id === itemId)

    if (!item) return new Response(null, { status: 404 })

    const listId = item.list_id
    const regList = allShoppingLists.find(({ id }) => id === listId)

    if (!regList) return new Response(null, { status: 404 })

    const aggListId = regList.aggregate_list_id
    const aggList = allShoppingLists.find(({ id }) => id === aggListId)

    if (!aggList) return new Response(null, { status: 404 })

    const list = { ...regList }
    const aggregate = { ...aggList }

    list.list_items = list.list_items.filter(({ id }) => id !== itemId)
    aggregate.list_items = aggregate.list_items.filter(
      ({ description }) => description !== item.description
    )

    return new Response(JSON.stringify([aggregate, list]), { status: 200 })
  }
)

export const deleteShoppingListItemServerError = http.delete(
  `${BASE_URI}/shopping_list_items/:id`,
  (_) => {
    return new Response(
      JSON.stringify({ errors: ['Something went horribly wrong'] }),
      { status: 500 }
    )
  }
)
