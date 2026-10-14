import { GoogleGenerativeAI } from '@google/generative-ai'
import { AGENT_SYSTEM_INSTRUCTION } from './agentPrompt.js'
import './env.js'

export type ChatTurn = {
  role: 'user' | 'assistant'
  text: string
}

const DEFAULT_MODEL = 'gemini-3.5-flash-lite'

/** Запасные модели, если основная перегружена (503) или недоступна (404). */
const FALLBACK_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
] as const

function parseModelList(): string[] {
  const primary = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL
  const extra = process.env.GEMINI_FALLBACK_MODELS?.trim()
  const fromEnv = extra
    ? extra.split(',').map((m) => m.trim()).filter(Boolean)
    : [...FALLBACK_MODELS]
  const seen = new Set<string>()
  const ordered: string[] = []
  for (const name of [primary, ...fromEnv]) {
    if (!seen.has(name)) {
      seen.add(name)
      ordered.push(name)
    }
  }
  return ordered
}

export function getConfiguredModels(): string[] {
  return parseModelList()
}

export function getPrimaryModelName(): string {
  return parseModelList()[0] ?? DEFAULT_MODEL
}

function getClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY не задан. Добавьте ключ в файл .env')
  }
  return new GoogleGenerativeAI(apiKey)
}

function isRetryableGeminiError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err)
  return (
    /\b503\b/.test(msg) ||
    /high demand/i.test(msg) ||
    /\b429\b/.test(msg) ||
    /resource exhausted/i.test(msg) ||
    /\b404\b/.test(msg) ||
    /no longer available/i.test(msg)
  )
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function generateWithModel(
  modelName: string,
  history: ChatTurn[],
): Promise<string> {
  const genAI = getClient()
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: AGENT_SYSTEM_INSTRUCTION,
  })

  const contents = history.map((turn) => ({
    role: turn.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: turn.text }],
  }))

  const result = await model.generateContent({ contents })
  const text = result.response.text()?.trim()

  if (!text) {
    throw new Error('Пустой ответ от модели Gemini')
  }

  return text
}

export async function generateAgentReply(history: ChatTurn[]): Promise<string> {
  const models = parseModelList()
  let lastError: unknown

  for (let i = 0; i < models.length; i++) {
    const modelName = models[i]
    const attempts = i === 0 ? 3 : 1

    for (let attempt = 0; attempt < attempts; attempt++) {
      try {
        return await generateWithModel(modelName, history)
      } catch (err) {
        lastError = err
        if (!isRetryableGeminiError(err)) {
          throw err
        }
        if (attempt < attempts - 1) {
          await sleep(800 * (attempt + 1))
          continue
        }
        console.warn(`[gemini] модель ${modelName} недоступна, пробуем следующую`)
        break
      }
    }
  }

  const detail =
    lastError instanceof Error ? lastError.message : 'Неизвестная ошибка Gemini'
  throw new Error(
    `Все модели заняты или недоступны. Последняя ошибка: ${detail}`,
  )
}
