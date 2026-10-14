import { generateAgentReply, getConfiguredModels, getPrimaryModelName, type ChatTurn } from './gemini.js'
import './env.js'

export function getHealthPayload() {
  const hasKey = Boolean(process.env.GEMINI_API_KEY?.trim())
  return {
    ok: true,
    geminiConfigured: hasKey,
    model: getPrimaryModelName(),
    fallbackModels: getConfiguredModels().slice(1),
  }
}

export async function handleChatBody(body: unknown): Promise<
  | { status: 200; data: { reply: string } }
  | { status: 400; data: { error: string } }
  | { status: 500; data: { error: string } }
> {
  try {
    const { messages } = body as { messages?: ChatTurn[] }

    if (!Array.isArray(messages) || messages.length === 0) {
      return { status: 400, data: { error: 'Нужен массив messages' } }
    }

    const sanitized: ChatTurn[] = messages
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.text === 'string' &&
          m.text.trim().length > 0,
      )
      .map((m) => ({ role: m.role, text: m.text.trim() }))

    const last = sanitized[sanitized.length - 1]
    if (!last || last.role !== 'user') {
      return { status: 400, data: { error: 'Последнее сообщение должно быть от пользователя' } }
    }

    if (sanitized.length > 40) {
      sanitized.splice(0, sanitized.length - 40)
    }

    const reply = await generateAgentReply(sanitized)
    return { status: 200, data: { reply } }
  } catch (err) {
    console.error('[api/chat]', err)
    const message =
      err instanceof Error ? err.message : 'Не удалось получить ответ от агента'
    return { status: 500, data: { error: message } }
  }
}
