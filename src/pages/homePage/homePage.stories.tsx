import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import {
  loadingLoginContextValue,
  unauthenticatedLoginContextValue,
} from '../../support/data/contextValues'
import HomePage from './homePage'
export default { title: 'HomePage' }

export const Default = () => (
  <BrowserRouter>
    <LoginContext.Provider value={unauthenticatedLoginContextValue}>
      <HomePage />
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider value={loadingLoginContextValue}>
      <HomePage />
    </LoginContext.Provider>
  </BrowserRouter>
)
