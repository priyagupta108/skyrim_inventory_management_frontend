import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from './notFoundPage'

export default { title: 'NotFoundPage' }

export const Default = () => (
  <BrowserRouter>
    <NotFoundPage />
  </BrowserRouter>
)
