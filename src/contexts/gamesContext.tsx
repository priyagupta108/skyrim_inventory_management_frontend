import { createContext, useCallback, useEffect, useState } from 'react'
import { signOutWithGoogle } from '../firebase'
import { type Game } from '../types/games'
import { type ProviderProps } from '../types/contexts'
import { useGoogleLogin, usePageContext } from '../hooks/contexts'
import { ApiError } from '../types/errors'
import { LOADING, DONE, ERROR, type LoadingState } from '../utils/loadingStates'
import { getGames } from '../utils/simApi'

// TODO: Add default values for context provider as follows:
//       const createGame = (game: Game) => {
//                                            postGames(game: Game, token: '')
//                                              .then((status: number, json: string) => /* noop */)
//                                          }
//       This will be useful in Storybook.

interface GamesContextType {
  games: Game[]
  gamesLoadingState: LoadingState
  // createGame: (game: Game) => void
  // updateGame: (gameId: number, attrs: Game) => void
  // destroyGame: (gameId: number) => void
}

const GamesContext = createContext<GamesContextType>({
  games: [],
  gamesLoadingState: LOADING,
})

const GamesProvider = ({ children }: ProviderProps) => {
  const { user, token, authLoading, requireLogin } = useGoogleLogin()
  const [gamesLoadingState, setGamesLoadingState] = useState(LOADING)
  const [games, setGames] = useState<Game[]>([])
  const { setFlashProps } = usePageContext()

  const fetchGames = useCallback(() => {
    if (user && token) {
      getGames(token)
        .then(({ json }) => {
          setGames(json)
          setGamesLoadingState(DONE)
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

  const value = {
    games,
    gamesLoadingState,
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

export { GamesContext, GamesProvider }
