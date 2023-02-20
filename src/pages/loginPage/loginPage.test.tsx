import { describe, test, expect } from 'vitest'
import { renderWithRouter } from '../../setupTests'
import LoginPage from './loginPage'

describe('<LoginPage />', () => {
  test('LoginPage displays properly', () => {
    const wrapper = renderWithRouter(<LoginPage />)
    expect(wrapper).toBeTruthy()

    const a = wrapper.container.querySelector('a')
    expect(a?.textContent).toBe('Sign in with Google')
  })
})
