import { createContext } from 'react'
import { type ProviderProps } from '../types/contexts'
import { YELLOW, type ColorScheme } from '../utils/colorSchemes'

const ColorContext = createContext<ColorScheme>(YELLOW)

interface ColorProviderProps extends ProviderProps {
  colorScheme: ColorScheme
}

const ColorProvider = ({ colorScheme, children }: ColorProviderProps) => (
  <ColorContext.Provider value={colorScheme}>{children}</ColorContext.Provider>
)

export { ColorProvider, ColorContext }
