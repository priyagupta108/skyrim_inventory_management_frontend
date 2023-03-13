import { describe, test, expect, beforeEach, afterEach, vitest } from 'vitest'
import { cleanup, act, fireEvent } from '@testing-library/react'
import { RequestGame } from '../../types/apiData'
import { renderAuthenticated } from '../../support/testUtils'
import { emptyGames } from '../../support/data/games'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext, GamesProvider } from '../../contexts/gamesContext'
import GameCreateForm from './gameCreateForm'

describe('<GameCreateForm />', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(JSON.stringify(emptyGames), { status: 200 })
  })

  afterEach(() => {
    fetch.resetMocks()
    cleanup()
  })

  describe('when enabled', () => {
    test('displays the correct fields', () => {
      const wrapper = renderAuthenticated(
        <PageProvider>
          <GamesProvider>
            <GameCreateForm />
          </GamesProvider>
        </PageProvider>
      )

      expect(wrapper).toBeTruthy()

      expect(wrapper.getByText('Create Game...')).toBeTruthy()
      expect(wrapper.getByTestId('gameCreateFormForm')).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = renderAuthenticated(
        <PageProvider>
          <GamesProvider>
            <GameCreateForm />
          </GamesProvider>
        </PageProvider>
      )

      expect(wrapper).toMatchSnapshot()
    })

    describe('creating a game', () => {
      // Both form values are optional so this shouldn't be an issue
      describe('when the form has no values', () => {
        test('calls the createGame function on the Games provider', () => {
          const createGame = vitest
            .fn()
            .mockImplementation((_game: RequestGame) => {})
          const destroyGame = () => {}

          const wrapper = renderAuthenticated(
            <PageProvider>
              <GamesContext.Provider
                value={{
                  createGame,
                  destroyGame,
                  games: [],
                  gamesLoadingState: 'DONE',
                }}
              >
                <GameCreateForm />
              </GamesContext.Provider>
            </PageProvider>
          )

          const form = wrapper.getByTestId('gameCreateFormForm')

          act(() => {
            fireEvent.submit(form)
          })

          expect(createGame).toHaveBeenCalledWith(
            { name: null, description: null },
            expect.any(Function)
          )
        })
      })
    })
  })

  // Again, because of limitations on DOM testing with Vitest, we are limited to
  // snapshot testing for this component state. There is a promising package,
  // https://github.com/chaance/vitest-dom, that forks testing-library/js-dom and
  // introduces its matches for Vitest. However, this package is only available on
  // version 0.0.4 and has a peer dependency for Vitest "^0.16.0", when we are
  // on 0.29.2, so it's too new a package to really rely on.
  describe('when disabled', () => {
    test('matches snapshot', () => {
      const wrapper = renderAuthenticated(
        <PageProvider>
          <GamesProvider>
            <GameCreateForm disabled />
          </GamesProvider>
        </PageProvider>
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
