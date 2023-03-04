import { BrowserRouter } from 'react-router-dom'
import { LoginContext } from '../../contexts/loginContext'
import HomePage from './homePage'
export default { title: 'HomePage' }

export const Default = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: null, authLoading: false }}>
      <HomePage />
    </LoginContext.Provider>
  </BrowserRouter>
)

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider value={{ user: null, authLoading: true }}>
      <HomePage />
    </LoginContext.Provider>
  </BrowserRouter>
)
