import { type MouseEventHandler } from 'react'
import GoogleSignInButton from '../../components/googleSignInButton/googleSignInButton'
import paths from '../../routing/paths'
import styles from './homePage.module.css'

const HomePage = () => {
  const onClickLoginButton: MouseEventHandler = e => {
    e.preventDefault()
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.header}>Skyrim Inventory Management</h1>
        <div className={styles.login}>
          <GoogleSignInButton onClick={onClickLoginButton} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
