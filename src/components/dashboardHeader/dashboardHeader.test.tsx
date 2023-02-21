import { describe, test, expect } from 'vitest'
import { renderWithRouter } from '../../setupTests'
import paths from '../../routing/paths'
import DashboardHeader from './dashboardHeader'

describe('<DashboardHeader />', () => {
  test('Dashboard header contains a link to the main dashboard', () => {
    const wrapper = renderWithRouter(<DashboardHeader />)
    expect(wrapper).toBeTruthy()

    const a = wrapper.container.querySelector('a')
    expect(a?.href).toBe(paths.dashboard.main)
  })

  test('matches snapshot', () => {
    const wrapper = renderWithRouter(<DashboardHeader />)
    expect(wrapper).toMatchSnapshot()
  })
})
