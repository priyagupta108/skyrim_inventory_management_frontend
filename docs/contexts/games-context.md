# Games Context

The `GamesContext` enables us to keep track of all of a user's games as well as creating, editing, and destroying them. The `GamesProvider` makes the following values available to consumers:

- `games`: array of [`Game`](/src/types/games.d.ts) objects, the games returned from the API for the signed-in user, initialized as an empty array (i.e., this object will never be `null` or `undefined`)
- `gamesLoadingStatus`: string of either `'LOADING'`, `'ERROR'`, or `'DONE'`, indicating whether games have loaded successfully from the API, initialized as `'LOADING'`

Accessing games requires a user to be authenticated, so the `GamesProvider` can only be rendered inside a [`LoginProvider`](/docs/contexts/login-context.md). Note that the `GamesProvider` itself calls the `requireLogin` function provided by the login context, so this function should not be called in any `GamesContext` consumers.

## Example

```tsx
/*
 *
 * /src/components/parent/parent.tsx
 *
 */

import { LoginProvider } from './contexts/loginContext'
import { GamesProvider } from './contexts/gamesContext'
import Child from '../child/child'

const Parent = () => (
  <LoginProvider>
    <GamesProvider>
      <Child />
    </GamesProvider>
  </LoginProvider>
)

export default Parent

/*
 *
 * /src/components/child/child.tsx
 *
 */

import { type Game } from '../../types/games.d.ts'
import { useGamesContext } from '../../hooks/contexts'
import { PulseLoader } from 'react-spinners'
import styles from './child.module.css'

const Child = () => {
  const { games, gamesLoadingState } = useGamesContext()

  return (
    {gamesLoadingState === 'LOADING' ? <PulseLoader /> : (
      <div className={styles.root}>
        {games.map(({ id, description, name }: Game) => (
          <div className={styles.game} key={id}>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.description}>{description || 'This game has no description.'}</p>
          </div>
        ))}
      </div>
    )}
  )
}

export default Child
```

In this example, the child component takes the games retrieved from the context, displaying a loading component if the games are loading and information about each game if the games have loaded. (Note that this minimal example does not handle the case where the `gamesLoadingState` is `'ERROR'`.)
