import { type ReactElement } from 'react'

export type FlashMessageType = 'success' | 'error' | 'warning' | 'info'

export interface FlashProps {
  type: FlashMessageType
  message: string | string[]
  hidden: boolean
  header?: string
}

export interface FlashColors {
  success: `#${string}`
  error: `#${string}`
  warning: `#${string}`
  info: `#${string}`
}

export interface ModalProps {
  hidden: boolean
  children: ReactElement
}
