import {
  useRef,
  type KeyboardEventHandler,
  type MouseEventHandler,
} from 'react'
import classNames, { type Argument } from 'classnames'
import { measureText } from '../../utils/measureText'
import useSize from '../../hooks/useSize'
import styles from './styledSelectOption.module.css'

interface StyledSelectOptionProps {
  optionName: string
  optionValue: string | number
  onSelected: (optionValue: string | number) => void
  ariaSelected: boolean
  className?: Argument
}

const StyledSelectOption = ({
  optionName,
  optionValue,
  onSelected,
  ariaSelected,
  className,
}: StyledSelectOptionProps) => {
  const componentRef = useRef<HTMLLIElement>(null)
  const size = useSize(componentRef)

  const displayName = (maxWidth?: number) => {
    if (!maxWidth) return

    const font = '16px Quattrocento Sans'
    const textWidth = measureText(optionName, font)

    if (textWidth < maxWidth) return optionName

    // Subtract ~3 since we'll be adding ellipses to the
    // option name if it is truncated
    let maxLength = optionName.length - 3
    let text = optionName

    while (measureText(`${text.trim()}...`, font) >= maxWidth) {
      maxLength--
      text = text.substring(0, maxLength - 1)
    }

    return `${text.trim()}...`
  }

  const onClick: MouseEventHandler = (e) => {
    e.preventDefault()

    onSelected(optionValue)
  }

  const onKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelected(optionValue)
    }
  }

  return (
    <li
      className={classNames(styles.root, className)}
      ref={componentRef}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="option"
      tabIndex={0}
      aria-selected={ariaSelected}
      data-option-value={optionValue}
    >
      {displayName(size?.width)}
    </li>
  )
}

export default StyledSelectOption
