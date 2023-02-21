import { type ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { type RelativePath } from '../types/navigation'
import HomePage from '../pages/homePage/homePage'
import LoginPage from '../pages/loginPage/loginPage'
import NotFoundPage from '../pages/notFoundPage/notFoundPage'
import DashboardPage from '../pages/dashboardPage/dashboardPage'
import paths from './paths'

const siteTitle = 'Skyrim Inventory Management |'

interface BasePage {
  title: string
  description: string
  jsx: ReactElement
}

interface Page extends BasePage {
  pageId: string
  path: RelativePath
}

const notFoundPage: BasePage = {
  title: '404 Not Found',
  description: 'Page Not Found',
  jsx: <NotFoundPage />,
}

const pages: Page[] = [
  {
    pageId: 'home',
    title: `${siteTitle} Home`,
    description: 'Manage your inventory across multiple properties in Skyrim',
    jsx: <HomePage />,
    path: paths.home,
  },
  {
    pageId: 'login',
    title: `${siteTitle} Login`,
    description: 'Login to Skyrim Inventory Management',
    jsx: <LoginPage />,
    path: paths.login,
  },
  {
    pageId: 'dashboard-main',
    title: `${siteTitle} Dashboard`,
    description: 'Manage your inventory across multiple properties in Skyrim',
    jsx: <DashboardPage />,
    path: paths.dashboard.main,
  },
]

const RouteContent = ({ title, description, jsx }: BasePage) => (
  <>
    <Helmet>
      <html lang="en" />

      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {jsx}
  </>
)

const PageRoutes = () => (
  <Routes>
    <Route
      path="*"
      key="notFound"
      element={<RouteContent {...notFoundPage} />}
    />
    {pages.map(({ pageId, title, description, jsx, path }: Page) => {
      return (
        <Route
          path={path}
          key={pageId}
          element={
            <RouteContent title={title} description={description} jsx={jsx} />
          }
        />
      )
    })}
  </Routes>
)

export default PageRoutes
