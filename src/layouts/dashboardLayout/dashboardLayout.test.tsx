import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../setupTests'
import DashboardLayout from './dashboardLayout'
import paths from '../../routing/paths'

describe('<DashboardLayout>', () => {
  describe('when a title is given', () => {
    test('DashboardLayout renders the title and content', () => {
      const wrapper = renderWithRouter(
        <DashboardLayout title='Page Title'>
          Hello World
        </DashboardLayout>
      )
      expect(wrapper).toBeTruthy()

      const h2 = wrapper.container.querySelector('h2')
      expect(h2?.textContent).toBe('Page Title')

      expect(screen.getByText('Hello World')).toBeTruthy()
    })

    test('DashboardLayout renders the DashboardHeader', () => {
      const wrapper = renderWithRouter(
        <DashboardLayout title='Page Title'>
          Hello World
        </DashboardLayout>
      )

      const a = wrapper.container.querySelector('a')
      expect(a?.textContent).toBe('Skyrim Inventory Management')
      expect(a?.href).toBe(paths.dashboard.main)
    })
  })

  describe('when no title is given', () => {
    test('DashboardLayout displays content but not an h2 or hr', () => {
      const wrapper = renderWithRouter(
        <DashboardLayout>
          Hello World
        </DashboardLayout>
      )
      expect(wrapper).toBeTruthy()

      const h2 = wrapper.container.querySelector('h2')
      expect(h2).toBeFalsy()

      const hr = wrapper.container.querySelector('hr')
      expect(hr).toBeFalsy()

      expect(screen.getByText('Hello World')).toBeTruthy()
    })

    test('DashboardLayout renders the DashboardHeader', () => {
      const wrapper = renderWithRouter(
        <DashboardLayout>
          Hello World
        </DashboardLayout>
      )

      const a = wrapper.container.querySelector('a')
      expect(a?.textContent).toBe('Skyrim Inventory Management')
      expect(a?.href).toBe(paths.dashboard.main)
    })
  })
})