import { type MouseEventHandler } from 'react'
import { type RequestGame as Game } from '../../types/apiData'
import colorSchemes from '../../utils/colorSchemes'
import { ColorProvider } from '../../contexts/colorContext'
import { DONE } from '../../utils/loadingStates'
import {
  usePageContext,
  useGamesContext,
  useWishListsContext,
} from '../../hooks/contexts'
import GameForm from '../gameForm/gameForm'
import WishListItem from '../wishListItem/wishListItem'
import WishList from '../wishList/wishList'
import styles from './wishListGrouping.module.css'

const WishListGrouping = () => {
  const { setModalProps } = usePageContext()
  const { games, gamesLoadingState, createGame } = useGamesContext()
  const { wishLists } = useWishListsContext()

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

  if (!wishLists.length)
    return <p className={styles.noLists}>This game has no wish lists.</p>

  return (
    <div className={styles.root}>
      {wishLists.map(({ id, title, aggregate, list_items }, index) => {
        const colorIndex =
          index < colorSchemes.length ? index : index % colorSchemes.length
        const itemKey = title.toLowerCase().replace(' ', '-')

        return (
          <ColorProvider key={itemKey} colorScheme={colorSchemes[colorIndex]}>
            <div className={styles.wishList}>
              <WishList listId={id} title={title} editable={!aggregate}>
                {(list_items.length &&
                  list_items.map(
                    ({ id, description, quantity, unit_weight, notes }) => {
                      return (
                        <WishListItem
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
              </WishList>
            </div>
          </ColorProvider>
        )
      })}
    </div>
  )
}

export default WishListGrouping
