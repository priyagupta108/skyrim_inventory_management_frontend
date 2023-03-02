import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderAuthenticated } from '../../setupTests'
import UserInfo from './userInfo'

describe('<UserInfo />', () => {
  test('UserInfo displays user name and email', () => {
    const wrapper = renderAuthenticated(<UserInfo />)
    expect(wrapper).toBeTruthy()

    expect(screen.getByText('Edna St. Vincent Millay')).toBeTruthy()
    expect(screen.getByText('edna@gmail.com')).toBeTruthy()

    const img = wrapper.container.querySelector('img')
    expect(img?.src).toBe('/src/testProfileImg.png')
  })

  test('UserInfo matches snapshot', () => {
    const wrapper = renderAuthenticated(<UserInfo />)
    expect(wrapper).toMatchSnapshot()
  })
})