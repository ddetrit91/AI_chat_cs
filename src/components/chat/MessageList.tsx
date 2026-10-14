import { useEffect, useRef } from 'react'
import type { Message } from '../../types/chat'
import type { Theme } from '../../hooks/useTheme'
import { MOCK_AGENT } from '../../mock/aiAgent'
import { ChatBackground3D } from './ChatBackground3D'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

interface MessageListProps {
  messages: Message[]
  isTyping: boolean
  theme: Theme
}

export function MessageList({ messages, isTyping, theme }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="chat-messages" role="log" aria-label="Сообщения чата">
      <ChatBackground3D theme={theme} />
      <div className="chat-messages__content">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && (
          <div className="chat-message chat-message--agent">
            <img
              className="chat-message__avatar"
              src={MOCK_AGENT.avatarUrl}
              alt=""
              width={32}
              height={32}
            />
            <div className="chat-message__bubble chat-message__bubble--typing">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}
