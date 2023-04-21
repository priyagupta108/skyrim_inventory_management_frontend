import { type Meta, type StoryObj } from '@storybook/react'
import {
  gamesContextValue,
  shoppingListsContextValue,
} from '../../support/data/contextValues'
import { GREEN, YELLOW } from '../../utils/colorSchemes'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import { ShoppingListsContext } from '../../contexts/shoppingListsContext'
import ShoppingListItemEditForm from './shoppingListItemEditForm'

type EditFormStory = StoryObj<typeof ShoppingListItemEditForm>

const meta: Meta<typeof ShoppingListItemEditForm> = {
  title: 'ShoppingListItemEditForm',
  component: ShoppingListItemEditForm,
  decorators: [
    (Story) => (
      <PageProvider>
        <GamesContext.Provider value={gamesContextValue}>
          <ShoppingListsContext.Provider value={shoppingListsContextValue}>
            <Story />
          </ShoppingListsContext.Provider>
        </GamesContext.Provider>
      </PageProvider>
    ),
  ],
}

export default meta

export const Default: EditFormStory = {
  args: {
    itemId: 6,
    listTitle: 'Alchemy Ingredients',
    description: 'Health potion ingredients',
    quantity: 5,
    unitWeight: 0.1,
    notes: null,
    buttonColor: GREEN,
  },
}

export const LongValues: EditFormStory = {
  args: {
    ...Default.args,
    listTitle:
      'List with a Really Really Really Really Really Long Title for Testing Purposes',
    description:
      'This item has a really really really really really long description for testing purposes',
    notes:
      'The notes on this item are really really really really really really long for testing purposes',
    buttonColor: YELLOW,
  },
}
