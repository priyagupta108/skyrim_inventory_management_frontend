import { describe, test, expect } from 'vitest'
import { BASE_APP_URI, renderAuthenticated } from '../../support/testUtils'
import paths from '../../routing/paths'
import DashboardHeader from './dashboardHeader'

describe('<DashboardHeader />', () => {
  test('Dashboard header contains a link to the main dashboard', () => {
    const wrapper = renderAuthenticated(<DashboardHeader />)
    expect(wrapper).toBeTruthy()

    const a = wrapper.container.querySelector('a')
    expect(a?.href).toBe(`${BASE_APP_URI}${paths.dashboard.main}`)
  })

  test('Dashboard header contains user profile information', () => {
    const wrapper = renderAuthenticated(<DashboardHeader />)

    expect(wrapper.getByText('Edna St. Vincent Millay')).toBeTruthy()
    expect(wrapper.getByText('edna@gmail.com')).toBeTruthy()
  })

  test('matches snapshot', () => {
    const wrapper = renderAuthenticated(<DashboardHeader />)
    expect(wrapper).toMatchSnapshot()
  })
})
