import { describe, test, expect } from 'vitest'
import { renderUnauthenticated } from '../../support/testUtils'
import HomePage from './homePage'

describe('<HomePage />', () => {
  // When authenticated, the homepage should redirect to the
  // dashboard. Unfortunately, testing this key functionality
  // with Vitest and Testing Library proved extremely impractical
  // in light of TypeScript's constraints on the `history` prop
  // that can be passed to a `Router` component.
  describe('when unauthenticated', () => {
    test('HomePage displays properly', () => {
      const wrapper = renderUnauthenticated(<HomePage />)
      expect(wrapper).toBeTruthy()

      const h1 = wrapper.container.querySelector('h1')
      expect(h1?.textContent).toBe('Skyrim Inventory Management')

      const btn = wrapper.container.querySelector('button')
      expect(btn?.value).toBe('Sign in with Google')
    })

    test('matches snapshot', () => {
      const wrapper = renderUnauthenticated(<HomePage />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
