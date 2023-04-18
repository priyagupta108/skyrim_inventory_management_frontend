import { createContext, useState, useEffect, useCallback } from 'react'
import { type User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signOutWithGoogle } from '../firebase'
import { ProviderProps } from '../types/contexts'

export interface LoginContextType {
  authLoading: boolean
  token: string | null
  withTokenRefresh: (fn: (idToken: string) => void) => void
  user?: User | null
}

export const LoginContext = createContext<LoginContextType>({
  user: null,
  token: null,
  authLoading: true,
  withTokenRefresh: () => {},
})

export const LoginProvider = ({ children }: ProviderProps) => {
  const [user, authLoading, authError] = useAuthState(auth)
  const [token, setToken] = useState<string | null>(null)

  const refreshToken = useCallback(() => {
    if (user) user.getIdToken(true).then((idToken) => setToken(idToken))
  }, [user])

  const withTokenRefresh = (fn: Function) => {
    if (user) {
      user.getIdToken(true).then((idToken) => {
        setToken(idToken)
        fn(idToken)
      })
    }
  }

  const value = {
    user,
    token,
    withTokenRefresh,
    authLoading,
  }

  useEffect(() => {
    if (authError) signOutWithGoogle()

    refreshToken()
  }, [user, authError])

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}
