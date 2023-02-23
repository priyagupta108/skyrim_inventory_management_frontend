import { type MouseEventHandler } from 'react'
import styles from './googleSignInButton.module.css'

interface GoogleSignInButtonProps {
  onClick: MouseEventHandler
}

const GoogleSignInButton = ({ onClick }: GoogleSignInButtonProps) => (
  <button className={styles.root} value='Sign in with Google' onClick={onClick}>
    <img className={styles.background} />
  </button>
)

export default GoogleSignInButton