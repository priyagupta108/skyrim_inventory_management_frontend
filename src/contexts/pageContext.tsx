import { createContext, useState, useEffect } from 'react'
import { ProviderProps } from '../types/contexts'
import { type FlashProps, type ModalProps } from '../types/pageContext'

interface PageContextType {
  flashProps: FlashProps
  setFlashProps: (props: FlashProps) => void
  modalProps: ModalProps
  setModalProps: (props: ModalProps) => void
}

const defaultFlashProps: FlashProps = {
  type: 'info',
  message: '',
  hidden: true,
}

const defaultModalProps: ModalProps = {
  hidden: true,
  children: <></>,
}

const PageContext = createContext<PageContextType>({
  flashProps: defaultFlashProps,
  modalProps: defaultModalProps,
  setFlashProps: () => {},
  setModalProps: () => {},
})

const PageProvider = ({ children }: ProviderProps) => {
  const [flashProps, setFlashProps] = useState<FlashProps>(defaultFlashProps)
  const [modalProps, setModalProps] = useState<ModalProps>(defaultModalProps)

  const value = {
    flashProps,
    modalProps,
    setFlashProps,
    setModalProps,
  }

  useEffect(() => {
    if (flashProps.hidden === false) {
      setTimeout(() => setFlashProps({ ...flashProps, hidden: true }), 4000)
    }
  }, [flashProps])

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export { PageContext, PageProvider }
