import { BrowserRouter } from 'react-router-dom'
import { requireLogin } from '../../support/testUtils'
import { LoginContext } from '../../contexts/loginContext'
import HomePage from './homePage'
export default { title: 'HomePage' }

export const Default = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: null, token: null, authLoading: false, requireLogin }}>
      <HomePage />
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: null, token: null, authLoading: true, requireLogin }}>
      <HomePage />
    </LoginContext.Provider>
  </BrowserRouter>
)
