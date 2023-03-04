import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderAuthenticated } from '../../support/setupTests'
import paths from '../../routing/paths'
import DashboardHeader from './dashboardHeader'

describe('<DashboardHeader />', () => {
  test('Dashboard header contains a link to the main dashboard', () => {
    const wrapper = renderAuthenticated(<DashboardHeader />)
    expect(wrapper).toBeTruthy()

    const a = wrapper.container.querySelector('a')
    expect(a?.href).toBe(paths.dashboard.main)
  })

  test('Dashboard header contains user profile information', () => {
    renderAuthenticated(<DashboardHeader />)

    expect(screen.getByText('Edna St. Vincent Millay')).toBeTruthy()
    expect(screen.getByText('edna@gmail.com')).toBeTruthy()
  })

  test('matches snapshot', () => {
    const wrapper = renderAuthenticated(<DashboardHeader />)
    expect(wrapper).toMatchSnapshot()
  })
})
