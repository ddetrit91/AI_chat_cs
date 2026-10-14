import { useCallback, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useSpeechInput } from '../../hooks/useSpeechInput'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
  active?: boolean
}

export function ChatInput({ onSend, disabled, active = true }: ChatInputProps) {
  const [value, setValue] = useState('')
  const [interim, setInterim] = useState('')

  const handleTranscript = useCallback((text: string, isFinal: boolean) => {
    if (isFinal) {
      setValue((prev) => (prev.trim() ? `${prev.trim()} ${text}` : text))
      setInterim('')
    } else {
      setInterim(text)
    }
  }, [])

  const { supported, listening, error, toggle, stop } = useSpeechInput(
    handleTranscript,
    active && !disabled,
  )

  const displayValue = interim
    ? value.trim()
      ? `${value.trim()} ${interim}`
      : interim
    : value

  const submit = () => {
    const trimmed = displayValue.trim()
    if (!trimmed || disabled) return
    stop()
    onSend(trimmed)
    setValue('')
    setInterim('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        className={`chat-input__field${listening ? ' chat-input__field--listening' : ''}`}
        rows={1}
        placeholder={listening ? 'Говорите…' : 'Напишите сообщение…'}
        value={displayValue}
        onChange={(e) => {
          setValue(e.target.value)
          setInterim('')
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label="Текст сообщения"
      />
      {supported && (
        <button
          type="button"
          className={`chat-input__mic${listening ? ' chat-input__mic--on' : ''}`}
          onClick={toggle}
          disabled={disabled}
          aria-pressed={listening}
          aria-label={listening ? 'Остановить запись' : 'Голосовой ввод'}
          title={listening ? 'Остановить запись' : 'Голосовой ввод'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </button>
      )}
      <button
        type="submit"
        className="chat-input__send"
        disabled={disabled || !displayValue.trim()}
        aria-label="Отправить"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
      {error && (
        <p className="chat-input__hint" role="status">
          {error}
        </p>
      )}
    </form>
  )
}
