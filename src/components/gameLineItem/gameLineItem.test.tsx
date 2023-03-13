import { describe, test, expect, vitest, afterEach, beforeEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { deleteGameSuccess, getGamesAllSuccess } from '../../support/msw/games'
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
    beforeEach(() => {
      contextValue.destroyGame = vitest
        .fn()
        .mockImplementation((_gameId: number) => {})
    })

    test('destroys the game when the button is clicked', () => {
      const wrapper = renderAuthenticated(
        <GamesContext.Provider value={contextValue}>
          <GameLineItem
            gameId={4}
            name="De finibus bonorum et malorum"
            description="This is my game"
          />
        </GamesContext.Provider>
      )

      window.confirm = vitest.fn().mockImplementation(() => true)

      const xIcon = wrapper.getByTestId('destroyGame4')
      act(() => xIcon.click())

      expect(contextValue.destroyGame).toHaveBeenCalledWith(4)
    })

    test("doesn't destroy the game when the user cancels", () => {
      const wrapper = renderAuthenticated(
        <GamesContext.Provider value={contextValue}>
          <GameLineItem
            gameId={4}
            name="De finibus bonorum et malorum"
            description="This is my game"
          />
        </GamesContext.Provider>
      )

      window.confirm = vitest.fn().mockImplementation(() => false)

      const xIcon = wrapper.getByTestId('destroyGame4')
      act(() => xIcon.click())

      expect(contextValue.destroyGame).not.toHaveBeenCalled()
    })
  })
})
