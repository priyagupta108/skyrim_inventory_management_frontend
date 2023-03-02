import { BrowserRouter } from 'react-router-dom'
import { testUser } from '../../setupTests'
import { LoginContext } from '../../contexts/loginContext'
import DashboardHeader from './dashboardHeader'

export default { title: 'DashboardHeader' }

export const Default = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: testUser, authLoading: false }}>
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
      value={{ user: userWithAnonymousAvatar, authLoading: false }}
    >
      <DashboardHeader />
    </LoginContext.Provider>
  </BrowserRouter>
)
