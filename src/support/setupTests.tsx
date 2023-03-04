import { type ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { LoginContext } from '../contexts/loginContext'
import { User } from 'firebase/auth'
import testProfileImg from './testProfileImg.png'

export const testUser = {
  uid: 'edna',
  displayName: 'Edna St. Vincent Millay',
  email: 'edna@gmail.com',
  photoURL: testProfileImg,
  emailVerified: true,
} as User

export const renderWithRouter = (ui: ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>)

const requireLogin = () => { /* noop */ }

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
