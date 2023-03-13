import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import {
  waitFor,
  act,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { setupServer } from 'msw/node'
import { renderAuthenticated, renderAuthLoading } from '../../support/testUtils'
import {
  postGamesSuccess,
  postGamesUnprocessable,
  postGamesServerError,
  getGamesEmptySuccess,
  getGamesAllSuccess,
  getGamesServerError,
  deleteGameSuccess,
  deleteGameNotFound,
  deleteGameServerError,
} from '../../support/msw/games'
import { allGames } from '../../support/data/games'
import { PageProvider } from '../../contexts/pageContext'
import {
  GamesContext,
  GamesContextType,
  GamesProvider,
} from '../../contexts/gamesContext'
import GamesPage from './gamesPage'

describe('<GamesPage />', () => {
  afterEach(() => {
    cleanup()
  })

  describe('viewing games', () => {
    describe('when loading', () => {
      test('displays the loader', () => {
        const wrapper = renderAuthLoading(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )
        expect(wrapper).toBeTruthy()

        expect(wrapper.getByTestId('pulseLoader')).toBeTruthy()
      })

      test('matches snapshot', () => {
        const wrapper = renderAuthLoading(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when there are no games', () => {
      const mockServer = setupServer(getGamesEmptySuccess)

      beforeAll(() => {
        mockServer.listen()
      })

      afterEach(() => mockServer.resetHandlers())

      afterAll(() => {
        mockServer.close()
      })

      test('games page displays a message that there are no games', async () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )
        expect(wrapper).toBeTruthy()

        await waitFor(() => {
          expect(wrapper.getByText('Create Game...')).toBeTruthy()
          expect(wrapper.getByTestId('gameCreateFormForm')).toBeTruthy()
        })
      })

      test('matches snapshot', () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when there are multiple games', () => {
      const mockServer = setupServer(getGamesAllSuccess)

      beforeAll(() => mockServer.listen())
      afterEach(() => mockServer.resetHandlers())
      afterAll(() => mockServer.close())

      // Descriptions should be hidden by default but Vitest has no way of knowing
      // that, as noted in the test file for the GameLineItem component.
      test('displays the title and description of each game', async () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        await waitFor(() => {
          expect(wrapper.getByText('My Game 1')).toBeTruthy()
          expect(
            wrapper.getByText('This is a game with a description')
          ).toBeTruthy()

          expect(wrapper.getByText('My Game 2')).toBeTruthy()
          expect(
            wrapper.getByText('This game has no description.')
          ).toBeTruthy()

          expect(
            wrapper.getByText(
              'Game with a really really really really really long name'
            )
          ).toBeTruthy()
          expect(
            wrapper.getByText(
              /Cum audissem Antiochum, Brute, ut solebam, cum M\. Pisone/
            )
          ).toBeTruthy()

          expect(wrapper.queryByTestId('pulseLoader')).toBeFalsy()
          expect(wrapper.queryByText('You have no games.')).toBeFalsy()
        })
      })

      test('matches snapshot', () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )
        expect(wrapper).toMatchSnapshot()
      })
    })

    describe('when the server returns an error', () => {
      const mockServer = setupServer(getGamesServerError)

      beforeAll(() => {
        mockServer.listen()
      })

      afterEach(() => mockServer.resetHandlers())

      afterAll(() => mockServer.close())

      test('displays error content', async () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        await waitFor(() => {
          expect(
            wrapper.getByText(
              "Oops! Something unexpected went wrong. We're sorry! Please try again later."
            )
          ).toBeTruthy()
        })
      })

      test("doesn't break the dashboard", () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        expect(wrapper.getByText('Your Games')).toBeTruthy()
      })

      test('matches snapshot', () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('destroying a game', () => {
    describe('when the user confirms deletion', () => {
      const mockServer = setupServer(getGamesAllSuccess, deleteGameSuccess)

      beforeAll(() => {
        mockServer.listen()
      })

      afterEach(() => mockServer.resetHandlers())

      afterAll(() => mockServer.close())

      test('destroys the game and removes it from the DOM', async () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        window.confirm = vitest.fn().mockImplementation(() => true)

        const game51 = await wrapper.findByText('My Game 2')
        const deleteButton = await wrapper.findByTestId('destroyGame51')

        act(() => deleteButton.click())

        await waitForElementToBeRemoved(game51)
        const flash = await wrapper.findByText(/game has been deleted/)

        expect(wrapper.queryByText('My Game 2')).toBeFalsy()
        expect(flash).toBeTruthy()
      })
    })

    describe('when the back end returns a 404 error', () => {
      const mockServer = setupServer(getGamesAllSuccess, deleteGameNotFound)

      beforeAll(() => mockServer.listen())

      afterEach(() => mockServer.resetHandlers())

      afterAll(() => mockServer.close())

      test('leaves the game in the DOM and displays error message', async () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        window.confirm = vitest.fn().mockImplementation(() => true)

        const deleteButton = await wrapper.findByTestId('destroyGame51')

        act(() => deleteButton.click())

        await waitFor(() => {
          expect(wrapper.getByText('My Game 2')).toBeTruthy()
          expect(
            wrapper.getByText(
              "Oops! We couldn't find the game you're looking for. Please refresh and try again."
            )
          ).toBeTruthy()
        })
      })
    })

    describe('when the back end returns a 500 error', () => {
      const mockServer = setupServer(getGamesAllSuccess, deleteGameServerError)

      beforeAll(() => mockServer.listen())

      afterEach(() => mockServer.resetHandlers())

      afterAll(() => mockServer.close())

      test('leaves the game in the DOM and displays error message', async () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        window.confirm = vitest.fn().mockImplementation(() => true)

        const deleteButton = await wrapper.findByTestId('destroyGame51')

        act(() => deleteButton.click())

        await waitFor(() => {
          expect(wrapper.getByText('My Game 2')).toBeTruthy()
          expect(
            wrapper.getByText(
              "Oops! Something unexpected went wrong. We're sorry! Please try again later."
            )
          ).toBeTruthy()
        })
      })
    })

    describe('when the user cancels deletion', () => {
      test("doesn't destroy the game", () => {
        const contextValue = {
          games: allGames,
          gamesLoadingState: 'DONE',
          createGame: () => {},
          destroyGame: vitest.fn().mockImplementation((_gameId: number) => {}),
        } as GamesContextType

        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesContext.Provider value={contextValue}>
              <GamesPage />
            </GamesContext.Provider>
          </PageProvider>
        )

        window.confirm = vitest.fn().mockImplementation(() => false)

        const button = wrapper.getByTestId('destroyGame51')

        act(() => button.click())

        expect(contextValue.destroyGame).not.toHaveBeenCalled()
        expect(wrapper.getByText('My Game 2')).toBeTruthy()
      })
    })
  })

  describe('creating a game', () => {
    describe('when successful', () => {
      const mockServer = setupServer(getGamesAllSuccess, postGamesSuccess)

      beforeAll(() => mockServer.listen())
      afterEach(() => mockServer.resetHandlers())
      afterAll(() => mockServer.close())

      test('adds the game to the list', async () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        await waitFor(() => {
          expect(wrapper.getByText('My Game 1')).toBeTruthy()
        })

        const button = (await wrapper.findByTestId(
          'createGameSubmit'
        )) as HTMLButtonElement

        act(() => button.click())

        await waitFor(() => {
          // There should be a success message
          expect(
            wrapper.getByText('Success! Your game has been created.')
          ).toBeTruthy()

          // The new game should be present in the DOM
          expect(wrapper.getByText('My Game 3')).toBeTruthy()
          expect(
            wrapper.getByText('This description is just for illustration.')
          ).toBeTruthy()

          // All the other games should still be there too
          expect(wrapper.getByText('My Game 1')).toBeTruthy()
          expect(wrapper.getByText('My Game 2')).toBeTruthy()
          expect(
            wrapper.getByText(
              'Game with a really really really really really long name'
            )
          ).toBeTruthy()
        })
      })
    })

    describe('when the server returns an Unprocessable Entity response')

    describe('when the server returns a 500 error response')
  })
})
