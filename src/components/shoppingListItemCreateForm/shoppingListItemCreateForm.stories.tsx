import { type Meta, type StoryObj } from '@storybook/react'
import {
  gamesContextValue,
  loginContextValue,
  shoppingListsContextValue,
} from '../../support/data/contextValues'
import { BLUE } from '../../utils/colorSchemes'
import { LoginContext } from '../../contexts/loginContext'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import { ShoppingListsContext } from '../../contexts/shoppingListsContext'
import { ColorProvider } from '../../contexts/colorContext'
import ShoppingListItemCreateForm from './shoppingListItemCreateForm'

type CreateFormStory = StoryObj<typeof ShoppingListItemCreateForm>

const meta: Meta<typeof ShoppingListItemCreateForm> = {
  title: 'ShoppingListItemCreateForm',
  component: ShoppingListItemCreateForm,
  decorators: [
    (Story) => (
      <LoginContext.Provider value={loginContextValue}>
        <PageProvider>
          <GamesContext.Provider value={gamesContextValue}>
            <ShoppingListsContext.Provider value={shoppingListsContextValue}>
              <ColorProvider colorScheme={BLUE}>
                <Story />
              </ColorProvider>
            </ShoppingListsContext.Provider>
          </GamesContext.Provider>
        </PageProvider>
      </LoginContext.Provider>
    ),
  ],
}

export default meta

export const Default: CreateFormStory = {
  args: {
    listId: 4,
  },
}
