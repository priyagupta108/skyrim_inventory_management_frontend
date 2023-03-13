import { type ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { JSDOM } from 'jsdom'
import { render } from '@testing-library/react'
import { LoginContext } from '../contexts/loginContext'
import { User } from 'firebase/auth'
import testProfileImg from './testProfileImg.png'

export const BASE_APP_URI = 'http://localhost:5173'

declare global {
  namespace NodeJS {
    interface Global {
      document: Document
      window: Window
    }
  }
}

const setDom = () => {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost:5173',
  })

  global.window = dom.window as unknown as Window & typeof globalThis
  global.document = dom.window.document
}

/*
 *
 * Global Test Data
 *
 */

export const requireLogin = () => {
  /* noop */
}

export const testUser = {
  uid: 'edna',
  displayName: 'Edna St. Vincent Millay',
  email: 'edna@gmail.com',
  photoURL: testProfileImg,
  emailVerified: true,
  getIdtoken: () =>
    new Promise<string>((resolve, _reject) => resolve('xxxxxxx')),
} as unknown as User

/*
 *
 * Test Renderers
 *
 */

const renderWithJSDOM = (ui: ReactElement) => {
  setDom()

  return render(ui)
}

export const renderWithRouter = (ui: ReactElement) =>
  renderWithJSDOM(<BrowserRouter>{ui}</BrowserRouter>)

export const renderAuthenticated = (ui: ReactElement, authLoading = false) =>
  renderWithRouter(
    <LoginContext.Provider
      value={{
        user: testUser,
        token: 'xxxxxxx',
        requireLogin,
        authLoading,
      }}
    >
      {ui}
    </LoginContext.Provider>
  )

export const renderUnauthenticated = (ui: ReactElement) =>
  renderWithRouter(
    <LoginContext.Provider
      value={{
        user: null,
        token: null,
        authLoading: false,
        requireLogin,
      }}
    >
      {ui}
    </LoginContext.Provider>
  )

export const renderAuthLoading = (ui: ReactElement) =>
  renderWithRouter(
    <LoginContext.Provider
      value={{ user: null, token: null, authLoading: true, requireLogin }}
    >
      {ui}
    </LoginContext.Provider>
  )
