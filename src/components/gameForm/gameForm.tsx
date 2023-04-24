import {
  useEffect,
  useRef,
  type CSSProperties,
  type FormEventHandler,
} from 'react'
import { RequestGame as Game } from '../../types/apiData'
import colorSchemes, { type ColorScheme } from '../../utils/colorSchemes'
import styles from './gameForm.module.css'

interface GameFormProps {
  submitForm: (attributes: Game) => void
  type?: 'create' | 'edit'
  defaultName?: string
  defaultDescription?: string | null
  buttonColor?: ColorScheme
}

const GameForm = ({
  submitForm,
  type = 'create',
  defaultName,
  defaultDescription,
  buttonColor,
}: GameFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Set the button to a random color if it hasn't been explicitly set
  const colorRef = useRef<ColorScheme>(
    buttonColor || colorSchemes[Math.floor(Math.random() * colorSchemes.length)]
  )

  const colorVars = {
    '--button-background-color': colorRef.current.schemeColorDarkest,
    '--button-text-color': colorRef.current.textColorPrimary,
    '--button-hover-color': colorRef.current.hoverColorDark,
    '--button-border-color': colorRef.current.borderColor,
  } as CSSProperties

  const extractAttributes = (formData: FormData): Game => {
    const values = Object.fromEntries(Array.from(formData.entries())) as Record<
      string,
      string
    >

    return {
      name: values.name?.trim() || null,
      description: values.description?.trim() || null,
    }
  }

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const attributes = extractAttributes(formData)

    submitForm(attributes)
  }

  useEffect(() => {
    inputRef.current?.focus()
  })

  return (
    <div className={styles.root}>
      <h3 className={styles.header}>
        {type === 'create' ? 'Create Game' : 'Update Game'}
      </h3>
      <form
        ref={formRef}
        style={colorVars}
        onSubmit={onSubmit}
        data-testId="gameForm"
      >
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              ref={inputRef}
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={defaultName}
              pattern="^\s*[A-Za-z0-9 \-',]*\s*$"
              title="Name can contain only alphanumeric characters, spaces, commas, hyphens, and apostrophes"
            />
          </label>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>
            Description
            <input
              className={styles.input}
              name="description"
              placeholder="Description"
              defaultValue={defaultDescription || undefined}
            />
          </label>
        </fieldset>
        <button
          className={styles.submit}
          type="submit"
          data-testid="gameFormSubmit"
        >
          {type === 'create' ? 'Create Game' : 'Update Game'}
        </button>
      </form>
    </div>
  )
}

export default GameForm
