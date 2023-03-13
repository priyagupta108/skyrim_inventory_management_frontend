import { allGames } from '../../support/data/games'
import { DONE } from '../../utils/loadingStates'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import GameCreateForm from './gameCreateForm'

const noop = () => {}

const providerValue = {
  games: allGames,
  gamesLoadingState: DONE,
  destroyGame: noop,
  createGame: noop,
}

export default { title: 'GameCreateForm' }

export const Default = () => (
  <PageProvider>
    <GamesContext.Provider value={providerValue}>
      <GameCreateForm />
    </GamesContext.Provider>
  </PageProvider>
)

export const Disabled = () => (
  <PageProvider>
    <GamesContext.Provider value={providerValue}>
      <GameCreateForm disabled />
    </GamesContext.Provider>
  </PageProvider>
)
