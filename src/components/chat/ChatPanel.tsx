import { useEffect, useRef } from 'react'
import type { Message } from '../../types/chat'
import type { Theme } from '../../hooks/useTheme'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'

interface ChatPanelProps {
  open: boolean
  messages: Message[]
  isTyping: boolean
  theme: Theme
  onToggleTheme: () => void
  onClose: () => void
  onSend: (text: string) => void
}

export function ChatPanel({
  open,
  messages,
  isTyping,
  theme,
  onToggleTheme,
  onClose,
  onSend,
}: ChatPanelProps) {
  const inputWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const field = inputWrapRef.current?.querySelector('textarea')
    field?.focus()
  }, [open])

  if (!open) return null

  return (
    <div className="chat-panel" role="dialog" aria-label="Чат с консультантом">
      <ChatHeader
        theme={theme}
        onToggleTheme={onToggleTheme}
        onMinimize={onClose}
      />
      <MessageList messages={messages} isTyping={isTyping} theme={theme} />
      <div ref={inputWrapRef}>
        <ChatInput onSend={onSend} disabled={isTyping} active={open} />
      </div>
    </div>
  )
}
