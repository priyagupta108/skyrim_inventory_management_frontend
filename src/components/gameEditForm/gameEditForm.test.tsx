import { describe, test, expect, vitest } from 'vitest'
import { act, fireEvent } from '@testing-library/react'
import { renderAuthenticated } from '../../support/testUtils'
import { allGames as games } from '../../support/data/games'
import { DONE } from '../../utils/loadingStates'
import { GREEN } from '../../utils/colorSchemes'
import { GamesContext } from '../../contexts/gamesContext'
import { PageProvider } from '../../contexts/pageContext'
import GameEditForm from './gameEditForm'

const contextValue = {
  games,
  gamesLoadingState: DONE,
  createGame: () => {},
  destroyGame: () => {},
}

describe('GameEditForm', () => {
  test('displays the inputs and submit button', () => {
    const game = games[0]

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

    expect(wrapper).toBeTruthy()

    expect(wrapper.getByTestId('nameField')).toBeTruthy()
    expect(wrapper.getByTestId('descriptionField')).toBeTruthy()
    expect(wrapper.getByTestId('submitGameEditForm')).toBeTruthy()
  })

  test('matches snapshot', () => {
    const game = games[0]

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

    expect(wrapper).toMatchSnapshot()
  })

  describe('submitting the form', () => {
    test('calls the update function', () => {
      const game = games[0]

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
    })
  })
})
