import { type ReactElement } from 'react'
import { type RelativePath } from '../../types/navigation'
import { ColorScheme } from '../../utils/colorSchemes'

export interface MosaicCardAttributes {
  colorScheme: ColorScheme
  href: RelativePath
  children: ReactElement | ReactElement[] | string
  key: string
}

export interface NavigationMosaicProps {
  cardArray: MosaicCardAttributes[]
}
