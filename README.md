# Чат ИИ-агента (стиль Jivo)

Демо-лендинг и плавающий виджет чата на **Vite + React + TypeScript**. Ответы генерирует **Google Gemini** на backend (Node + Express).

## Запуск

1. Скопируйте переменные окружения и укажите API-ключ:

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

Отдельно: `npm run dev:client` — только Vite; `npm run dev:server` — только API.

## Сборка фронтенда

```bash
npm run build
npm run preview
```

Для production разверните [`server/`](server/) рядом с `dist/` и настройте прокси `/api` на backend.

## Архитектура

| Часть | Путь |
|--------|------|
| Виджет, UI | [`src/components/chat/`](src/components/chat/) |
| Запросы к API | [`src/api/chat.ts`](src/api/chat.ts), [`src/hooks/useChat.ts`](src/hooks/useChat.ts) |
| Express + Gemini | [`server/index.ts`](server/index.ts), [`server/gemini.ts`](server/gemini.ts) |
| Системный промпт агента | [`server/agentPrompt.ts`](server/agentPrompt.ts) |

Переменные: `GEMINI_API_KEY`, `GEMINI_MODEL` (по умолчанию `gemini-3.5-flash-lite`), опционально `GEMINI_FALLBACK_MODELS`, `PORT` (3001). Проверка: `GET /api/health` — поле `model`.

**Важно:** в `.env` строка должна быть вида `GEMINI_MODEL=gemini-3.5-flash-lite`, а не просто имя модели без ключа.

## Тема

Переключатель в шапке виджета. Выбор сохраняется в `localStorage` (`ai-chat-theme`).
