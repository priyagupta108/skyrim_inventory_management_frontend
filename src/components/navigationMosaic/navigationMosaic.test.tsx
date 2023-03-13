import { describe, test, expect } from 'vitest'
import { BASE_APP_URI, renderWithRouter } from '../../support/testUtils'
import testCards from './testCards'
import NavigationMosaic from './navigationMosaic'

describe('NavigationMosaic component', () => {
  test('NavigationMosaic component functions properly', () => {
    const wrapper = renderWithRouter(<NavigationMosaic cardArray={testCards} />)
    expect(wrapper).toBeTruthy()

    expect(wrapper.getByText('Yellow Card')).toHaveProperty(
      'href',
      `${BASE_APP_URI}/yellow`
    )
    expect(wrapper.getByText('Pink Card')).toHaveProperty(
      'href',
      `${BASE_APP_URI}/pink`
    )
    expect(wrapper.getByText('Blue Card')).toHaveProperty(
      'href',
      `${BASE_APP_URI}/blue`
    )
    expect(wrapper.getByText('Green Card')).toHaveProperty(
      'href',
      `${BASE_APP_URI}/green`
    )
    expect(wrapper.getByText('Aqua Card')).toHaveProperty(
      'href',
      `${BASE_APP_URI}/aqua`
    )
  })

  test('matches snapshot', () => {
    const wrapper = renderWithRouter(<NavigationMosaic cardArray={testCards} />)
    expect(wrapper).toMatchSnapshot()
  })
})
