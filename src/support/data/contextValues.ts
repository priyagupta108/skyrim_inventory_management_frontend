import { GamesContextType } from '../../contexts/gamesContext'
import { LoginContextType } from '../../contexts/loginContext'
import { DONE } from '../../utils/loadingStates'
import { testUser } from './users'
import { allGames } from './games'

const noop = () => {}

/**
 *
 * Default value for Login context
 *
 */

export const loginContextValue: LoginContextType = {
  user: testUser,
  token: 'xxxxxxx',
  requireLogin: noop,
  authLoading: false,
}

export const loadingLoginContextValue: LoginContextType = {
  user: null,
  token: null,
  requireLogin: noop,
  authLoading: true,
}

export const unauthenticatedLoginContextValue: LoginContextType = {
  user: null,
  token: null,
  requireLogin: noop,
  authLoading: false,
}

/**
 *
 * Default value for Games context
 *
 */

export const gamesContextValue: GamesContextType = {
  games: allGames,
  gamesLoadingState: DONE,
  createGame: noop,
  updateGame: noop,
  destroyGame: noop,
}
