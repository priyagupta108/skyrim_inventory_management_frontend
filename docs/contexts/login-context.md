# Login Context

The `LoginContext` keeps track of the logged in user, manages their tokens, signs out in the event of authentication errors, and provides a `requireLogin` function that can be used in the `useEffect` hook of any component using the context to sign out and redirect to the homepage if login is unsuccessful or no user is logged in.

The `LoginProvider`'s value makes the following values available:

- `user`: User (type defined in Firebase)
- `token`: string
- `authLoading`: boolean
- `requireLogin`: function

## Example

```tsx
// /src/components/parent/parent.tsx

import { LoginProvider } from '../../contexts/loginContext'
import Child from '../child/child'

const Parent = () => (
  <LoginProvider>
    <Child />
  </LoginProvider>
)

export default Parent

// /src/components/child/child.tsx
import { useEffect } from 'react'
import { useGoogleLogin } from '../../hooks/contexts'
import { PulseLoader } from 'react-spinners'
import styles from './child/module.css'

const Child = () => {
  const { user, authLoading, requireLogin } = useGoogleLogin()

  useEffect(() => {
    requireLogin()
  }, [requireLogin])

  if (authLoading) {
    return <PulseLoader />
  } else {
    return (
      <div className={styles.root}>
        <img src={user.photoURL} />
        <span className={styles.info}>
          <h3 className={styles.name}>{user.displayName}</h3>
          <p className={styles.email}>{user.email}</h3>
        </span>
      </div>
    )
  }
}

export default Child
```

In this example, the login context identifies the signed-in user, if any, and provides that value and the `requireLogin` function to the child component. The component displays a loading component if the auth state hasn't fully loaded and, when it has, displays the user's information and profile photo. If there turns out not to be a user signed in, the page redirects to the homepage using the `requireLogin` function in the `useEffect` hook.

## Types

The `LoginProvider` takes no props other than `children`, which can be react elements or string types.
