import { gamesContextValue } from '../../support/data/contextValues'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import GameCreateForm from './gameCreateForm'

export default { title: 'GameCreateForm' }

export const Default = () => (
  <PageProvider>
    <GamesContext.Provider value={gamesContextValue}>
      <GameCreateForm />
    </GamesContext.Provider>
  </PageProvider>
)

export const Disabled = () => (
  <PageProvider>
    <GamesContext.Provider value={gamesContextValue}>
      <GameCreateForm disabled />
    </GamesContext.Provider>
  </PageProvider>
)
