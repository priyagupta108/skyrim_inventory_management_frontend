import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import { testUser, requireLogin } from '../../support/testUtils'
import DashboardPage from './dashboardPage'

export default { title: 'DashboardPage' }

export const Default = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{
        user: testUser,
        token: 'xxxxxxx',
        authLoading: false,
        requireLogin,
      }}
    >
      <DashboardPage />
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{ user: null, token: null, authLoading: true, requireLogin }}
    >
      <DashboardPage />
    </LoginContext.Provider>
  </BrowserRouter>
)
