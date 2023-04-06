import { describe, test, expect, vitest } from 'vitest'
import { act, fireEvent } from '@testing-library/react'
import { renderAuthenticated } from '../../support/testUtils'
import { allGames as games } from '../../support/data/games'
import { gamesContextValue } from '../../support/data/contextValues'
import { GREEN } from '../../utils/colorSchemes'
import { GamesContext } from '../../contexts/gamesContext'
import { PageProvider } from '../../contexts/pageContext'
import GameEditForm from './gameEditForm'

describe('GameEditForm', () => {
  test('displays the inputs and submit button', () => {
    const game = games[0]

    const wrapper = renderAuthenticated(
      <PageProvider>
        <GamesContext.Provider value={gamesContextValue}>
          <GameEditForm
            gameId={game.id}
            name={game.name}
            description={game.description}
            buttonColor={GREEN}
          />
        </GamesContext.Provider>
      </PageProvider>
    )

    expect(wrapper).toBeTruthy()

    expect(wrapper.getByTestId('editNameField')).toBeTruthy()
    expect(wrapper.getByTestId('editDescriptionField')).toBeTruthy()
    expect(wrapper.getByTestId('submitGameEditForm')).toBeTruthy()
  })

  test('matches snapshot', () => {
    const game = games[0]

    const wrapper = renderAuthenticated(
      <PageProvider>
        <GamesContext.Provider value={gamesContextValue}>
          <GameEditForm
            gameId={game.id}
            name={game.name}
            description={game.description}
            buttonColor={GREEN}
          />
        </GamesContext.Provider>
      </PageProvider>
    )

    expect(wrapper).toMatchSnapshot()
  })

  describe('submitting the form', () => {
    test('calls the update function', () => {
      const game = games[0]
      const contextValue = {
        ...gamesContextValue,
        updateGame: vitest.fn(),
      }

      const wrapper = renderAuthenticated(
        <PageProvider>
          <GamesContext.Provider value={contextValue}>
            <GameEditForm
              gameId={game.id}
              name={game.name}
              description={game.description}
              buttonColor={GREEN}
            />
          </GamesContext.Provider>
        </PageProvider>
      )

      const nameInput = wrapper.getByTestId('editNameField') as HTMLInputElement
      const descInput = wrapper.getByTestId(
        'editDescriptionField'
      ) as HTMLInputElement
      const button = wrapper.getByTestId(
        'submitGameEditForm'
      ) as HTMLButtonElement

      fireEvent.change(nameInput, { target: { value: 'Something new' } })
      fireEvent.change(descInput, { target: { value: 'New description' } })

      act(() => fireEvent.click(button))

      expect(contextValue.updateGame).toHaveBeenCalledWith(game.id, {
        name: 'Something new',
        description: 'New description',
      })
    })

    test('trims strings', () => {
      const game = games[0]
      const contextValue = {
        ...gamesContextValue,
        updateGame: vitest.fn(),
      }

      const wrapper = renderAuthenticated(
        <PageProvider>
          <GamesContext.Provider value={contextValue}>
            <GameEditForm
              gameId={game.id}
              name={game.name}
              description={game.description}
              buttonColor={GREEN}
            />
          </GamesContext.Provider>
        </PageProvider>
      )

      const nameInput = wrapper.getByTestId('editNameField') as HTMLInputElement
      const descInput = wrapper.getByTestId(
        'editDescriptionField'
      ) as HTMLInputElement
      const button = wrapper.getByTestId(
        'submitGameEditForm'
      ) as HTMLButtonElement

      fireEvent.change(nameInput, { target: { value: ' Something new ' } })
      fireEvent.change(descInput, {
        target: { value: '  New description    ' },
      })

      act(() => fireEvent.click(button))

      expect(contextValue.updateGame).toHaveBeenCalledWith(game.id, {
        name: 'Something new',
        description: 'New description',
      })
    })

    test("doesn't update if attributes aren't changed", () => {
      const game = games[0]
      const contextValue = {
        ...gamesContextValue,
        updateGame: vitest.fn(),
      }

      const wrapper = renderAuthenticated(
        <PageProvider>
          <GamesContext.Provider value={contextValue}>
            <GameEditForm
              gameId={game.id}
              name={game.name}
              description={game.description}
              buttonColor={GREEN}
            />
          </GamesContext.Provider>
        </PageProvider>
      )

      const button = wrapper.getByTestId(
        'submitGameEditForm'
      ) as HTMLButtonElement

      act(() => fireEvent.click(button))

      expect(contextValue.updateGame).not.toHaveBeenCalled()
    })
  })
})
