import { type GamesContextType } from '../../contexts/gamesContext'
import { type LoginContextType } from '../../contexts/loginContext'
import { type WishListsContextType } from '../../contexts/wishListsContext'
import { DONE, ERROR, LOADING } from '../../utils/loadingStates'
import { testUser } from './users'
import { allGames, emptyGames } from './games'
import { emptyWishLists, wishListsForGame } from './wishLists'

const noop = () => {}

/**
 *
 * Default values for Login context
 *
 */

export const loginContextValue: LoginContextType = {
  user: testUser,
  token: 'xxxxxxx',
  requireLogin: noop,
  signOut: noop,
  withTokenRefresh: (fn) => fn('xxxxxxx'),
  authLoading: false,
}

export const loadingLoginContextValue: LoginContextType = {
  user: null,
  token: null,
  requireLogin: noop,
  signOut: noop,
  withTokenRefresh: noop,
  authLoading: true,
}

export const unauthenticatedLoginContextValue: LoginContextType = {
  user: null,
  token: null,
  requireLogin: noop,
  signOut: noop,
  withTokenRefresh: noop,
  authLoading: false,
}

/**
 *
 * Default value for Games context
 *
 */

export const gamesContextValueEmpty: GamesContextType = {
  games: emptyGames,
  gamesLoadingState: DONE,
  createGame: noop,
  updateGame: noop,
  destroyGame: noop,
}

export const gamesContextValue: GamesContextType = {
  games: allGames,
  gamesLoadingState: DONE,
  createGame: noop,
  updateGame: noop,
  destroyGame: noop,
}

export const gamesContextValueLoading: GamesContextType = {
  games: [],
  gamesLoadingState: LOADING,
  createGame: noop,
  updateGame: noop,
  destroyGame: noop,
}

export const gamesContextValueError: GamesContextType = {
  games: [],
  gamesLoadingState: ERROR,
  createGame: noop,
  updateGame: noop,
  destroyGame: noop,
}

/**
 *
 * Default values for Wish Lists context
 *
 */

export const wishListsContextValueEmpty: WishListsContextType = {
  wishLists: emptyWishLists,
  wishListsLoadingState: DONE,
  createWishList: noop,
  updateWishList: noop,
  destroyWishList: noop,
  createWishListItem: noop,
  updateWishListItem: noop,
  destroyWishListItem: noop,
}

export const wishListsContextValue: WishListsContextType = {
  wishLists: wishListsForGame(77),
  wishListsLoadingState: DONE,
  createWishList: noop,
  updateWishList: noop,
  destroyWishList: noop,
  createWishListItem: noop,
  updateWishListItem: noop,
  destroyWishListItem: noop,
}

export const wishListsContextValueLoading: WishListsContextType = {
  wishLists: emptyWishLists,
  wishListsLoadingState: LOADING,
  createWishList: noop,
  updateWishList: noop,
  destroyWishList: noop,
  createWishListItem: noop,
  updateWishListItem: noop,
  destroyWishListItem: noop,
}

export const wishListsContextValueError: WishListsContextType = {
  wishLists: emptyWishLists,
  wishListsLoadingState: ERROR,
  createWishList: noop,
  updateWishList: noop,
  destroyWishList: noop,
  createWishListItem: noop,
  updateWishListItem: noop,
  destroyWishListItem: noop,
}
