import type { Message } from '../../types/chat'
import { MOCK_AGENT } from '../../mock/aiAgent'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`chat-message ${isUser ? 'chat-message--user' : 'chat-message--agent'}`}
    >
      {!isUser && (
        <img
          className="chat-message__avatar"
          src={MOCK_AGENT.avatarUrl}
          alt=""
          width={32}
          height={32}
        />
      )}
      <div className="chat-message__bubble">
        <p className="chat-message__text">{message.text}</p>
      </div>
    </div>
  )
}
