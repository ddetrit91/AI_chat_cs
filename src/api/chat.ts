export type ChatApiMessage = {
  role: 'user' | 'assistant'
  text: string
}

export async function requestAgentReply(messages: ChatApiMessage[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  const data = (await res.json().catch(() => ({}))) as {
    reply?: string
    error?: string
  }

  if (!res.ok) {
    throw new Error(data.error || `Ошибка сервера (${res.status})`)
  }

  if (!data.reply?.trim()) {
    throw new Error('Пустой ответ от сервера')
  }

  return data.reply.trim()
}
