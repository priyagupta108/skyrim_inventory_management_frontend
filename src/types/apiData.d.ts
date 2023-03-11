/*
 *
 * Generic type for the JSON body of any error response
 * that has a JSON body
 *
 */

export interface ErrorObject {
  errors: string[]
}

/*
 *
 * Game
 *
 */

export interface BaseGame {
  user_id: number
  name: string
  description: string | null
}

export interface ResponseGame extends BaseGame {
  id: number
  created_at: Date
  updated_at: Date
}
