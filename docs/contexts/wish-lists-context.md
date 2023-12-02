# Wish Lists Context

The `WishListsContext` keeps track of the active game and its wish lists. (Note that the naming scheme "wish list" is being replaced with "wish list" but has not yet been replaced in the front end code or API endpoints/request bodies.) The `WishListsProvider` makes the following values available to consumers:

- `wishLists`: array of [`ResponseWishList`](/src/types/apiData.d.ts), the wish lists returned from the API for the current active game
- `wishListsLoadingStatus`: string of either `'LOADING'`, `'ERROR'`, or `'DONE'`, indicating whether wish lists have loaded successfully from the API initialised as `'LOADING'`
- `createWishList`: a function that creates a wish list for the current active game at the API, taking the following arguments:
  - `attributes`: an object containing an optional `title` key with a string value, the attributes of the wish list to create
  - `onSuccess` (optional): a callback called on a successful response; no arguments are passed in and its return value, if any, is not used
  - `onError` (optional): a callback called on an unsuccessful response; no arguments are passed in and its return value, if any, is not used
- `updateWishList`: a function that creates a wish list for the current active game at the API, taking the following arguments:
  - `listId`: the ID of the wish list to be updated
  - `attributes`: an object containing an optional `title` key with a string value, the attributes of the wish list to create
  - `onSuccess` (optional): a callback called on a successful response; no arguments are passed in and its return value, if any, is not used
  - `onError` (optional): a callback called on an unsuccessful response; no arguments are passed in and its return value, if any, is not used
- `destroyWishList`: a function that destroys the selected wish list at the API, taking the following arguments:
  - `listId`: the `id` of the wish list to be destroyed
  - `onSuccess` (optional): a callback called on a successful response; no arguments are passed in and its return value, if any, is not used
  - `onError` (optional): a callback called on an unsuccessful response; no arguments are passed in and its return value, if any, is not used
- `createWishListItem`: a function that creates a wish list item on the selected wish list at the API, taking the following arguments:
  - `listId`: the `id` of the list on which to create the wish list item
  - `attributes`: the attributes of the item to be created (required attributes are `description` (string) and `quantity` (number))
  - `onSuccess` (optional): a callback called on a successful response; no arguments are passed in and its return value, if any, is not used
  - `onError` (optional): a callback called on an unsuccessful response; no arguments are passed in and its return value, if any, is not used
- `updateWishListItem`: a function that updates a wish list item at the API, taking the following arguments:
  - `itemId`: the `id` of the wish list item to be updated
  - `attributes`: the attributes of the item to be updated (`description` is not allowed as a value)
  - `onSuccess` (optional): a callback called on a successful response; no arguments are passed in and its return value, if any, is not used
  - `onError` (optional): a callback called on an unsuccessful response; no arguments are passed in and its return value, if any, is not used
- `destroyWishListItem`: a function that destroys the selected wish list at the API, taking the following arguments:
  - `itemId`: the `id` of the wish list item to be destroyed
  - `onSuccess` (optional): a callback called on a successful response; no arguments are passed in and its return value, if any, is not used
  - `onError` (optional): a callback called on an unsuccessful response; no arguments are passed in and its return value, if any, is not used

Note that, while the context tracks the active game, this information is internal to the context. The active game is identified using the `gameId` query string parameter, which is typically set using the games dropdown component found on the `DashboardLayout`.

The `WishListsContext` is a consumer of the `GamesContext` and, as such, must be nested inside a `GamesProvider` and the other context providers it requires, namely the `LoginProvider` and the `PageProvider`.

## Example

```tsx
/**
 *
 * /src/components/parent/parent.tsx
 *
 */

import { LoginProvider } from '../../contexts/loginContext'
import { PageProvider } from '../../contexts/pageContext'
import { GamesProvider } from '../../contexts/gamesContext'
import { WishListsProvider } from '../../contexts/wishListsContext'
import Child from '../child/child'

const Parent = () => (
  <LoginProvider>
    <PageProvider>
      <GamesProvider>
        <WishListsProvider>
          <Child />
        </WishListsProvider>
      </GamesProvider>
    </PageProvider>
  </LoginProvider>
)

export default Parent

/**
 *
 * /src/components/child/child.tsx
 *
 */

import { type ResponseWishList as WishList } from '../../types/apiData'
import { useWishListsContext } from '../../hooks/contexts'
import { PulseLoader } from 'react-spinners'
import styles from './child.module.css'

const Child = () => {
  const { wishLists, wishListsLoadingState } = useWishListsContext()

  return (
    {wishListsLoadingState === 'LOADING' ? <PulseLoader /> : (
      <div className={styles.root}>
        {wishLists.map(({ id, title }: WishList) => (
          <div className={styles.wishList} key={id}>
            <h3 className={styles.title}>{title}</h3>
          </div>
        ))}
      </div>
    )}
  )
}

export default Child
```
