import { describe, expect, test } from 'vitest'
import { renderWithRouter } from '../../support/testUtils'
import { YELLOW } from '../../utils/colorSchemes'
import GameEditForm from '../gameEditForm/gameEditForm'
import Modal from './modal'

describe('Modal', () => {
  test('displays the child', () => {
    const wrapper = renderWithRouter(
      <Modal hidden={false}>
        <GameEditForm
          gameId={4}
          name="My Game"
          description={null}
          buttonColor={YELLOW}
        />
      </Modal>
    )

    expect(wrapper).toBeTruthy()
    expect(wrapper.getByTestId('editGame4')).toBeTruthy()
  })

  test('matches snapshot', () => {
    const wrapper = renderWithRouter(
      <Modal hidden={false}>
        <GameEditForm
          gameId={4}
          name="My Game"
          description={null}
          buttonColor={YELLOW}
        />
      </Modal>
    )

    expect(wrapper).toMatchSnapshot()
  })
})
