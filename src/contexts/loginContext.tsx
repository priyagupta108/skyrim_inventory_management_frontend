import { createContext, type ReactElement } from 'react'
import { type User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

interface LoginContextType {
  authLoading: boolean
  user?: User | null
  authError?: Error
}

interface ProviderProps {
  children: ReactElement | string
}

const LoginContext = createContext<LoginContextType>({ user: null, authLoading: true })

const LoginProvider = ({ children }: ProviderProps) => {
  const [user, authLoading, authError] = useAuthState(auth)

  const value = {
    user,
    authLoading,
    authError
  }

  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginContext, LoginProvider }