import {
  postGames,
  getGames,
  patchGame,
  deleteGame,
} from './wrapper/gameEndpoints'
import {
  postWishLists,
  getWishLists,
  patchWishList,
  deleteWishList,
} from './wrapper/wishListEndpoints'
import {
  postWishListItems,
  patchWishListItem,
  deleteWishListItem,
} from './wrapper/wishListItemEndpoints'

export {
  postGames,
  getGames,
  patchGame,
  deleteGame,
  postWishLists,
  getWishLists,
  patchWishList,
  deleteWishList,
  postWishListItems,
  patchWishListItem,
  deleteWishListItem,
}
