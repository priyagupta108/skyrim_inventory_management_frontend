import { useState, useEffect, type CSSProperties } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { BLUE } from '../../utils/colorSchemes'
import useSize from '../../hooks/useSize'
import useComponentVisible from '../../hooks/useComponentVisible'
import StyledSelectOption from '../styledSelectOption/styledSelectOption'
import styles from './styledSelect.module.css'

export interface SelectOption {
  optionName: string
  optionValue: string | number
}

interface StyledSelectProps {
  options: SelectOption[]
  placeholder: string
  onOptionSelected: (optionValue: string | number) => void
  disabled?: boolean
  defaultOption?: SelectOption | null
  className?: string
}

const measureText = (text: string) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) return 0

  context.font = '16px Quattrocento Sans'

  return context.measureText(text).width
}

const truncatedText = (text: string, width?: number) => {
  if (!width) return

  // 48px is the width of the button (32px) + side margins (16px)
  const maxWidth = width - 48
  let textWidth = measureText(text)

  if (textWidth < maxWidth) return text

  // Subtract ~3 since we will be adding ellipses to any truncated
  // option names
  let maxLength = text.length - 3

  while (measureText(`${text.trim()}...`) > maxWidth) {
    maxLength--
    text = text.substring(0, maxLength - 1)
  }

  return `${text.trim()}...`
}

const isEqual = (option1: SelectOption, option2: SelectOption) =>
  option1.optionName === option2.optionName &&
  option1.optionValue === option2.optionValue

const StyledSelect = ({
  options,
  placeholder,
  onOptionSelected,
  defaultOption,
  disabled,
  className,
}: StyledSelectProps) => {
  const [activeOption, setActiveOption] = useState<SelectOption | null>(null)
  const [headerText, setHeaderText] = useState(defaultOption?.optionName || '')
  const {
    isComponentVisible,
    setIsComponentVisible,
    componentRef,
    triggerRef,
  } = useComponentVisible()
  const size = useSize(triggerRef)

  const colorVars = {
    '--button-background-color': BLUE.schemeColorDarkest,
    '--button-hover-color': BLUE.hoverColorDark,
    '--button-text-color': BLUE.textColorPrimary,
    '--button-border-color': BLUE.borderColor,
  } as CSSProperties

  const selectOption = (value: string | number) => {
    const opt = options.find(({ optionValue }) => optionValue === value)

    if (opt) {
      setActiveOption(opt)
      setHeaderText(opt.optionName)
      setIsComponentVisible(false)
      onOptionSelected(value)
    }
  }

  useEffect(() => {
    const hideDropdown = (e: FocusEvent) => {
      if (
        componentRef.current &&
        componentRef.current !== e.relatedTarget &&
        !componentRef.current.contains(e.relatedTarget as Node)
      ) {
        setIsComponentVisible(false)
      }
    }

    document.addEventListener('focusout', hideDropdown)

    return () => document.removeEventListener('focusout', hideDropdown)
  })

  useEffect(() => {
    if (defaultOption && !activeOption) {
      setHeaderText(defaultOption.optionName)
      setActiveOption(defaultOption)
    }
  }, [defaultOption, activeOption])

  return (
    <div
      className={classNames(styles.root, className, {
        [styles.disabled]: disabled,
      })}
      style={colorVars}
      ref={componentRef}
      data-testid="styledSelect"
    >
      <div
        className={styles.header}
        ref={triggerRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-owns="selectListbox"
        aria-controls="selectListbox"
        aria-expanded={isComponentVisible}
      >
        <p className={styles.headerText} data-testid="selectedOption">
          {truncatedText(
            options.length ? headerText : placeholder,
            size?.width
          )}
        </p>
        <button className={styles.trigger} disabled={disabled}>
          <FontAwesomeIcon className={styles.fa} icon={faAngleDown} />
        </button>
      </div>
      <ul
        id="selectListbox"
        className={classNames(styles.dropdown, {
          [styles.hidden]: !isComponentVisible || !options.length,
        })}
        role="listbox"
      >
        {options.map((option, index) => {
          return (
            <StyledSelectOption
              key={index}
              onSelected={selectOption}
              ariaSelected={!!activeOption && isEqual(option, activeOption)}
              {...option}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default StyledSelect
