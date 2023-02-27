import { type MouseEventHandler } from 'react'
import styles from './googleSignInButton.module.css'

interface GoogleSignInButtonProps {
  onClick: MouseEventHandler
  loading?: boolean
}

const GoogleSignInButton = ({ onClick, loading }: GoogleSignInButtonProps) => (
  <button
  className={styles.root}
  value='Sign in with Google'
  onClick={loading ? (e) => e.preventDefault() : onClick}
  disabled={loading}
>
    <div className={styles.background}></div>
  </button>
)

export default GoogleSignInButton