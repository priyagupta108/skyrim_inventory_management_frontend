import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../support/setupTests'
import testCards from './testCards'
import NavigationMosaic from './navigationMosaic'

describe('NavigationMosaic component', () => {
  test('NavigationMosaic component functions properly', () => {
    const wrapper = renderWithRouter(<NavigationMosaic cardArray={testCards} />)
    expect(wrapper).toBeTruthy()

    expect(screen.getByText('Yellow Card')).toHaveProperty('href', '/yellow')
    expect(screen.getByText('Pink Card')).toHaveProperty('href', '/pink')
    expect(screen.getByText('Blue Card')).toHaveProperty('href', '/blue')
    expect(screen.getByText('Green Card')).toHaveProperty('href', '/green')
    expect(screen.getByText('Aqua Card')).toHaveProperty('href', '/aqua')
  })

  test('matches snapshot', () => {
    const wrapper = renderWithRouter(<NavigationMosaic cardArray={testCards} />)
    expect(wrapper).toMatchSnapshot()
  })
})
