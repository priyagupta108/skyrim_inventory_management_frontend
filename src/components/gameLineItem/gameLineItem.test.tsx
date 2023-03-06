import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import GameLineItem from './gameLineItem'

// This component can't really be tested because Vitest fucking sucks.
// It won't get the style off the element, even if the style is computed
// with JavaScript, and because react-animate-height uses a CSS-based
// approach rather than adding and removing an element, there's just no
// way to test whether the user can see the description or not.
describe('GameLineItem', () => {
  test('matches snapshot', () => {
    const wrapper = render(<GameLineItem name='De finibus bonorum et malorum' description='This is my game' />)
    expect(wrapper).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })
})