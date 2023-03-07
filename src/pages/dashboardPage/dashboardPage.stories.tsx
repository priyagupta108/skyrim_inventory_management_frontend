import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import { PageProvider } from '../../contexts/pageContext'
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
      <PageProvider>
        <DashboardPage />
      </PageProvider>
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{ user: null, token: null, authLoading: true, requireLogin }}
    >
      <PageProvider>
        <DashboardPage />
      </PageProvider>
    </LoginContext.Provider>
  </BrowserRouter>
)
