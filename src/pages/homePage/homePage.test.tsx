import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import HomePage from './homePage'

describe('<HomePage />', () => {
  test('HomePage displays properly', () => {
    const wrapper = render(<HomePage />)
    expect(wrapper).toBeTruthy()

    const h1 = wrapper.container.querySelector('h1')
    expect(h1?.textContent).toBe('Skyrim Inventory Management')
  })
})