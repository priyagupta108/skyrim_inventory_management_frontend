import { BrowserRouter } from 'react-router-dom'
import DashboardHeader from './dashboardHeader'

export default { title: 'DashboardHeader' }

export const Default = () => (
  <BrowserRouter>
    <DashboardHeader />
  </BrowserRouter>
)
