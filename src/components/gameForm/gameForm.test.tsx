import { describe, test, expect, vitest } from 'vitest'
import { act, fireEvent } from '@testing-library/react'
import { renderAuthenticated } from '../../support/testUtils'
import { allGames as games } from '../../support/data/games'
import { gamesContextValue } from '../../support/data/contextValues'
import { GREEN } from '../../utils/colorSchemes'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import GameForm from './gameForm'

describe('GameForm', () => {
  test('displays the inputs and submit button', () => {
    const wrapper = renderAuthenticated(
      <PageProvider>
        <GamesContext.Provider value={gamesContextValue}>
          <GameForm buttonColor={GREEN} />
        </GamesContext.Provider>
      </PageProvider>
    )

    expect(wrapper.getByLabelText('Name')).toBeTruthy()
    expect(wrapper.getByLabelText('Description')).toBeTruthy()
    expect(wrapper.getByTestId('gameFormSubmit')).toBeTruthy()
  })

  test('uses the default values if given')

  test('matches snapshot')

  describe('submitting the form', () => {
    test('calls the submit function with the given attributes')

    test('trims strings')
  })
})
