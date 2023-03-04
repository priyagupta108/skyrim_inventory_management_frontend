import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderAuthenticated } from '../../support/setupTests'
import DashboardPage from './dashboardPage'

describe('<DashboardPage />', () => {
  test('DashboardPage displays the header', () => {
    const wrapper = renderAuthenticated(<DashboardPage />)
    expect(wrapper).toBeTruthy()

    const h1 = wrapper.container.querySelector('h1')
    // This is because 'Skyrim Inventory 'Management' and 'S. I. M.' are
    // both in the DOM but visible at different viewport sizes. Since
    // vitest and testing-library don't give us the ability to set a viewport
    // size for tests, both will show up here.
    expect(h1?.textContent).toBe('Skyrim Inventory ManagementS. I. M.')
  })

  test('DashboardPage displays user info', () => {
    const wrapper = renderAuthenticated(<DashboardPage />)

    expect(screen.getByText('Edna St. Vincent Millay')).toBeTruthy()
    expect(screen.getByText('edna@gmail.com')).toBeTruthy()

    const img = wrapper.container.querySelector('img')
    expect(img).toBeTruthy()
    expect(img?.src).toEqual('/src/testProfileImg.png')
  })

  test('DashboardPage displays the navigation mosaic', () => {
    renderAuthenticated(<DashboardPage />)

    expect(screen.getByText('Your Games')).toBeTruthy()
    expect(screen.getByText('Your Shopping Lists')).toBeTruthy()
    expect(screen.getByText('Your Inventory')).toBeTruthy()
    expect(screen.getByText('Nav Link 4')).toBeTruthy()
    expect(screen.getByText('Nav Link 5')).toBeTruthy()
  })

  test('matches snapshot', () => {
    const wrapper = renderAuthenticated(<DashboardPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
