import { useEffect, CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { type RelativePath } from '../../types/navigation'
import { YELLOW, PINK, BLUE, GREEN, AQUA } from '../../utils/colorSchemes'
import { useGoogleLogin } from '../../hooks/contexts'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import NavigationMosaic from '../../components/navigationMosaic/navigationMosaic'
import styles from './dashboardPage.module.css'
import paths from '../../routing/paths'

const PLACEHOLDER_HREF: RelativePath = '#'

const navigationCards = [
  {
    colorScheme: YELLOW,
    href: PLACEHOLDER_HREF,
    children: 'Your Games',
    key: 'games',
  },
  {
    colorScheme: PINK,
    href: PLACEHOLDER_HREF,
    children: 'Your Shopping Lists',
    key: 'shopping-lists',
  },
  {
    colorScheme: BLUE,
    href: PLACEHOLDER_HREF,
    children: 'Your Inventory',
    key: 'inventory',
  },
  {
    colorScheme: GREEN,
    href: PLACEHOLDER_HREF,
    children: 'Nav Link 4',
    key: 'nav-link-4',
  },
  {
    colorScheme: AQUA,
    href: PLACEHOLDER_HREF,
    children: 'Nav Link 5',
    key: 'nav-link-5',
  },
]

const loaderStyles: CSSProperties = {
  textAlign: 'center',
}

const DashboardPage = () => {
  const { user, authLoading, authError } = useGoogleLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (authError || (!user && !authLoading)) {
      navigate(paths.home)
    }
  }, [user, authLoading, authError])

  return (
    <DashboardLayout>
      <div className={styles.root}>
        {authLoading ? (
          <PulseLoader
            color={YELLOW.schemeColorDark}
            cssOverride={loaderStyles}
          />
        ) : (
          <NavigationMosaic cardArray={navigationCards} />
        )}
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
