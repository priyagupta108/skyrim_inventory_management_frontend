import { Link } from 'react-router-dom'
import styles from './loginPage.module.css'

const LoginPage = () => (
  <div className={styles.root}>
    <div className={styles.container}>
      <Link className={styles.link} to='/'>Sign in with Google</Link>
    </div>
  </div>
)

export default LoginPage