import { type Meta, type StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import {
  gamesContextValue,
  gamesContextValueLoading,
  shoppingListsContextValue,
  shoppingListsContextValueLoading,
  shoppingListsContextValueEmpty,
  loginContextValue,
  gamesContextValueEmpty,
} from '../../support/data/contextValues'
import { ShoppingListsContext } from '../../contexts/wishListsContext'
import { LoginContext } from '../../contexts/loginContext'
import { GamesContext } from '../../contexts/gamesContext'
import { PageProvider } from '../../contexts/pageContext'
import ShoppingListsPage from './wishListsPage'

type ShoppingListsPageStory = StoryObj<typeof ShoppingListsPage>

const meta: Meta<typeof ShoppingListsPage> = {
  title: 'ShoppingListsPage',
  component: ShoppingListsPage,
  decorators: [
    (Story, { parameters }) => (
      <BrowserRouter>
        <LoginContext.Provider value={loginContextValue}>
          <PageProvider>
            <GamesContext.Provider value={parameters.gamesContextValue}>
              <ShoppingListsContext.Provider
                value={parameters.shoppingListsContextValue}
              >
                <Story />
              </ShoppingListsContext.Provider>
            </GamesContext.Provider>
          </PageProvider>
        </LoginContext.Provider>
      </BrowserRouter>
    ),
  ],
}

export default meta

export const GamesLoading: ShoppingListsPageStory = {
  parameters: {
    gamesContextValue: gamesContextValueLoading,
    shoppingListsContextValue,
  },
}

export const NoGames: ShoppingListsPageStory = {
  parameters: {
    gamesContextValue: gamesContextValueEmpty,
    shoppingListsContextValue: shoppingListsContextValueEmpty,
  },
}

export const ShoppingListsLoading: ShoppingListsPageStory = {
  parameters: {
    gamesContextValue,
    shoppingListsContextValue: shoppingListsContextValueLoading,
  },
}

export const WithShoppingLists: ShoppingListsPageStory = {
  parameters: {
    gamesContextValue,
    shoppingListsContextValue,
  },
}

export const NoShoppingLists: ShoppingListsPageStory = {
  parameters: {
    gamesContextValue,
    shoppingListsContextValue: shoppingListsContextValueEmpty,
  },
}
