import { createContext, useCallback, useEffect, useState } from 'react'
import { signOutWithGoogle } from '../firebase'
import { type BaseGame, type ResponseGame as Game } from '../types/apiData'
import { type ProviderProps } from '../types/contexts'
import { type CallbackFunction } from '../types/functions'
import { useGoogleLogin, usePageContext } from '../hooks/contexts'
import { ApiError } from '../types/errors'
import { LOADING, DONE, ERROR, type LoadingState } from '../utils/loadingStates'
import { postGames, getGames, deleteGame } from '../utils/simApi'

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
  createGame: (game: Game) => void
  // updateGame: (gameId: number, attrs: Game) => void
  destroyGame: (gameId: number) => void
}

export const GamesContext = createContext<GamesContextType>({
  games: [],
  gamesLoadingState: LOADING,
  createGame: () => {},
  destroyGame: () => {},
})

export const GamesProvider = ({ children }: ProviderProps) => {
  const { user, token, authLoading, requireLogin } = useGoogleLogin()
  const [gamesLoadingState, setGamesLoadingState] = useState(LOADING)
  const [games, setGames] = useState<Game[]>([])
  const { setFlashProps } = usePageContext()

  /*
   *
   * General handler for any ApiError
   *
   */

  const handleApiError = (e: ApiError) => {
    if (import.meta.env.DEV) console.error(e.message)

    if (e.code === 401) signOutWithGoogle()

    if (Array.isArray(e.message)) {
      setFlashProps({
        hidden: false,
        type: 'error',
        header: `${e.message.length} errors prevented your game from being saved:`,
        message: e.message,
      })
    } else {
      const message =
        e.code === 404 ? NOT_FOUND_MESSAGE : UNEXPECTED_ERROR_MESSAGE
      setFlashProps({
        hidden: false,
        type: 'error',
        message: message,
      })
    }
  }

  /*
   *
   * Create a new game at the API and update the `games` array
   *
   */

  const createGame = useCallback(
    (
      body: BaseGame,
      onSuccess?: CallbackFunction,
      onError?: CallbackFunction
    ) => {
      if (user && token) {
        postGames(body, token)
          .then(({ json }) => {
            if ('name' in json) {
              setGames([json, ...games])
              setFlashProps({
                hidden: false,
                type: 'success',
                message: 'Success! Your game has been created.',
              })
              onSuccess && onSuccess()
            }
          })
          .catch((e: ApiError) => {
            handleApiError(e)
            onError && onError()
          })
      }
    },
    [user, token]
  )

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
          handleApiError(e)
          setGames([])
          setGamesLoadingState(ERROR)
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
          .catch(handleApiError)
      }
    },
    [user, token, games]
  )

  const value = {
    games,
    gamesLoadingState,
    destroyGame,
    createGame,
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
