import GameEditForm from '../gameEditForm/gameEditForm'
import Modal from './modal'

export default { title: 'Modal' }

export const Default = () => (
  <Modal hidden={false}>
    <GameEditForm gameId={4} name="My Game 1" description={null} />
  </Modal>
)
