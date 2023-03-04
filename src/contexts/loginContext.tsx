import { createContext, type ReactElement } from 'react'
import { type User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signOutWithGoogle } from '../firebase'
import { ProviderProps } from '../types/contexts'
import paths from '../routing/paths'

interface LoginContextType {
  authLoading: boolean
  user?: User | null
  authError?: Error
}

const LoginContext = createContext<LoginContextType>({
  user: null,
  authLoading: true,
})

const LoginProvider = ({ children }: ProviderProps) => {
  const [user, authLoading, authError] = useAuthState(auth)

  const value = {
    user,
    authLoading,
    authError,
  }

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}

export { LoginContext, LoginProvider }
