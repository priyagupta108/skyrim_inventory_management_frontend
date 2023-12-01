import { type MouseEventHandler } from 'react'
import { type RequestGame as Game } from '../../types/apiData'
import colorSchemes from '../../utils/colorSchemes'
import { ColorProvider } from '../../contexts/colorContext'
import { DONE } from '../../utils/loadingStates'
import {
  usePageContext,
  useGamesContext,
  useShoppingListsContext,
} from '../../hooks/contexts'
import GameForm from '../gameForm/gameForm'
import ShoppingListItem from '../shoppingListItem/shoppingListItem'
import ShoppingList from '../shoppingList/shoppingList'
import styles from './shoppingListGrouping.module.css'

const ShoppingListGrouping = () => {
  const { setModalProps } = usePageContext()
  const { games, gamesLoadingState, createGame } = useGamesContext()
  const { shoppingLists } = useShoppingListsContext()

  const showGameForm: MouseEventHandler = (e) => {
    e.preventDefault()

    const submit = (attributes: Game) => {
      createGame(attributes, () => {
        setModalProps({ hidden: true, children: <></> })
      })
    }

    setModalProps({
      hidden: false,
      children: <GameForm submitForm={submit} type="create" />,
    })
  }

  if (gamesLoadingState === DONE && !games.length)
    return (
      <p className={styles.noLists}>
        You need a game to use the wish lists feature.{' '}
        <button className={styles.link} onClick={showGameForm}>
          Create a game
        </button>{' '}
        to get started.
      </p>
    )

  if (!shoppingLists.length)
    return <p className={styles.noLists}>This game has no wish lists.</p>

  return (
    <div className={styles.root}>
      {shoppingLists.map(({ id, title, aggregate, list_items }, index) => {
        const colorIndex =
          index < colorSchemes.length ? index : index % colorSchemes.length
        const itemKey = title.toLowerCase().replace(' ', '-')

        return (
          <ColorProvider key={itemKey} colorScheme={colorSchemes[colorIndex]}>
            <div className={styles.shoppingList}>
              <ShoppingList listId={id} title={title} editable={!aggregate}>
                {(list_items.length &&
                  list_items.map(
                    ({ id, description, quantity, unit_weight, notes }) => {
                      return (
                        <ShoppingListItem
                          key={`${description
                            .toLowerCase()
                            .replace(' ', '-')}-${id}`}
                          itemId={id}
                          listTitle={title}
                          description={description}
                          quantity={quantity}
                          unitWeight={unit_weight}
                          notes={notes}
                          editable={!aggregate}
                        />
                      )
                    }
                  )) ||
                  null}
              </ShoppingList>
            </div>
          </ColorProvider>
        )
      })}
    </div>
  )
}

export default ShoppingListGrouping
