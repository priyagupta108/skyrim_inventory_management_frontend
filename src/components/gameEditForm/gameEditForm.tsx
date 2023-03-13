import {
  useEffect,
  useRef,
  type CSSProperties,
  type FormEventHandler,
} from 'react'
import colorSchemes, { ColorScheme } from '../../utils/colorSchemes'
import styles from './gameEditForm.module.css'

interface GameEditFormProps {
  gameId: number
  name: string
  description: string | null
  buttonColor?: ColorScheme
}

const GameEditForm = ({
  gameId,
  name,
  description,
  buttonColor,
}: GameEditFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Set the button to a random color
  const colorRef = useRef<ColorScheme>(
    buttonColor || colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
  )

  const colorVars = {
    '--button-background-color': colorRef.current.schemeColorDarkest,
    '--button-text-color': colorRef.current.textColorPrimary,
    '--button-hover-color': colorRef.current.hoverColorDark,
    '--button-border-color': colorRef.current.borderColor,
  } as CSSProperties

  const onSubmit: FormEventHandler = () => {}

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  return (
    <div className={styles.root}>
      <h3 className={styles.header}>Update Game</h3>
      <form
        ref={formRef}
        className={styles.form}
        style={colorVars}
        onSubmit={onSubmit}
        data-testid={`editGame${gameId}`}
      >
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            ref={inputRef}
            type="text"
            name="name"
            aria-label="Name"
            data-testid="nameField"
            defaultValue={name}
            pattern="^\s*[A-Za-z0-9 \-',]*\s*$"
            title="Name can contain only alphanumeric characters, spaces, commas, hyphens, and apostrophes"
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <input
            className={styles.input}
            ref={inputRef}
            name="description"
            aria-label="Description"
            data-testid="descriptionField"
            placeholder="Description"
            defaultValue={description || undefined}
          />
        </fieldset>
        <button
          className={styles.submit}
          type="submit"
          data-testid="submitGameEditForm"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default GameEditForm
