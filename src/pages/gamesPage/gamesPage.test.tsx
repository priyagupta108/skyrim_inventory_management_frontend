import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { waitFor, act, cleanup, waitForElementToBeRemoved } from '@testing-library/react'
import { renderAuthenticated, renderAuthLoading } from '../../support/testUtils'
import { emptyGames, allGames } from '../../support/data/games'
import { internalServerErrorResponse } from '../../support/data/errors'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext, GamesContextType, GamesProvider } from '../../contexts/gamesContext'
import GamesPage from './gamesPage'

describe('<GamesPage />', () => {
  afterEach(() => {
    fetch.resetMocks()
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
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(emptyGames), { status: 200 })
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
          expect(wrapper.findByText('Create Game...')).toBeTruthy()
          expect(wrapper.findByTestId('gameCreateFormForm')).toBeTruthy()
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
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(allGames), { status: 200 })
      })

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
          expect(wrapper.findByText('My Game 1')).toBeTruthy()
          expect(
            wrapper.findByText('This is a game with a description')
          ).toBeTruthy()

          expect(wrapper.findByText('My Game 2')).toBeTruthy()
          expect(
            wrapper.findByText('This game has no description.')
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
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(internalServerErrorResponse), {
          status: 500,
        })
      })

      test('displays error content', async () => {
        const wrapper = renderAuthenticated(
          <PageProvider>
            <GamesProvider>
              <GamesPage />
            </GamesProvider>
          </PageProvider>
        )

        await waitFor(() => {
          expect(wrapper.findByText('500 Internal Server Error')).toBeTruthy()
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
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(allGames), { status: 200 })
        fetch.mockResponseOnce(null, { status: 204 })
      })

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

    describe('when the back end returns an error', () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify(allGames), { status: 200 })
        fetch.mockResponseOnce(null, { status: 404 })
      })

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
          expect(wrapper.getByText("Oops! We couldn't find the game you're looking for. Please refresh and try again.")).toBeTruthy()
        })
      })
    })

    describe('when the user cancels deletion', () => {
      test("doesn't destroy the game", () => {
        const contextValue = {
          games: allGames,
          gamesLoadingState: 'DONE',
          createGame: () => {},
          destroyGame: vitest.fn().mockImplementation((_gameId: number) => {})
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
})
