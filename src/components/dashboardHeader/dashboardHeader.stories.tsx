import { type Meta, type StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { testUser } from '../../support/data/users'
import {
  loadingLoginContextValue,
  loginContextValue,
} from '../../support/data/contextValues'
import { LoginContext } from '../../contexts/loginContext'
import DashboardHeader from './dashboardHeader'

type Story = StoryObj<typeof DashboardHeader>

const meta: Meta<typeof DashboardHeader> = {
  title: 'DashboardHeader',
  component: DashboardHeader,
}

export default meta

export const Default: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <LoginContext.Provider value={loginContextValue}>
          <DashboardHeader />
        </LoginContext.Provider>
      </BrowserRouter>
    )
  },
}

const userWithAnonymousAvatar = {
  ...testUser,
  photoURL: null,
}

export const WithAnonymousAvatar: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <LoginContext.Provider
          value={{ ...loginContextValue, user: userWithAnonymousAvatar }}
        >
          <DashboardHeader />
        </LoginContext.Provider>
      </BrowserRouter>
    )
  },
}

export const AuthLoading: Story = {
  render: () => {
    return (
      <BrowserRouter>
        <LoginContext.Provider value={loadingLoginContextValue}>
          <DashboardHeader />
        </LoginContext.Provider>
      </BrowserRouter>
    )
  },
}
