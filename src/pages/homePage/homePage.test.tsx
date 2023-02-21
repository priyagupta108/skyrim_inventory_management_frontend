import { describe, test, expect } from 'vitest'
import { renderWithRouter } from '../../setupTests'
import paths from '../../routing/paths'
import HomePage from './homePage'

describe('<HomePage />', () => {
  test('HomePage displays properly', () => {
    const wrapper = renderWithRouter(<HomePage />)
    expect(wrapper).toBeTruthy()

    const h1 = wrapper.container.querySelector('h1')
    expect(h1?.textContent).toBe('Skyrim Inventory Management')

    const a = wrapper.container.querySelector('a')
    expect(a?.textContent).toBe('Sign in with Google')
    expect(a?.href).toBe(paths.login)
  })
})
