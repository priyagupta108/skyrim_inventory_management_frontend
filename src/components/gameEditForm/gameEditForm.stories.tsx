import { allGames as games } from '../../support/data/games'
import { DONE } from '../../utils/loadingStates'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import GameEditForm from './gameEditForm'

const contextValue = {
  games,
  gamesLoadingState: DONE,
  createGame: () => {},
  destroyGame: () => {},
}

const { id, name, description } = games[0]

export default { title: 'GameEditForm' }

export const Default = () => (
  <PageProvider>
    <GamesContext.Provider value={contextValue}>
      <GameEditForm gameId={id} name={name} description={description} />
    </GamesContext.Provider>
  </PageProvider>
)

export const WithoutDescription = () => (
  <PageProvider>
    <GamesContext.Provider value={contextValue}>
      <GameEditForm gameId={id} name={name} description={null} />
    </GamesContext.Provider>
  </PageProvider>
)
