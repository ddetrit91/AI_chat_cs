// mock: заменить на API

export const MOCK_AGENT = {
  name: 'Алина',
  title: 'ИИ-консультант',
  avatarUrl: '/avatar-agent.svg',
  status: 'Онлайн',
}

export const WELCOME_MESSAGE =
  'Здравствуйте! Я виртуальный помощник. Задайте вопрос о продукте, тарифах или поддержке — отвечу в течение минуты.'

const KEYWORD_REPLIES: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /тариф|цен|стоим|оплат|подписк/i,
    reply:
      'У нас есть тариф «Старт» (бесплатно), «Бизнес» (2 990 ₽/мес) и «Корпоративный» — по запросу. Могу помочь подобрать вариант под ваши задачи.',
  },
  {
    pattern: /поддерж|помощ|проблем|не работ/i,
    reply:
      'Опишите, что именно не получается: ошибка, шаги до неё и ваш тариф. Если нужно срочно — оставьте email, мы передадим в службу поддержки.',
  },
  {
    pattern: /привет|здравств|добр(ый|ое|ого)/i,
    reply: 'Рад вас видеть! Чем могу помочь сегодня?',
  },
  {
    pattern: /демо|попроб|тест/i,
    reply:
      'Демо доступно 14 дней без карты. Нажмите «Начать» на главной странице или напишите, и я пришлю ссылку на регистрацию.',
  },
  {
    pattern: /интеграц|api|встро/i,
    reply:
      'Есть REST API и виджет для сайта (как этот чат). Документация в разделе «Разработчикам»; для webhook и SSO — тариф «Корпоративный».',
  },
]

export function getMockReply(userText: string): string {
  const trimmed = userText.trim()
  if (!trimmed) {
    return 'Напишите сообщение — я постараюсь помочь.'
  }

  for (const { pattern, reply } of KEYWORD_REPLIES) {
    if (pattern.test(trimmed)) {
      return reply
    }
  }

  const fallbacks = [
    'Понял вас. Расскажите подробнее — так смогу дать точный ответ.',
    'Спасибо за вопрос! Уточните, пожалуйста: вас интересует продукт, оплата или техническая настройка?',
    'Я зафиксировал запрос. Можете добавить детали или спросить про тарифы и интеграцию.',
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

export function mockReplyDelayMs(): number {
  return 800 + Math.random() * 700
}
