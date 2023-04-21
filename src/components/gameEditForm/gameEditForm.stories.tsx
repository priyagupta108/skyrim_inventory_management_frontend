import { type Meta, type StoryObj } from '@storybook/react'
import { allGames as games } from '../../support/data/games'
import { gamesContextValue } from '../../support/data/contextValues'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import GameEditForm from './gameEditForm'

type EditFormStory = StoryObj<typeof GameEditForm>

const { id, name, description } = games[0]

const meta: Meta<typeof GameEditForm> = {
  title: 'GameEditForm',
  component: GameEditForm,
  decorators: [
    (Story) => (
      <PageProvider>
        <GamesContext.Provider value={gamesContextValue}>
          <Story />
        </GamesContext.Provider>
      </PageProvider>
    ),
  ],
}

export default meta

export const Default: EditFormStory = {
  args: {
    gameId: id,
    name,
    description,
  },
}

export const WithoutDescription: EditFormStory = {
  args: {
    gameId: id,
    name,
    description: null,
  },
}
