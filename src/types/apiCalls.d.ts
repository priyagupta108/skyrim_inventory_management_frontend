export type HttpVerb = 'get' | 'post' | 'patch' | 'delete'

export type Resource = 'games' | 'shoppingLists' | 'shoppingListItems'

export interface ApiCalls {
  games: HttpVerb[]
  shoppingLists: HttpVerb[]
  shoppingListItems: HttpVerb[]
}
