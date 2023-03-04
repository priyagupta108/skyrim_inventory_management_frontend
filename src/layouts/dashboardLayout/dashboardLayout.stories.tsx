import { BrowserRouter } from 'react-router-dom'
import { testUser } from '../../support/testUtils'
import { LoginContext } from '../../contexts/loginContext'
import DashboardLayout from './dashboardLayout'

export default { title: 'DashboardLayout' }

export const WithTitle = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: testUser, authLoading: false }}>
      <DashboardLayout title={'Page Title'}>Hello World</DashboardLayout>
    </LoginContext.Provider>
  </BrowserRouter>
)

export const WithoutTitle = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: testUser, authLoading: false }}>
      <DashboardLayout>Hello World</DashboardLayout>
    </LoginContext.Provider>
  </BrowserRouter>
)
