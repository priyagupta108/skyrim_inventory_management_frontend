import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../setupTests'
import DashboardPage from './dashboardPage'

describe('<DashboardPage />', () => {
  test('DashboardPage displays the header', () => {
    const wrapper = renderWithRouter(<DashboardPage />)
    expect(wrapper).toBeTruthy()

    const h1 = wrapper.container.querySelector('h1')
    // This is because 'Skyrim Inventory 'Management' and 'S. I. M.' are
    // both in the DOM but visible at different viewport sizes. Since
    // vitest and testing-library don't give us the ability to set a viewport
    // size for tests, both will show up here.
    expect(h1?.textContent).toBe('Skyrim Inventory ManagementS. I. M.')
  })

  test('DashboardPage displays the navigation mosaic', () => {
    renderWithRouter(<DashboardPage />)

    expect(screen.getByText('Your Games')).toBeTruthy()
    expect(screen.getByText('Your Shopping Lists')).toBeTruthy()
    expect(screen.getByText('Your Inventory')).toBeTruthy()
    expect(screen.getByText('Nav Link 4')).toBeTruthy()
    expect(screen.getByText('Nav Link 5')).toBeTruthy()
  })
})