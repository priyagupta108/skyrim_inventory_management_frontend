import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import { testUser } from '../../support/setupTests'
import DashboardPage from './dashboardPage'

export default { title: 'DashboardPage' }

export const Default = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: testUser, authLoading: false }}>
      <DashboardPage />
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: null, authLoading: true }}>
      <DashboardPage />
    </LoginContext.Provider>
  </BrowserRouter>
)
