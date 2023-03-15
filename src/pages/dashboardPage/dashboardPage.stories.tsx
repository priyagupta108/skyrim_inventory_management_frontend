import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import { PageProvider } from '../../contexts/pageContext'
import {
  loadingLoginContextValue,
  loginContextValue,
} from '../../support/data/contextValues'
import DashboardPage from './dashboardPage'

export default { title: 'DashboardPage' }

export const Default = () => (
  <BrowserRouter>
    <LoginContext.Provider value={loginContextValue}>
      <PageProvider>
        <DashboardPage />
      </PageProvider>
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider value={loadingLoginContextValue}>
      <PageProvider>
        <DashboardPage />
      </PageProvider>
    </LoginContext.Provider>
  </BrowserRouter>
)
