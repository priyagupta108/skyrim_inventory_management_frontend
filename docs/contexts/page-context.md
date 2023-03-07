# Page Context

The `PageContext` controls the display of global (dashboard) elements like flash messages and modals. It makes sense to control the appearance and disappearance of these components centrally in a context since they can be used by multiple elements on the page concurrently, allowing for problems if each individual element controls its own flash message or modal. Eventually, this context may be used to control other aspects of the global UI.

## The `FlashMessage` Component

Currently, the only such global element is the `FlashMessage` component. This component displays information relevant to the user, such as error messages or success messages. It has four `types`, passed in as props, which affect the colour presented to the user:

- `success` (green)
- `info` (blue)
- `warning` (yellow)
- `error` (red)

The other props of the component are:

- `message`: a string or array of strings to be displayed to the user
- `heading` (optional): a string that will be displayed in bold type above the message
- `hidden`: a boolean indicating whether the flash message should be hidden

If the message passed is an array, each string in the array will be displayed as a bullet point on a list.

**The `FlashMessage` component should only be present in the `DashboardLayout` component and should exclusively be controlled through the values provided by the `PageContext`.**

## The `PageContext`

The `PageProvider` exposes two values to the user: `flashProps` (an object of type `FlashMessageProps`) and `setFlashProps` (a function taking such an object as an argument), both of which are implemented as state variables within the context provider. Because of required values in the `FlashMessageProps` type, there is a default value of `flashProps` that includes an empty string as the message, a type of `'info'`, and, most importantly, `hidden: true`.

When an individual component needs to display a flash message, it can access these values using the `usePageContext()` hook. To display the message, it should call `setFlashProps` with the desired type, message, and (optionally) header. The `hidden` value should also be set to `false`.

The `PageProvider` ensures that the flash message is hidden after a period of time, so there is no need for a user to manually dismiss it or for a component using it to ensure it disappears.

## Example

```tsx
/*
 *
 * /src/components/parent/parent.tsx
 *
 */

import { PageProvider } from '../../contexts/pageContext'
import { LoginProvider } from '../../contexts/loginContext'
import Child from '../child/child'

const Parent = () => (
  <LoginProvider>
    <PageProvider>
      <Child />
    </PageProvider>
  </LoginProvider>
)

export default Parent

/*
 *
 * /src/components/child/child.tsx
 *
 */

import { useState, useEffect } from 'react'
import { signOutWithGoogle } from '../../firebase'
import { type Game } from '../../types/games'
import { type ApiError } from '../../types/errors'
import { useGoogleLogin, usePageContext } from '../../hooks/contexts'
import { getGames } from '../../utils/simApi'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import styles from './child.module.css'

const Child = () => {
  const { user, token, authLoading } = useGoogleLogin()
  const { setFlashProps } = usePageContext()
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    if (authLoading) return

    if (user && token) {
      getGames(token)
        .then(({ json }) => {
          setGames(json)
        })
        .catch((e: ApiError) => {
          if (e.status === 401) signOutWithGoogle()

          setFlashProps({
            type: 'error',
            message: e.message,
            hidden: false,
          })
        })
    }
  }, [user, token, authLoading])

  return (
    <DashboardLayout title="Games">
      /* TSX to display retrieved games */
    </DashboardLayout>
  )
}

export default Child
```

Notice the use of the `DashboardLayout` in the `Child` component. It is essential that any component that makes use of flash messages be nested, at any level of nesting, inside a layout component that includes a `FlashMessage`. Currently, `DashboardLayout` is the only such component.
