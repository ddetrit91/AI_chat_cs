# АйТи-центр — чат ИИ-агента (стиль Jivo)

Лендинг IT-услуг и плавающий виджет чата на **Vite + React + TypeScript**. Ответы генерирует **Google Gemini** (локально — Express, на Vercel — serverless `/api`).

## Production (Vercel)

- **Сайт:** https://ai-chat-cs-indol.vercel.app  
- **Проверка API:** https://ai-chat-cs-indol.vercel.app/api/health  
- **Проект в Vercel:** `ddetrit/ai-chat-cs`

Переменные окружения на Vercel: `GEMINI_API_KEY`, `GEMINI_MODEL` (Production / Preview / Development).

Повторный деплой из папки проекта (нужен вход в CLI: `npx vercel login`):

```bash
npx vercel deploy --prod
```

## Локальный запуск

1. Скопируйте переменные окружения:

```bash
cp .env.example .env
```

Ключ: [Google AI Studio](https://aistudio.google.com/apikey) → `GEMINI_API_KEY` в `.env`.

2. Установка и dev (frontend + backend):

```bash
npm install
npm run dev
```

- Сайт: `http://localhost:5173`
- API: `http://localhost:3001` (проксируется с фронта как `/api/*`)

## Сборка

```bash
npm run build
npm run preview
```

## Архитектура

| Часть | Путь |
|--------|------|
| Виджет, UI | [`src/components/chat/`](src/components/chat/) |
| Запросы к API | [`src/api/chat.ts`](src/api/chat.ts), [`src/hooks/useChat.ts`](src/hooks/useChat.ts) |
| Express (локально) | [`server/index.ts`](server/index.ts) |
| Vercel serverless | [`api/chat.ts`](api/chat.ts), [`api/health.ts`](api/health.ts) |
| Gemini | [`server/gemini.ts`](server/gemini.ts) |
| Промпт агента | [`server/agentPrompt.ts`](server/agentPrompt.ts) |

Переменные: `GEMINI_API_KEY`, `GEMINI_MODEL` (по умолчанию `gemini-3.5-flash-lite`), опционально `GEMINI_FALLBACK_MODELS`.

**Важно:** в `.env` строка должна быть `GEMINI_MODEL=имя_модели`, а не только имя модели отдельной строкой.

## Тема

Переключатель в шапке виджета. Выбор сохраняется в `localStorage` (`ai-chat-theme`).
