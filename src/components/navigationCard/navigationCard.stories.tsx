import { BrowserRouter } from 'react-router-dom'
import { GREEN } from '../../utils/colorSchemes'
import { ColorProvider } from '../../contexts/colorContext'
import NavigationCard from './navigationCard'

export default { title: 'Navigation Card' }

export const Default = () => (
  <BrowserRouter>
    <ColorProvider colorScheme={GREEN}>
      <NavigationCard href='/'>
        Your Shopping Lists
      </NavigationCard>
    </ColorProvider>
  </BrowserRouter>
)