import { createContext, useState, useEffect, useRef } from 'react'
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

  const flashVisibleSince = useRef<number>(0)

  const value = {
    flashProps,
    modalProps,
    setFlashProps,
    setModalProps,
  }

  useEffect(() => {
    if (flashProps.hidden === true) return

    flashVisibleSince.current = Number(new Date())

    setTimeout(() => {
      if (Number(new Date()) - flashVisibleSince.current >= 4000) {
        setFlashProps({ ...flashProps, hidden: true })
        flashVisibleSince.current = 0
      }
    }, 4000)
  }, [flashProps])

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export { PageContext, PageProvider }
