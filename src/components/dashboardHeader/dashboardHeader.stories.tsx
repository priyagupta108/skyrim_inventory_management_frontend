import { BrowserRouter } from 'react-router-dom'
import { testUser } from '../../support/data/users'
import {
  loadingLoginContextValue,
  loginContextValue,
} from '../../support/data/contextValues'
import { LoginContext } from '../../contexts/loginContext'
import DashboardHeader from './dashboardHeader'

export default { title: 'DashboardHeader' }

export const Default = () => (
  <BrowserRouter>
    <LoginContext.Provider value={loginContextValue}>
      <DashboardHeader />
    </LoginContext.Provider>
  </BrowserRouter>
)

const userWithAnonymousAvatar = {
  ...testUser,
  photoURL: null,
}

export const WithAnonymousAvatar = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{ ...loginContextValue, user: userWithAnonymousAvatar }}
    >
      <DashboardHeader />
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider value={loadingLoginContextValue}>
      <DashboardHeader />
    </LoginContext.Provider>
  </BrowserRouter>
)
