import { Link } from 'react-router-dom'
import paths from '../../routing/paths'
import styles from './homePage.module.css'

const HomePage = () => (
  <div className={styles.root}>
    <div className={styles.container}>
      <h1 className={styles.header}>Skyrim Inventory Management</h1>
      <Link className={styles.login} to={paths.login}>Sign in with Google</Link>
    </div>
  </div>
)

export default HomePage
