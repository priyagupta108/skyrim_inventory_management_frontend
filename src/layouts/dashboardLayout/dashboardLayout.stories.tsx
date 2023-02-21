import { BrowserRouter } from 'react-router-dom'
import DashboardLayout from './dashboardLayout'

export default { title: 'DashboardLayout' }

export const WithTitle = () => (
  <BrowserRouter>
    <DashboardLayout title={'Page Title'}>Hello World</DashboardLayout>
  </BrowserRouter>
)

export const WithoutTitle = () => (
  <BrowserRouter>
    <DashboardLayout>Hello World</DashboardLayout>
  </BrowserRouter>
)
