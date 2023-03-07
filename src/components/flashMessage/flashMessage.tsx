import { CSSProperties } from 'react'
import classNames from 'classnames'
import { type FlashColors, type FlashProps } from '../../types/flashMessages'
import styles from './flashMessage.module.css'

const colors: FlashColors = {
  success: '#329932',
  info: '#4e6d83',
  error: '#cc0000',
  warning: '#b0a723',
}

const FlashMessage = ({ type, header, message, hidden }: FlashProps) => {
  const colorVars = { '--text-color': colors[type] } as CSSProperties

  return (
    <div
      className={classNames(styles.root, { [styles.hidden]: hidden })}
      style={colorVars}
    >
      {header && <p className={styles.header}>{header}</p>}
      {typeof message === 'string' ? (
        message
      ) : (
        <ul className={styles.list}>
          {message.map((msg, index) => (
            <li key={`message-${index}`} className={styles.msg}>
              {msg}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FlashMessage
