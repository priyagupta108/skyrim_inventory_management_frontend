import { BrowserRouter } from 'react-router-dom'
import DashboardPage from './dashboardPage'

export default { title: 'DashboardPage' }

export const Default = () => (
  <BrowserRouter>
    <DashboardPage />
  </BrowserRouter>
)
