import { type MosaicCardAttributes } from './types'
import {
  YELLOW,
  PINK,
  BLUE,
  GREEN,
  AQUA
} from '../../utils/colorSchemes'

const testCards: MosaicCardAttributes[] = [
  {
    colorScheme: YELLOW,
    href: '/yellow',
    key: 'yellow',
    children: 'Yellow Card'
  },
  {
    colorScheme: PINK,
    href: '/pink',
    key: 'pink',
    children: 'Pink Card'
  },
  {
    colorScheme: BLUE,
    href: '/blue',
    key: 'blue',
    children: 'Blue Card'
  },
  {
    colorScheme: GREEN,
    href: '/green',
    key: 'green',
    children: 'Green Card'
  },
  {
    colorScheme: AQUA,
    href: '/aqua',
    key: 'aqua',
    children: 'Aqua Card'
  }
]

export default testCards