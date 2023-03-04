import { type ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { LoginContext } from '../contexts/loginContext'
import { User } from 'firebase/auth'
import testProfileImg from './testProfileImg.png'

export const requireLogin = () => { /* noop */ }

export const testUser = {
  uid: 'edna',
  displayName: 'Edna St. Vincent Millay',
  email: 'edna@gmail.com',
  photoURL: testProfileImg,
  emailVerified: true,
  getIdToken: () => new Promise<string>((resolve, _reject) => resolve('xxxxxxx'))
} as User

export const renderWithRouter = (ui: ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>)

export const renderAuthenticated = (
  ui: ReactElement,
  authLoading = false,
  authError = undefined
) =>
  renderWithRouter(
    <LoginContext.Provider value={{ user: testUser, token: 'xxxxxxx', requireLogin, authLoading, authError }}>
      {ui}
    </LoginContext.Provider>
  )

export const renderUnauthenticated = (ui: ReactElement) =>
  renderWithRouter(
    <LoginContext.Provider value={{ user: null, token: null, authLoading: false, requireLogin }}>
      {ui}
    </LoginContext.Provider>
  )

export const renderAuthLoading = (ui: ReactElement) =>
  renderWithRouter(
    <LoginContext.Provider value={{ user: null, token: null, authLoading: true, requireLogin }}>
      {ui}
    </LoginContext.Provider>
  )
