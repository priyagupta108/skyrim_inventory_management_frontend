import { type ReactElement } from 'react'
import { ColorScheme } from '../../utils/colorSchemes'

export interface MosaicCardAttributes {
  colorScheme: ColorScheme
  href: `/${string}` | `#${string}`
  children: ReactElement | ReactElement[] | string
  key: string
}

export interface NavigationMosaicProps {
  cardArray: MosaicCardAttributes[]
}
