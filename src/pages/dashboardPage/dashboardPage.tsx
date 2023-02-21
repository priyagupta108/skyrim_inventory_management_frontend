import { type RelativePath } from '../../types/navigation'
import { YELLOW, PINK, BLUE, GREEN, AQUA } from '../../utils/colorSchemes'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import NavigationMosaic from '../../components/navigationMosaic/navigationMosaic'
import styles from './dashboardPage.module.css'

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

const DashboardPage = () => (
  <DashboardLayout>
    <div className={styles.root}>
      <NavigationMosaic cardArray={navigationCards} />
    </div>
  </DashboardLayout>
)

export default DashboardPage
