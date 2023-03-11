import { PageProvider } from '../../contexts/pageContext'
import GameCreateForm from './gameCreateForm'

export default { title: 'GameCreateForm' }

export const Default = () => (
  <PageProvider>
    <GameCreateForm />
  </PageProvider>
)

export const Disabled = () => (
  <PageProvider>
    <GameCreateForm disabled />
  </PageProvider>
)
