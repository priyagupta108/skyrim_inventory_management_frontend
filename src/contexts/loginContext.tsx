import { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signOutWithGoogle } from '../firebase'
import { ProviderProps } from '../types/contexts'
import paths from '../routing/paths'

interface LoginContextType {
  authLoading: boolean
  token: string | null
  requireLogin: () => void
  user?: User | null
}

const LoginContext = createContext<LoginContextType>({
  user: null,
  token: null,
  authLoading: true,
  requireLogin: () => {}, // noop
})

const LoginProvider = ({ children }: ProviderProps) => {
  const [user, authLoading, authError] = useAuthState(auth)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  const requireLogin = useCallback(() => {
    if (!user && !authLoading) {
      navigate(paths.home)
    }
  }, [user, authLoading])

  const value = {
    user,
    token,
    requireLogin,
    authLoading,
  }

  useEffect(() => {
    if (authError) signOutWithGoogle()

    if (user) {
      user.getIdToken(true).then(token => setToken(token))
    }
  }, [user, authError])

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}

export { LoginContext, LoginProvider }
