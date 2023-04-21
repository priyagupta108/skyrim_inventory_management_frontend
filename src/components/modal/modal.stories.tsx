import { type Meta, type StoryObj } from '@storybook/react'
import GameEditForm from '../gameEditForm/gameEditForm'
import Modal from './modal'

type Story = StoryObj<typeof Modal>

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
}

export default meta

export const Default: Story = {
  render: () => (
    <Modal hidden={false}>
      <GameEditForm gameId={4} name="My Game 1" description={null} />
    </Modal>
  ),
}
