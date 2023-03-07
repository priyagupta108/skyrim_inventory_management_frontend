import { describe, test, expect, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderAuthenticated, renderAuthLoading } from '../../support/testUtils'
import { GamesProvider } from '../../contexts/gamesContext'
import GamesPage from './gamesPage'
import { emptyGames, allGames } from '../../support/data/games'

describe('<GamesPage />', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('when loading', () => {
    test('displays the loader', () => {
      const wrapper = renderAuthLoading(
        <GamesProvider>
          <GamesPage />
        </GamesProvider>
      )
      expect(wrapper).toBeTruthy()

      expect(screen.getByTestId('pulseLoader')).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = renderAuthLoading(
        <GamesProvider>
          <GamesPage />
        </GamesProvider>
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
        <GamesProvider>
          <GamesPage />
        </GamesProvider>
      )
      expect(wrapper).toBeTruthy()

      await waitFor(() => {
        expect(screen.findByText('You have no games.')).toBeTruthy()
        expect(screen.queryByTestId('pulseLoader')).toBeFalsy()
      })
    })

    test('matches snapshot', () => {
      const wrapper = renderAuthenticated(
        <GamesProvider>
          <GamesPage />
        </GamesProvider>
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
      renderAuthenticated(
        <GamesProvider>
          <GamesPage />
        </GamesProvider>
      )

      const firstTitle = await screen.findByText('My Game 1')
      expect(firstTitle).toBeTruthy()
      expect(screen.getByText('This is a game with a description')).toBeTruthy()

      expect(screen.getByText('My Game 2')).toBeTruthy()
      expect(screen.getByText('This game has no description.')).toBeTruthy()

      expect(
        screen.getByText(
          'Game with a really really really really really long name'
        )
      ).toBeTruthy()
      expect(
        screen.getByText(
          /Cum audissem Antiochum, Brute, ut solebam, cum M\. Pisone/
        )
      ).toBeTruthy()

      expect(screen.queryByTestId('pulseLoader')).toBeFalsy()
      expect(screen.queryByText('You have no games.')).toBeFalsy()
    })

    test('matches snapshot', () => {
      const wrapper = renderAuthenticated(
        <GamesProvider>
          <GamesPage />
        </GamesProvider>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
