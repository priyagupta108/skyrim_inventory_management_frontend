import { describe, test, expect } from 'vitest'
import { BASE_APP_URI, renderAuthenticated } from '../../support/testUtils'
import DashboardLayout from './dashboardLayout'
import paths from '../../routing/paths'

describe('<DashboardLayout>', () => {
  describe('when a title is given', () => {
    test('DashboardLayout renders the title and content', () => {
      const wrapper = renderAuthenticated(
        <DashboardLayout title="Page Title">Hello World</DashboardLayout>
      )
      expect(wrapper).toBeTruthy()

      const h2 = wrapper.container.querySelector('h2')
      expect(h2?.textContent).toBe('Page Title')

      expect(wrapper.getByText('Hello World')).toBeTruthy()
    })

    test('DashboardLayout renders the DashboardHeader', () => {
      const wrapper = renderAuthenticated(
        <DashboardLayout title="Page Title">Hello World</DashboardLayout>
      )

      const a = wrapper.container.querySelector('a')
      expect(a?.textContent).toBe('Skyrim Inventory Management')
      expect(a?.href).toBe(`${BASE_APP_URI}${paths.dashboard.main}`)

      expect(wrapper.getByText('Edna St. Vincent Millay')).toBeTruthy()
      expect(wrapper.getByText('edna@gmail.com')).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = renderAuthenticated(
        <DashboardLayout title="Page Title">Hello World</DashboardLayout>
      )

      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('when no title is given', () => {
    test('DashboardLayout displays content but not an h2 or hr', () => {
      const wrapper = renderAuthenticated(
        <DashboardLayout>Hello World</DashboardLayout>
      )
      expect(wrapper).toBeTruthy()

      const h2 = wrapper.container.querySelector('h2')
      expect(h2).toBeFalsy()

      const hr = wrapper.container.querySelector('hr')
      expect(hr).toBeFalsy()

      expect(wrapper.getByText('Hello World')).toBeTruthy()
    })

    test('DashboardLayout renders the DashboardHeader', () => {
      const wrapper = renderAuthenticated(
        <DashboardLayout>Hello World</DashboardLayout>
      )

      const a = wrapper.container.querySelector('a')
      expect(a?.textContent).toBe('Skyrim Inventory Management')
      expect(a?.href).toBe(`${BASE_APP_URI}${paths.dashboard.main}`)

      expect(wrapper.getByText('Edna St. Vincent Millay')).toBeTruthy()
      expect(wrapper.getByText('edna@gmail.com')).toBeTruthy()
    })

    test('matches snapshot', () => {
      const wrapper = renderAuthenticated(
        <DashboardLayout>Hello World</DashboardLayout>
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
