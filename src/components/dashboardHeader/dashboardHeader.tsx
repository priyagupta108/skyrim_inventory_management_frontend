import { Link } from 'react-router-dom'
import paths from '../../routing/paths'
import styles from './dashboardHeader.module.css'

const DashboardHeader = () => (
  <header className={styles.root}>
    <div className={styles.bar}>
      <span className={styles.headerContainer}>
        <h1 className={styles.header}>
          <Link className={styles.headerLinkLarge} to={paths.dashboard.main}>
            Skyrim Inventory
            <br className={styles.bp} /> Management
          </Link>
          <Link className={styles.headerLinkSmall} to={paths.dashboard.main}>
            S. I. M.
          </Link>
        </h1>
      </span>
    </div>
  </header>
)

export default DashboardHeader
