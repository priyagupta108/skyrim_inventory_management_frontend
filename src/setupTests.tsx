import { type ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

export const renderWithRouter = (ui: ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>)