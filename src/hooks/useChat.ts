import { useCallback, useRef, useState } from 'react'
import type { Message } from '../types/chat'
import {
  getMockReply,
  mockReplyDelayMs,
  WELCOME_MESSAGE,
} from '../mock/aiAgent'

function createMessage(role: Message['role'], text: string): Message {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    text,
    createdAt: Date.now(),
  }
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const welcomedRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const ensureWelcome = useCallback(() => {
    if (welcomedRef.current) return
    welcomedRef.current = true
    setMessages([createMessage('assistant', WELCOME_MESSAGE)])
  }, [])

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setMessages((prev) => [...prev, createMessage('user', trimmed)])
    setIsTyping(true)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    // mock: заменить на API/stream
    timeoutRef.current = setTimeout(() => {
      const reply = getMockReply(trimmed)
      setMessages((prev) => [...prev, createMessage('assistant', reply)])
      setIsTyping(false)
      timeoutRef.current = null
    }, mockReplyDelayMs())
  }, [isTyping])

  return {
    messages,
    isTyping,
    sendMessage,
    ensureWelcome,
  }
}
