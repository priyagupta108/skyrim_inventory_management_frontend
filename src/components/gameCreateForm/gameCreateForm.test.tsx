import { describe, test, expect, vitest } from 'vitest'
import { act, fireEvent } from '@testing-library/react'
import { RequestGame } from '../../types/apiData'
import { renderAuthenticated } from '../../support/testUtils'
import { gamesContextValue } from '../../support/data/contextValues'
import { PageProvider } from '../../contexts/pageContext'
import { GamesContext } from '../../contexts/gamesContext'
import GameCreateForm from './gameCreateForm'

describe('<GameCreateForm />', () => {
  describe('when enabled', () => {
    test('displays the correct fields', () => {
      const wrapper = renderAuthenticated(
        <PageProvider>
          <GamesContext.Provider value={gamesContextValue}>
            <GameCreateForm />
          </GamesContext.Provider>
        </PageProvider>
      )

      expect(wrapper).toBeTruthy()

      expect(wrapper.getByText('Create Game...')).toBeTruthy()
      expect(wrapper.getByTestId('gameCreateFormForm')).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = renderAuthenticated(
        <PageProvider>
          <GamesContext.Provider value={gamesContextValue}>
            <GameCreateForm />
          </GamesContext.Provider>
        </PageProvider>
      )

      expect(wrapper).toMatchSnapshot()
    })

    describe('creating a game', () => {
      describe('when the form has no values', () => {
        test('calls the createGame function on the Games provider', () => {
          const createGame = vitest
            .fn()
            .mockImplementation((_game: RequestGame) => {})

          const wrapper = renderAuthenticated(
            <PageProvider>
              <GamesContext.Provider
                value={{ ...gamesContextValue, createGame }}
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

      describe('when the form has been filled out', () => {
        test('calls the createGame function on the Games provider', () => {
          const createGame = vitest
            .fn()
            .mockImplementation((_game: RequestGame) => {})
          const destroyGame = () => {}
          const updateGame = () => {}

          const wrapper = renderAuthenticated(
            <PageProvider>
              <GamesContext.Provider
                value={{ ...gamesContextValue, createGame }}
              >
                <GameCreateForm />
              </GamesContext.Provider>
            </PageProvider>
          )

          const nameInput = wrapper.getByTestId('createNameField')
          const descInput = wrapper.getByTestId('createDescriptionField')
          const form = wrapper.getByTestId('gameCreateFormForm')

          act(() => {
            fireEvent.change(nameInput, { target: { value: 'Skyrim' } })
            fireEvent.change(descInput, {
              target: { value: 'Custom description' },
            })
            fireEvent.submit(form)
          })

          expect(createGame).toHaveBeenCalledWith(
            { name: 'Skyrim', description: 'Custom description' },
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
          <GamesContext.Provider value={gamesContextValue}>
            <GameCreateForm disabled />
          </GamesContext.Provider>
        </PageProvider>
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
