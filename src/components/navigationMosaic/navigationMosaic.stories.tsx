import { BrowserRouter } from 'react-router-dom'
import NavigationMosaic from './navigationMosaic'
import cards from './testCards'

export default { title: 'NavigationMosaic' }

export const Default = () => (
  <BrowserRouter>
    <NavigationMosaic cardArray={cards} />
  </BrowserRouter>
)