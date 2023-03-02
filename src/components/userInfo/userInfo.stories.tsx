import { BrowserRouter } from 'react-router-dom'
import { testUser } from '../../setupTests'
import { LoginContext } from '../../contexts/loginContext'
import UserInfo from './userInfo'

const userWithAnonymousAvatar = {
  ...testUser,
  photoURL: null
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
    <LoginContext.Provider value={{ user: userWithAnonymousAvatar, authLoading: false }}>
      <div style={{ height: '64px', display: 'flex' }}>
        <UserInfo />
      </div>
    </LoginContext.Provider>
  </BrowserRouter>
)