import { describe, test, expect, vitest, afterEach, beforeEach } from 'vitest'
import { screen, render, act } from '@testing-library/react'
import {
  GamesContext,
  type GamesContextType,
} from '../../contexts/gamesContext'
import GameLineItem from './gameLineItem'
import { renderAuthenticated } from '../../support/testUtils'

const contextValue: GamesContextType = {
  games: [
    {
      id: 4,
      user_id: 42,
      name: 'De finibus bonorum et malorum',
      description: 'This is my game',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
  gamesLoadingState: 'DONE',
  createGame: () => {},
  destroyGame: () => {},
}

// This component can't really be tested because Vitest fucking sucks.
// It won't get the style off the element, even if the style is computed
// with JavaScript, and because react-animate-height uses a CSS-based
// approach rather than adding and removing an element, there's just no
// way to test whether the user can see the description or not.
describe('GameLineItem', () => {
  test('matches snapshot', () => {
    const wrapper = render(
      <GamesContext.Provider value={contextValue}>
        <GameLineItem
          gameId={4}
          name="De finibus bonorum et malorum"
          description="This is my game"
        />
      </GamesContext.Provider>
    )
    expect(wrapper).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  describe('destroying the game', () => {
    const ogWindowConfirm = window.confirm

    beforeEach(() => {
      contextValue.destroyGame = vitest
        .fn()
        .mockImplementation((_gameId: number) => {})
      fetch.mockResponseOnce(JSON.stringify(contextValue.games), {
        status: 200,
      })
      fetch.mockResponseOnce(null, { status: 204 })
    })

    afterEach(() => {
      fetch.resetMocks()
      window.confirm = ogWindowConfirm
    })

    test('destroys the game when the button is clicked', () => {
      window.confirm = vitest.fn().mockImplementation(() => true)

      const wrapper = renderAuthenticated(
        <GamesContext.Provider value={contextValue}>
          <GameLineItem
            gameId={4}
            name="De finibus bonorum et malorum"
            description="This is my game"
          />
        </GamesContext.Provider>
      )

      const xIcon = wrapper.getByTestId('destroyGame4')
      act(() => xIcon.click())

      // TODO
      // expect(contextValue.destroyGame).toHaveBeenCalledWith(4)
    })

    test("doesn't destroy the game when the user cancels", () => {
      window.confirm = vitest.fn().mockImplementation(() => false)

      const wrapper = renderAuthenticated(
        <GamesContext.Provider value={contextValue}>
          <GameLineItem
            gameId={4}
            name="De finibus bonorum et malorum"
            description="This is my game"
          />
        </GamesContext.Provider>
      )

      const xIcon = wrapper.getByTestId('destroyGame4')
      act(() => xIcon.click())

      expect(contextValue.destroyGame).not.toHaveBeenCalled()
    })
  })
})
