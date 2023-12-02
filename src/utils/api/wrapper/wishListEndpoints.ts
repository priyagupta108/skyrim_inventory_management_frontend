import { type RequestWishList } from '../../../types/apiData'
import { BASE_URI, combinedHeaders } from '../sharedUtils'
import {
  type PostWishListsResponse,
  type PostWishListsReturnValue,
  type GetWishListsResponse,
  type GetWishListsReturnValue,
  type PatchWishListResponse,
  type PatchWishListReturnValue,
  type DeleteWishListResponse,
  type DeleteWishListReturnValue,
} from '../returnValues/wishLists'
import {
  AuthorizationError,
  NotFoundError,
  MethodNotAllowedError,
  UnprocessableEntityError,
  InternalServerError,
} from '../apiErrors'

/**
 *
 * POST /games/:game_id/shopping_lists endpoint
 *
 */

export const postWishLists = (
  gameId: number,
  attributes: RequestWishList,
  token: string
): Promise<PostWishListsReturnValue> | never => {
  const uri = `${BASE_URI}/games/${gameId}/shopping_lists`
  const headers = combinedHeaders(token)

  return fetch(uri, {
    method: 'POST',
    body: JSON.stringify(attributes),
    headers,
  }).then((res) => {
    const response = res as PostWishListsResponse

    if (response.status === 401) throw new AuthorizationError()
    if (response.status === 404) throw new NotFoundError()

    return response.json().then((json) => {
      const returnValue = { status: response.status, json }

      if (returnValue.status === 422)
        throw new UnprocessableEntityError(json.errors)
      if (returnValue.status === 500)
        throw new InternalServerError(json.errors.join(', '))

      return returnValue
    })
  })
}

/**
 *
 * GET /games/:game_id/shopping_lists endpoint
 *
 */

export const getWishLists = (
  gameId: number,
  token: string
): Promise<GetWishListsReturnValue> | never => {
  const uri = `${BASE_URI}/games/${gameId}/shopping_lists`
  const headers = combinedHeaders(token)

  return fetch(uri, { headers }).then((res) => {
    const response = res as GetWishListsResponse

    if (response.status === 401) throw new AuthorizationError()
    if (response.status === 404) throw new NotFoundError()

    return response.json().then((json) => {
      const returnValue = { status: response.status, json }

      if (returnValue.status === 500)
        throw new InternalServerError(json.errors.join(', '))

      return returnValue
    })
  })
}

/**
 *
 * PATCH /shopping_lists/:id endpoint
 *
 */

export const patchWishList = (
  listId: number,
  attributes: RequestWishList,
  token: string
): Promise<PatchWishListReturnValue> | never => {
  const uri = `${BASE_URI}/shopping_lists/${listId}`
  const headers = combinedHeaders(token)

  return fetch(uri, {
    method: 'PATCH',
    body: JSON.stringify(attributes),
    headers,
  }).then((res) => {
    const response = res as PatchWishListResponse

    if (response.status === 401) throw new AuthorizationError()
    if (response.status === 404) throw new NotFoundError()

    return response.json().then((json) => {
      const returnValue = { status: response.status, json }

      if (returnValue.status === 405)
        throw new MethodNotAllowedError(json.errors.join(', '))
      if (returnValue.status === 422)
        throw new UnprocessableEntityError(json.errors)
      if (returnValue.status === 500)
        throw new InternalServerError(json.errors.join(', '))

      return returnValue
    })
  })
}

/**
 *
 * DELETE /shopping_lists/:id endpoint
 *
 */

export const deleteWishList = (
  listId: number,
  token: string
): Promise<DeleteWishListReturnValue> | never => {
  const uri = `${BASE_URI}/shopping_lists/${listId}`
  const headers = combinedHeaders(token)

  return fetch(uri, { method: 'DELETE', headers }).then((res) => {
    const response = res as DeleteWishListResponse

    if (response.status === 401) throw new AuthorizationError()
    if (response.status === 404) throw new NotFoundError()

    return response.json().then((json) => {
      const returnValue = { status: response.status, json }

      if (returnValue.status === 405)
        throw new MethodNotAllowedError(json.errors.join(', '))
      if (returnValue.status === 500)
        throw new InternalServerError(json.errors.join(', '))

      return returnValue
    })
  })
}
