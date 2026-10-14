# Чат ИИ-агента (стиль Jivo)

Демо-лендинг и плавающий виджет чата на **Vite + React + TypeScript**.

## Запуск

```bash
npm install
npm run dev
```

Откройте адрес из терминала (обычно `http://localhost:5173`). Кнопка чата — в правом нижнем углу.

## Сборка

```bash
npm run build
npm run preview
```

## Мок-ответы и подключение API

- Профиль агента и шаблоны ответов: [`src/mock/aiAgent.ts`](src/mock/aiAgent.ts)
- Логика отправки и задержка «печатает…»: [`src/hooks/useChat.ts`](src/hooks/useChat.ts)

Замените вызов `getMockReply` в `useChat` на `fetch('/api/chat')` или SSE-стрим.

## Тема

Переключатель в шапке виджета. Выбор сохраняется в `localStorage` (`ai-chat-theme`). Стили: [`src/index.css`](src/index.css) (`data-theme` на `<html>`).
