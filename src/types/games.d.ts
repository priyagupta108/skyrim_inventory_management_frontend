export interface Game {
  id: number
  user_id: number
  name: string
  description: string | null
  created_at: Date
  updated_at: Date
}