import { type Meta, type StoryObj } from '@storybook/react'
import {
  gamesContextValue,
  gamesContextValueLoading,
  shoppingListsContextValue,
} from '../../support/data/contextValues'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import { ShoppingListsContext } from '../../contexts/shoppingListsContext'
import ShoppingListCreateForm from './shoppingListCreateForm'

type CreateFormStory = StoryObj<typeof ShoppingListCreateForm>

const meta: Meta<typeof ShoppingListCreateForm> = {
  title: 'ShoppingListCreateForm',
  component: ShoppingListCreateForm,
  decorators: [
    (Story, { parameters }) => (
      <PageProvider>
        <GamesContext.Provider value={parameters.gamesContextValue}>
          <ShoppingListsContext.Provider value={shoppingListsContextValue}>
            <Story />
          </ShoppingListsContext.Provider>
        </GamesContext.Provider>
      </PageProvider>
    ),
  ],
}

export default meta

export const Enabled: CreateFormStory = {
  parameters: {
    gamesContextValue,
  },
}

export const Disabled: CreateFormStory = {
  parameters: {
    gamesContextValue: gamesContextValueLoading,
  },
}
