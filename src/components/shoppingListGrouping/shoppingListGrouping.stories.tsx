import { type Meta, type StoryObj } from '@storybook/react'
import {
  gamesContextValue,
  shoppingListsContextValue,
  shoppingListsContextValueEmpty,
} from '../../support/data/contextValues'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import { ShoppingListsContext } from '../../contexts/shoppingListsContext'
import ShoppingListGrouping from './shoppingListGrouping'

type GroupingStory = StoryObj<typeof ShoppingListGrouping>

const meta: Meta<typeof ShoppingListGrouping> = {
  title: 'ShoppingListGrouping',
  component: ShoppingListGrouping,
  decorators: [
    (Story, { parameters }) => (
      <PageProvider>
        <GamesContext.Provider value={gamesContextValue}>
          <ShoppingListsContext.Provider
            value={parameters.shoppingListsContextValue}
          >
            <Story />
          </ShoppingListsContext.Provider>
        </GamesContext.Provider>
      </PageProvider>
    ),
  ],
}

export default meta

export const WithShoppingLists: GroupingStory = {
  parameters: {
    shoppingListsContextValue,
  },
}

export const WithoutShoppingLists: GroupingStory = {
  parameters: {
    shoppingListsContextValue: shoppingListsContextValueEmpty,
  },
}
