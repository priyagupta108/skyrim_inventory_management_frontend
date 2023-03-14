import { BrowserRouter } from 'react-router-dom'
import { testUser } from '../../support/data/users'
import { loginContextValue } from '../../support/data/contextValues'
import { LoginContext } from '../../contexts/loginContext'
import UserInfo from './userInfo'

const userWithAnonymousAvatar = {
  ...testUser,
  photoURL: null,
}

export default { title: 'UserInfo' }

export const WithPhoto = () => (
  <BrowserRouter>
    <LoginContext.Provider value={loginContextValue}>
      <div style={{ height: '64px', display: 'flex' }}>
        <UserInfo />
      </div>
    </LoginContext.Provider>
  </BrowserRouter>
)

export const WithAnonymousAvatar = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{ ...loginContextValue, user: userWithAnonymousAvatar }}
    >
      <div style={{ height: '64px', display: 'flex' }}>
        <UserInfo />
      </div>
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{ ...loginContextValue, user: null, authLoading: true }}
    >
      <div style={{ height: '64px', display: 'flex' }}>
        <UserInfo />
      </div>
    </LoginContext.Provider>
  </BrowserRouter>
)
