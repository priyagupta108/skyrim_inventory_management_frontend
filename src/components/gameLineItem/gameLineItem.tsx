import { useState, type MouseEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import AnimateHeight from 'react-animate-height'
import { useGamesContext } from '../../hooks/contexts'
import styles from './gameLineItem.module.css'

const DEFAULT_DESCRIPTION = 'This game has no description.'
const DESTROY_CONFIRMATION =
  'Are you sure you want to delete this game? This cannot be undone. You will lose all data associated with the game you delete.'

interface GameLineItemProps {
  gameId: number
  name: string
  description?: string | null
}

const GameLineItem = ({ gameId, name, description }: GameLineItemProps) => {
  const { destroyGame } = useGamesContext()
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  const toggleDescription: MouseEventHandler = (e) => {
    e.preventDefault()

    setDescriptionExpanded(!descriptionExpanded)
  }

  const destroy: MouseEventHandler = (e) => {
    e.preventDefault()

    const confirm = window.confirm(DESTROY_CONFIRMATION)

    if (confirm) destroyGame(gameId)
  }

  return (
    <div className={styles.root}>
      <div className={styles.summary}>
        <button
          className={styles.icon}
          onClick={destroy}
          data-testid={`destroyGame${gameId}`}
        >
          <FontAwesomeIcon className={styles.fa} icon={faXmark} />
        </button>
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
