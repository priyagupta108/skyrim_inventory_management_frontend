import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FlashMessage from './flashMessage'

describe('FlashMessage', () => {
  describe('when there is a string message', () => {
    test('there is no list', () => {
      const wrapper = render(
        <FlashMessage type="info" hidden={false} message="Hello world." />
      )
      expect(wrapper).toBeTruthy()

      expect(screen.getByText('Hello world.')).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = render(
        <FlashMessage type="info" hidden={false} message="Hello world." />
      )
      expect(wrapper).toMatchSnapshot()
    })

    describe('when there is a header', () => {
      test('the header and message are displayed', () => {
        render(
          <FlashMessage
            type="info"
            hidden={false}
            header="Greetings!"
            message="Hello world."
          />
        )

        expect(screen.getByText('Greetings!')).toBeTruthy()
        expect(screen.getByText('Hello world.')).toBeTruthy()
      })

      test('matches snapshot', () => {
        const wrapper = render(
          <FlashMessage
            type="info"
            hidden={false}
            header="Greetings!"
            message="Hello world."
          />
        )
        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('when there is an array message', () => {
    const msg = [
      'You will be assimilated.',
      'Your biological and technological distinctiveness will be added to our own.',
      'Resistance is futile.',
    ]

    test('displays all messages', () => {
      const wrapper = render(
        <FlashMessage type="info" hidden={false} message={msg} />
      )
      expect(wrapper).toBeTruthy()

      expect(screen.getByText('You will be assimilated.')).toBeTruthy()
      expect(
        screen.getByText(
          'Your biological and technological distinctiveness will be added to our own.'
        )
      ).toBeTruthy()
      expect(screen.getByText('Resistance is futile.')).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = render(
        <FlashMessage type="info" hidden={false} message={msg} />
      )
      expect(wrapper).toMatchSnapshot()
    })

    describe('when there is a header', () => {
      test('displays the header text', () => {
        render(
          <FlashMessage
            type="info"
            hidden={false}
            header="We are the Borg."
            message={msg}
          />
        )

        expect(screen.getByText('We are the Borg.')).toBeTruthy()
        expect(screen.getByText('You will be assimilated.')).toBeTruthy()
        expect(
          screen.getByText(
            'Your biological and technological distinctiveness will be added to our own.'
          )
        ).toBeTruthy()
        expect(screen.getByText('Resistance is futile.')).toBeTruthy()
      })

      test('matches snapshot', () => {
        const wrapper = render(
          <FlashMessage
            type="info"
            hidden={false}
            header="We are the Borg."
            message={msg}
          />
        )
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
