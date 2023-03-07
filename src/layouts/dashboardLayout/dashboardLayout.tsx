import { type ReactElement } from 'react'
import { usePageContext } from '../../hooks/contexts'
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader'
import FlashMessage from '../../components/flashMessage/flashMessage'
import styles from './dashboardLayout.module.css'

interface DashboardLayoutProps {
  title?: string
  children: ReactElement | string
}

const DashboardLayout = ({ title, children }: DashboardLayoutProps) => {
  const { flashProps } = usePageContext()

  return (
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
      <FlashMessage {...flashProps} />
    </main>
  )
}

export default DashboardLayout
