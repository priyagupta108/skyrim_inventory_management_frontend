import { ReactElement } from 'react'
import classNames from 'classnames'
import styles from './modal.module.css'

interface ModalProps {
  hidden: boolean
  children: ReactElement
}

const Modal = ({ hidden, children }: ModalProps) => (
  <div className={classNames(styles.root, { [styles.hidden]: hidden })}>
    {children}
  </div>
)

export default Modal
