import { createContext, ReactElement } from 'react'
import { YELLOW, type ColorScheme } from '../utils/colorSchemes'

const ColorContext = createContext<ColorScheme>(YELLOW)

interface ProviderProps {
  colorScheme: ColorScheme
  children: ReactElement
}

const ColorProvider = ({ colorScheme, children }: ProviderProps) => (
  <ColorContext.Provider value={colorScheme}>{children}</ColorContext.Provider>
)

export { ColorProvider, ColorContext }
