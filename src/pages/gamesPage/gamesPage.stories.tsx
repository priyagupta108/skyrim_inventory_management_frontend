import { BrowserRouter } from 'react-router-dom'
import { testUser, requireLogin } from '../../support/testUtils'
import { allGames, emptyGames } from '../../support/data/games'
import { LoginContext } from '../../contexts/loginContext'
import GamesPage from './gamesPage'
import { GamesProvider } from '../../contexts/gamesContext'

const GAMES_URI = 'http://localhost:3000/games'

export default {
  title: 'GamesPage',
}

export const NoGames = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{
        user: testUser,
        token: 'xxxxxxx',
        authLoading: false,
        requireLogin,
      }}
    >
      <GamesProvider>
        <GamesPage />
      </GamesProvider>
    </LoginContext.Provider>
  </BrowserRouter>
)

NoGames.parameters = {
  mockData: [
    {
      url: GAMES_URI,
      method: 'GET',
      status: 200,
      response: emptyGames,
    },
  ],
}

export const WithGames = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{
        user: testUser,
        token: 'xxxxxxx',
        authLoading: false,
        requireLogin,
      }}
    >
      <GamesProvider>
        <GamesPage />
      </GamesProvider>
    </LoginContext.Provider>
  </BrowserRouter>
)

WithGames.parameters = {
  mockData: [
    {
      url: GAMES_URI,
      method: 'GET',
      status: 200,
      response: allGames,
    },
  ],
}

export const AuthLoading = () => (
  <BrowserRouter>
    <LoginContext.Provider
      value={{ user: null, token: null, authLoading: true, requireLogin }}
    >
      <GamesProvider>
        <GamesPage />
      </GamesProvider>
    </LoginContext.Provider>
  </BrowserRouter>
)
