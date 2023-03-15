import {
  loginContextValue,
  gamesContextValue,
} from '../../support/data/contextValues'
import { GamesContext } from '../../contexts/gamesContext'
import { PageProvider } from '../../contexts/pageContext'
import { LoginContext } from '../../contexts/loginContext'
import GameLineItem from './gameLineItem'

export default { title: 'GameLineItem' }

export const WithDescription = () => (
  <LoginContext.Provider value={loginContextValue}>
    <PageProvider>
      <GamesContext.Provider value={gamesContextValue}>
        <GameLineItem
          gameId={4}
          name="My Game 1"
          description="This is a custom description created by the user."
        />
      </GamesContext.Provider>
    </PageProvider>
  </LoginContext.Provider>
)

export const WithLongDescription = () => (
  <LoginContext.Provider value={loginContextValue}>
    <PageProvider>
      <GamesContext.Provider value={gamesContextValue}>
        <GameLineItem
          gameId={4}
          name="De finibus bonorum et malorum"
          description="Cum audissem Antiochum, Brute, ut solebam, cum M. Pisone in eo gymnasio, quod Ptolomaeum vocatur, unaque nobiscum Q. frater et T. Pomponius postmeridianam conficeremus in Academia"
        />
      </GamesContext.Provider>
    </PageProvider>
  </LoginContext.Provider>
)

export const NoDescription = () => (
  <LoginContext.Provider value={loginContextValue}>
    <PageProvider>
      <GamesContext.Provider value={gamesContextValue}>
        <GameLineItem
          gameId={4}
          name="This game has a really really really really really long name for testing purposes"
        />
      </GamesContext.Provider>
    </PageProvider>
  </LoginContext.Provider>
)
