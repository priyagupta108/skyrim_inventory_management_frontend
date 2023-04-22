import { type Meta, type StoryObj } from '@storybook/react'
import colorSchemes from '../../utils/colorSchemes'
import { BrowserRouter } from 'react-router-dom'
import {
  gamesContextValue,
  loginContextValue,
  shoppingListsContextValue,
} from '../../support/data/contextValues'
import { LoginContext } from '../../contexts/loginContext'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import { ShoppingListsContext } from '../../contexts/shoppingListsContext'
import { ColorProvider } from '../../contexts/colorContext'
import ShoppingListItem from '../shoppingListItem/shoppingListItem'
import ShoppingList from './shoppingList'

type ShoppingListStory = StoryObj<typeof ShoppingList>

const meta: Meta<typeof ShoppingList> = {
  title: 'ShoppingList',
  component: ShoppingList,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <LoginContext.Provider value={loginContextValue}>
          <PageProvider>
            <GamesContext.Provider value={gamesContextValue}>
              <ShoppingListsContext.Provider value={shoppingListsContextValue}>
                <ColorProvider
                  colorScheme={
                    colorSchemes[
                      Math.floor(Math.random() * colorSchemes.length)
                    ]
                  }
                >
                  <Story />
                </ColorProvider>
              </ShoppingListsContext.Provider>
            </GamesContext.Provider>
          </PageProvider>
        </LoginContext.Provider>
      </BrowserRouter>
    ),
  ],
}

export default meta

export const EditableNoListItems: ShoppingListStory = {
  args: {
    listId: 32,
    title: 'Proudspire Manor',
    editable: true,
  },
}

export const EditableWithListItems: ShoppingListStory = {
  args: {
    ...EditableNoListItems.args,
    children: (
      <>
        <ShoppingListItem
          itemId={1}
          listTitle="Proudspire Manor"
          description="Steel Ingot"
          quantity={5}
          unitWeight={1.0}
          editable
        />
        <ShoppingListItem
          itemId={2}
          listTitle="Proudspire Manor"
          description="This item has a really really really really really long description for testing purposes"
          quantity={200000000000}
          unitWeight={400000000000}
          notes="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet velit adipsci"
          editable
        />
      </>
    ),
  },
}

export const NotEditableNoListItems: ShoppingListStory = {
  args: {
    listId: 32,
    title: 'All Items',
  },
}

export const NotEditableWithListItems: ShoppingListStory = {
  args: {
    ...NotEditableNoListItems.args,
    children: (
      <>
        <ShoppingListItem
          itemId={1}
          listTitle="All Items"
          description="Steel Ingot"
          quantity={5}
          unitWeight={1.0}
        />
        <ShoppingListItem
          itemId={2}
          listTitle="All Items"
          description="This item has a really really really really really long description for testing purposes"
          quantity={200000000000}
          unitWeight={400000000000}
          notes="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet velit adipsci"
        />
      </>
    ),
  },
}
