import { allGames as games } from '../../support/data/games'
import { gamesContextValue } from '../../support/data/contextValues'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import GameEditForm from './gameEditForm'

const { id, name, description } = games[0]

export default { title: 'GameEditForm' }

export const Default = () => (
  <PageProvider>
    <GamesContext.Provider value={gamesContextValue}>
      <GameEditForm gameId={id} name={name} description={description} />
    </GamesContext.Provider>
  </PageProvider>
)

export const WithoutDescription = () => (
  <PageProvider>
    <GamesContext.Provider value={gamesContextValue}>
      <GameEditForm gameId={id} name={name} description={null} />
    </GamesContext.Provider>
  </PageProvider>
)
