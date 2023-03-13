/**
 *
 * Generic type for the JSON body of any error response
 * that has a JSON body
 *
 */

export interface ErrorObject {
  errors: string[]
}

/**
 *
 * Game
 *
 */

export interface RequestGame {
  name?: string | null
  description?: string | null
}

export interface ResponseGame {
  id: number
  user_id: number
  name: string
  description: string | null
  created_at: Date
  updated_at: Date
}
