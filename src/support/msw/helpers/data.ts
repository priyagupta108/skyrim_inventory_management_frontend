import {
  type RequestWishListItem,
  type RequestWishList,
  type ResponseWishListItem,
  type ResponseWishList,
} from '../../../types/apiData'
import { allGames } from '../../data/games'
import {
  allWishLists,
  wishListsForGame,
} from '../../data/wishLists'

const gameIds = allGames.map(({ id }) => id)

/**
 *
 * Wish List Creation
 *
 */

export const newWishList = (
  attributes: RequestWishList,
  gameId: number
): ResponseWishList[] => {
  if (gameIds.indexOf(gameId) < 0)
    throw new Error(
      'Cannot generate shopping list for game that does not exist in test data'
    )

  const existingLists = wishListsForGame(gameId)

  if (!existingLists.length)
    throw new Error(
      'Cannot generate single list for game without existing aggregate'
    )

  return [
    {
      id: 93,
      game_id: gameId,
      aggregate: false,
      aggregate_list_id: existingLists[0].id,
      title: attributes.title || 'New Wish List',
      list_items: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]
}

export const newWishListWithAggregate = (
  attributes: RequestWishList,
  gameId: number
): ResponseWishList[] => {
  if (gameIds.indexOf(gameId) < 0)
    throw new Error(
      'Cannot generate wish list for game that does not exist in test data'
    )

  const existingLists = wishListsForGame(gameId)

  if (existingLists.length)
    throw new Error(
      'Cannot generate new aggregate list for game that already has one'
    )

  return [
    {
      id: 93,
      game_id: gameId,
      aggregate: true,
      aggregate_list_id: null,
      title: 'All Items',
      list_items: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 94,
      game_id: gameId,
      aggregate: false,
      aggregate_list_id: 93,
      title: attributes.title || 'My Wish List 1',
      list_items: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]
}

/**
 *
 * Wish list item creation
 *
 */

export const newWishListItem = (
  attributes: RequestWishListItem,
  listId: number
) => {
  const list = allWishLists.find(({ id }) => id === listId)

  if (!list)
    throw new Error(`No wish list with ID ${listId} in the test data`)

  const wishList = { ...list }
  const allLists = wishListsForGame(wishList.game_id)
  const aggregateList = { ...allLists[0] }

  const newItem: ResponseWishListItem = {
    id: 42,
    list_id: listId,
    description: 'Dummy description for TypeScript',
    quantity: 1,
    unit_weight: null,
    notes: null,
    created_at: new Date(),
    updated_at: new Date(),
    ...attributes,
  }

  const newAggregateListItem: ResponseWishListItem = {
    ...newItem,
    id: 43,
    list_id: aggregateList.id,
  }

  aggregateList.list_items = [newAggregateListItem, ...aggregateList.list_items]
  wishList.list_items = [newItem, ...wishList.list_items]

  return [aggregateList, wishList]
}
