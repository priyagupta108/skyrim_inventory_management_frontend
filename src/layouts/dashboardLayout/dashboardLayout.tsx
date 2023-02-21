import { type ReactElement } from 'react'
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader'
import styles from './dashboardLayout.module.css'

interface DashboardLayoutProps {
  title?: string
  children: ReactElement | ReactElement[] | string
}

const DashboardLayout = ({ title, children }: DashboardLayoutProps) => (
  <main className={styles.root}>
    <section className={styles.container}>
      {title ? (
        <>
          <h2 className={styles.title}>{title}</h2>
          <hr className={styles.hr} />
        </>
      ) : null}
      {children}
    </section>
    <DashboardHeader />
  </main>
)

export default DashboardLayout
