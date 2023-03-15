import { useState, type MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import AnimateHeight from 'react-animate-height'
import { useGamesContext, usePageContext } from '../../hooks/contexts'
import GameEditForm from '../gameEditForm/gameEditForm'
import styles from './gameLineItem.module.css'

const DEFAULT_DESCRIPTION = 'This game has no description.'
const DESTROY_CONFIRMATION =
  'Are you sure you want to delete this game? This cannot be undone. You will lose all data associated with the game you delete.'

interface GameLineItemProps {
  gameId: number
  name: string
  description: string | null
}

const GameLineItem = ({ gameId, name, description }: GameLineItemProps) => {
  const { destroyGame } = useGamesContext()
  const { setFlashProps, setModalProps } = usePageContext()
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  const toggleDescription: MouseEventHandler = (e) => {
    e.preventDefault()

    setDescriptionExpanded(!descriptionExpanded)
  }

  const destroy: MouseEventHandler = (e) => {
    e.preventDefault()

    const confirm = window.confirm(DESTROY_CONFIRMATION)

    if (confirm) {
      destroyGame(gameId)
    } else {
      setFlashProps({
        hidden: false,
        type: 'info',
        message: 'OK, your game will not be destroyed.',
      })
    }
  }

  const showEditForm: MouseEventHandler = (e) => {
    e.preventDefault()

    setModalProps({
      hidden: false,
      children: (
        <GameEditForm gameId={gameId} name={name} description={description} />
      ),
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.summary}>
        <span>
          <button
            className={styles.icon}
            onClick={destroy}
            data-testid={`destroyGame${gameId}`}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button
            className={styles.icon}
            onClick={showEditForm}
            data-testid={`editGame${gameId}`}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </span>
        <h3
          role="button"
          aria-expanded={descriptionExpanded}
          aria-controls={`game${gameId}Details`}
          className={styles.header}
          onClick={toggleDescription}
        >
          {name}
        </h3>
      </div>
      <AnimateHeight
        id={`game${gameId}Details`}
        duration={200}
        height={descriptionExpanded ? 'auto' : 0}
      >
        <p className={styles.description}>
          {description || DEFAULT_DESCRIPTION}
        </p>
      </AnimateHeight>
    </div>
  )
}

export default GameLineItem
