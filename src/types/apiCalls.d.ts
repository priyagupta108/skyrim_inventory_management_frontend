export type HttpVerb = 'get' | 'post' | 'patch' | 'delete'

export type Resource = 'games' | 'wishLists' | 'wishListItems'

export interface ApiCalls {
  games: HttpVerb[]
  wishLists: HttpVerb[]
  wishListItems: HttpVerb[]
}
