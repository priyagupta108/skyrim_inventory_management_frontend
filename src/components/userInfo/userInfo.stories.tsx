import { BrowserRouter } from 'react-router-dom'
import { testUser } from '../../support/testUtils'
import { LoginContext } from '../../contexts/loginContext'
import UserInfo from './userInfo'

const userWithAnonymousAvatar = {
  ...testUser,
  photoURL: null,
}

export default { title: 'UserInfo' }

export const WithPhoto = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: testUser, authLoading: false }}>
      <div style={{ height: '64px', display: 'flex' }}>
        <UserInfo />
      </div>
    </LoginContext.Provider>
  </BrowserRouter>
)

export const WithAnonymousAvatar = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{ user: userWithAnonymousAvatar, authLoading: false }}
    >
      <div style={{ height: '64px', display: 'flex' }}>
        <UserInfo />
      </div>
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: null, authLoading: true }}>
      <div style={{ height: '64px', display: 'flex' }}>
        <UserInfo />
      </div>
    </LoginContext.Provider>
  </BrowserRouter>
)
