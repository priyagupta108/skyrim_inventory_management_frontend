import { useState, type MouseEventHandler } from 'react'
import classNames from 'classnames'
import AnimateHeight from 'react-animate-height'
import styles from './gameLineItem.module.css'

const DEFAULT_DESCRIPTION = 'This game has no description.'

interface GameLineItemProps {
  name: string
  description?: string | null
}

const GameLineItem = ({ name, description }: GameLineItemProps) => {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  const toggleDescription: MouseEventHandler = (e) => {
    setDescriptionExpanded(!descriptionExpanded)
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.header} onClick={toggleDescription}>{name}</h3>
      <AnimateHeight
        duration={200}
        height={descriptionExpanded ? 'auto' : 0}
      >
        <div className={classNames(styles.collapsible, { [styles.expanded]: descriptionExpanded })}>
          <p className={styles.description}>{description || DEFAULT_DESCRIPTION}</p>
        </div>
      </AnimateHeight>
    </div>
  )
}

export default GameLineItem