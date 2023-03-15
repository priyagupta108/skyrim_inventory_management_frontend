import { BrowserRouter } from 'react-router-dom'
import { loginContextValue } from '../../support/data/contextValues'
import { LoginContext } from '../../contexts/loginContext'
import DashboardLayout from './dashboardLayout'

export default { title: 'DashboardLayout' }

export const WithTitle = () => (
  <BrowserRouter>
    <LoginContext.Provider value={loginContextValue}>
      <DashboardLayout title={'Page Title'}>Hello World</DashboardLayout>
    </LoginContext.Provider>
  </BrowserRouter>
)

export const WithoutTitle = () => (
  <BrowserRouter>
    <LoginContext.Provider value={loginContextValue}>
      <DashboardLayout>Hello World</DashboardLayout>
    </LoginContext.Provider>
  </BrowserRouter>
)
