import { type ReactElement } from 'react'
import { usePageContext } from '../../hooks/contexts'
import DashboardHeader from '../../components/dashboardHeader/dashboardHeader'
import FlashMessage from '../../components/flashMessage/flashMessage'
import Modal from '../../components/modal/modal'
import styles from './dashboardLayout.module.css'

interface DashboardLayoutProps {
  title?: string
  children: ReactElement | string
}

const DashboardLayout = ({ title, children }: DashboardLayoutProps) => {
  const { flashProps, modalProps } = usePageContext()

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
      <Modal {...modalProps} />
    </main>
  )
}

export default DashboardLayout
