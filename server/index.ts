import cors from 'cors'
import express from 'express'
import { generateAgentReply, getConfiguredModels, getPrimaryModelName, type ChatTurn } from './gemini.js'
import './env.js'

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(cors({ origin: true }))
app.use(express.json({ limit: '64kb' }))

app.get('/api/health', (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY?.trim())
  res.json({
    ok: true,
    geminiConfigured: hasKey,
    model: getPrimaryModelName(),
    fallbackModels: getConfiguredModels().slice(1),
  })
})

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body as { messages?: ChatTurn[] }

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Нужен массив messages' })
      return
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
      res.status(400).json({ error: 'Последнее сообщение должно быть от пользователя' })
      return
    }

    if (sanitized.length > 40) {
      sanitized.splice(0, sanitized.length - 40)
    }

    const reply = await generateAgentReply(sanitized)
    res.json({ reply })
  } catch (err) {
    console.error('[api/chat]', err)
    const message =
      err instanceof Error ? err.message : 'Не удалось получить ответ от агента'
    res.status(500).json({ error: message })
  }
})

app.listen(port, () => {
  console.log(`API: http://localhost:${port}`)
})
