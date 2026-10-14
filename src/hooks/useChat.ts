import { useCallback, useRef, useState } from 'react'
import { requestAgentReply } from '../api/chat'
import type { Message } from '../types/chat'
import { WELCOME_MESSAGE } from '../mock/aiAgent'

function createMessage(role: Message['role'], text: string): Message {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    text,
    createdAt: Date.now(),
  }
}

function toApiHistory(messages: Message[]) {
  return messages.map((m) => ({ role: m.role, text: m.text }))
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const welcomedRef = useRef(false)
  const requestIdRef = useRef(0)

  const ensureWelcome = useCallback(() => {
    if (welcomedRef.current) return
    welcomedRef.current = true
    setMessages([createMessage('assistant', WELCOME_MESSAGE)])
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMessage = createMessage('user', trimmed)
    let historyForApi: Message[] = []

    setMessages((prev) => {
      historyForApi = [...prev, userMessage]
      return historyForApi
    })
    setIsTyping(true)

    const requestId = ++requestIdRef.current

    try {
      const reply = await requestAgentReply(toApiHistory(historyForApi))
      if (requestId !== requestIdRef.current) return
      setMessages((prev) => [...prev, createMessage('assistant', reply)])
    } catch (err) {
      if (requestId !== requestIdRef.current) return
      const detail =
        err instanceof Error ? err.message : 'Не удалось связаться с сервером'
      setMessages((prev) => [
        ...prev,
        createMessage(
          'assistant',
          `Сейчас не получается ответить: ${detail}. Если в сообщении 503 — подождите и попробуйте снова; проверьте GEMINI_MODEL=имя_модели в .env и перезапустите npm run dev.`,
        ),
      ])
    } finally {
      if (requestId === requestIdRef.current) {
        setIsTyping(false)
      }
    }
  }, [isTyping])

  return {
    messages,
    isTyping,
    sendMessage,
    ensureWelcome,
  }
}
