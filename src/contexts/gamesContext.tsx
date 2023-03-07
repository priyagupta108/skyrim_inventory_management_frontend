import { createContext, useCallback, useEffect, useState } from 'react'
import { signOutWithGoogle } from '../firebase'
import { type Game } from '../types/games'
import { type ProviderProps } from '../types/contexts'
import { useGoogleLogin, usePageContext } from '../hooks/contexts'
import { ApiError } from '../types/errors'
import { LOADING, DONE, ERROR, type LoadingState } from '../utils/loadingStates'
import { getGames, deleteGame } from '../utils/simApi'

// TODO: Add default values for context provider as follows:
//       const createGame = (game: Game) => {
//                                            postGames(game: Game, token: '')
//                                              .then((status: number, json: string) => /* noop */)
//                                          }
//       This will be useful in Storybook.

const NOT_FOUND_MESSAGE =
  "Oops! We couldn't find the game you're looking for. Please refresh and try again."
const UNEXPECTED_ERROR_MESSAGE =
  "Oops! Something unexpected went wrong. We're sorry! Please try again later."

export interface GamesContextType {
  games: Game[]
  gamesLoadingState: LoadingState
  // createGame: (game: Game) => void
  // updateGame: (gameId: number, attrs: Game) => void
  destroyGame: (gameId: number) => void
}

export const GamesContext = createContext<GamesContextType>({
  games: [],
  gamesLoadingState: LOADING,
  destroyGame: () => {},
})

export const GamesProvider = ({ children }: ProviderProps) => {
  const { user, token, authLoading, requireLogin } = useGoogleLogin()
  const [gamesLoadingState, setGamesLoadingState] = useState(LOADING)
  const [games, setGames] = useState<Game[]>([])
  const { setFlashProps } = usePageContext()

  /*
   *
   * Retrieve all the current user's games from the API
   *
   */

  const fetchGames = useCallback(() => {
    if (user && token) {
      getGames(token)
        .then(({ json }) => {
          if (Array.isArray(json)) {
            setGames(json)
            setGamesLoadingState(DONE)
          }
        })
        .catch((e: ApiError) => {
          if (import.meta.env.DEV)
            console.error(`Error ${e.name}: ${e.message}`)

          if (e.code === 401) {
            signOutWithGoogle()
          } else {
            setGames([])
            setGamesLoadingState(ERROR)
            setFlashProps({
              type: 'error',
              message: e.message,
              hidden: false,
            })
          }
        })
    }
  }, [user, token])

  /*
   *
   * Destroy the requested game and update the `games` array
   *
   */

  const destroyGame = useCallback(
    (gameId: number) => {
      if (user && token) {
        deleteGame(gameId, token)
          .then(({ status }) => {
            if (status === 204) {
              const newGames = games.filter(({ id }) => id !== gameId)
              setGames(newGames)
              setFlashProps({
                hidden: false,
                type: 'success',
                message: 'Success! Your game has been deleted.',
              })
            }
          })
          .catch((e: ApiError) => {
            if (import.meta.env.DEV)
              console.log(`Error ${e.name}: ${e.message}`)

            const message =
              e.code === 404 ? NOT_FOUND_MESSAGE : UNEXPECTED_ERROR_MESSAGE

            setFlashProps({
              hidden: false,
              type: 'error',
              message,
            })
          })
      }
    },
    [user, token, games]
  )

  const value = {
    games,
    gamesLoadingState,
    destroyGame,
  }

  useEffect(() => {
    requireLogin()
  }, [requireLogin])

  useEffect(() => {
    if (authLoading) return

    fetchGames()
  }, [authLoading, fetchGames])

  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
}
