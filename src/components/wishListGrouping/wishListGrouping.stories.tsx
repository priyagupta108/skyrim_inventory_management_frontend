import { type Meta, type StoryObj } from '@storybook/react'
import {
  gamesContextValue,
  gamesContextValueEmpty,
  shoppingListsContextValue,
  shoppingListsContextValueEmpty,
} from '../../support/data/contextValues'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import { ShoppingListsContext } from '../../contexts/wishListsContext'
import ShoppingListGrouping from './wishListGrouping'

type GroupingStory = StoryObj<typeof ShoppingListGrouping>

const meta: Meta<typeof ShoppingListGrouping> = {
  title: 'ShoppingListGrouping',
  component: ShoppingListGrouping,
  decorators: [
    (Story, { parameters }) => (
      <PageProvider>
        <GamesContext.Provider value={parameters.gamesContextValue}>
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
    gamesContextValue,
    shoppingListsContextValue,
  },
}

export const WithoutShoppingLists: GroupingStory = {
  parameters: {
    gamesContextValue,
    shoppingListsContextValue: shoppingListsContextValueEmpty,
  },
}

export const NoGames: GroupingStory = {
  parameters: {
    gamesContextValue: gamesContextValueEmpty,
    shoppingListsContextValue,
  },
}
