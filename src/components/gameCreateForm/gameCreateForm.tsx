import { useState, useRef, type ReactElement, type CSSProperties } from 'react'
import AnimateHeight from 'react-animate-height'
import { type BaseGame as Game } from '../../types/apiData'
import { BLUE } from '../../utils/colorSchemes'
import { usePageContext, useGamesContext } from '../../hooks/contexts'
import styles from './gameCreateForm.module.css'

interface GameCreateFormProps {
  disabled?: boolean
}

const GameCreateForm = ({ disabled }: GameCreateFormProps) => {
  const { setFlashProps } = usePageContext()
  const [formExpanded, setFormExpanded] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const colorVars = {
    '--button-color': BLUE.schemeColorDark,
    '--button-text-color': BLUE.textColorPrimary,
    '--button-border-color': BLUE.borderColor,
    '--button-hover-color': BLUE.hoverColorLight,
  } as CSSProperties

  const focusInputIfExpanded = () => {
    formExpanded ? inputRef.current?.focus() : inputRef.current?.blur()
  }

  return (
    <div className={styles.root} style={colorVars}>
      <h3
        role="button"
        aria-expanded={formExpanded}
        aria-controls="gameCreateForm"
        className={styles.toggle}
        onClick={() => setFormExpanded(!formExpanded)}
      >
        Create Game...
      </h3>
      <AnimateHeight
        id="gameCreateForm"
        duration={200}
        height={formExpanded ? 'auto' : 0}
        onHeightAnimationEnd={focusInputIfExpanded}
      >
        <form
          ref={formRef}
          className={styles.form}
          data-testid="gameCreateFormForm"
        >
          <fieldset className={styles.fieldset} disabled={disabled}>
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              name="name"
              placeholder="Name"
              aria-label="Name"
              data-testid="nameField"
              pattern="^\s*[A-Za-z0-9 \-',]*\s*$"
              title="Name can contain only alphanumeric characters, spaces, commas, hyphens, and apostrophes"
            />
          </fieldset>
          <fieldset className={styles.fieldset} disabled={disabled}>
            <input
              className={styles.input}
              type="text"
              name="description"
              placeholder="Description"
              aria-label="Description"
              data-testid="descriptionField"
            />
          </fieldset>
          <button
            className={styles.button}
            type="submit"
            data-testid="createGameSubmit"
            disabled={disabled}
          >
            Create
          </button>
        </form>
      </AnimateHeight>
    </div>
  )
}

export default GameCreateForm
