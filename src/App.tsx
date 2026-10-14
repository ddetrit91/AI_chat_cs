import { ChatWidget } from './components/chat/ChatWidget'
import { IT_CENTER_PHONE, IT_CENTER_TELEGRAM } from '../shared/supportContacts'
import './App.css'

const TELEGRAM_URL = `https://t.me/${IT_CENTER_TELEGRAM.replace('@', '')}`

const SERVICES = [
  {
    title: 'Ремонт и настройка ПК',
    text: 'Диагностика, чистка, апгрейд, установка Windows и macOS, драйверы и офисные программы.',
  },
  {
    title: 'Сети и интернет',
    text: 'Wi‑Fi, роутеры, VPN, локальные сети, настройка принтеров и общего доступа в офисе.',
  },
  {
    title: 'Безопасность',
    text: 'Антивирус, резервные копии, восстановление после сбоев, базовый аудит и рекомендации.',
  },
  {
    title: 'Облако и серверы',
    text: 'Почта на домене, хостинг, удалённый доступ, миграция данных и типовая админка.',
  },
  {
    title: 'IT для бизнеса',
    text: 'Абонентское обслуживание, мониторинг, заявки по SLA, выезд инженера при необходимости.',
  },
  {
    title: 'Консультации',
    text: 'Подбор техники и ПО, оценка сроков и бюджета — в чате, по телефону или в Telegram.',
  },
] as const

const PLANS: {
  name: string
  price: string
  note: string
  featured?: boolean
}[] = [
  {
    name: 'Разовый выезд',
    price: 'от 2 500 ₽',
    note: 'Диагностика и типовые работы на месте или удалённо',
  },
  {
    name: 'Бизнес Старт',
    price: 'от 9 900 ₽/мес',
    note: 'До 5 рабочих мест, приоритетная линия, резервное копирование',
    featured: true,
  },
  {
    name: 'Бизнес Про',
    price: 'по запросу',
    note: 'Серверы, SLA, выделенный инженер, интеграции под ваш процесс',
  },
]

function App() {
  return (
    <div className="demo">
      <header className="demo-header">
        <a className="demo-logo" href="#top">
          АйТи-центр
        </a>
        <nav className="demo-nav" aria-label="Основная навигация">
          <a href="#features">Услуги</a>
          <a href="#pricing">Тарифы</a>
          <a href="#contact">Контакты</a>
        </nav>
        <a className="demo-header-cta" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
          Написать
        </a>
      </header>

      <main id="top">
        <section className="demo-hero">
          <p className="demo-hero__badge">Выезд · Удалённо · Для дома и офиса</p>
          <h1>IT-поддержка, которая решает задачи, а не создаёт новые</h1>
          <p className="demo-hero__lead">
            АйТи-центр — ремонт и настройка техники, сети, безопасность и
            сопровождение бизнеса. Сначала ответит онлайн-консультант в чате;
            сложные кейсы передадим инженеру.
          </p>
          <div className="demo-hero__actions">
            <a className="demo-cta" href="#contact">
              Оставить заявку
            </a>
            <a className="demo-cta demo-cta--ghost" href="#features">
              Смотреть услуги
            </a>
          </div>
          <ul className="demo-hero__stats" aria-label="Преимущества">
            <li>
              <strong>30 мин</strong>
              <span>средний ответ в чате</span>
            </li>
            <li>
              <strong>7 дней</strong>
              <span>поддержка после работ</span>
            </li>
            <li>
              <strong>1 договор</strong>
              <span>для абонентского SLA</span>
            </li>
          </ul>
        </section>

        <section className="demo-section demo-section--services" id="features">
          <div className="demo-section__head">
            <h2>Услуги</h2>
            <p>Закрываем типовые IT-задачи под ключ — от домашнего ПК до офиса на 50+ мест.</p>
          </div>
          <div className="demo-sections">
            {SERVICES.map((item) => (
              <article className="demo-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="demo-section" id="pricing">
          <div className="demo-section__head">
            <h2>Тарифы</h2>
            <p>
              Ориентиры для MVP — финальную смету согласуем после описания задачи в
              чате или по телефону.
            </p>
          </div>
          <div className="demo-plans">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`demo-plan${plan.featured ? ' demo-plan--featured' : ''}`}
              >
                {plan.featured && <span className="demo-plan__label">Популярный</span>}
                <h3>{plan.name}</h3>
                <p className="demo-plan__price">{plan.price}</p>
                <p className="demo-plan__note">{plan.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="demo-contact" id="contact">
          <div className="demo-contact__inner">
            <h2>Связаться с АйТи-центром</h2>
            <p>
              Опишите проблему в чате (кнопка справа внизу) — консультант подскажет
              по IT-услугам. Нужен мастер или договор — звоните или пишите в
              Telegram.
            </p>
            <div className="demo-contact__links">
              <a className="demo-contact__link" href={`tel:${IT_CENTER_PHONE.replace(/\s|[()]/g, '')}`}>
                {IT_CENTER_PHONE}
              </a>
              <a
                className="demo-contact__link demo-contact__link--tg"
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
              >
                {IT_CENTER_TELEGRAM}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="demo-footer">
        <p>© {new Date().getFullYear()} АйТи-центр — IT-услуги и онлайн-консультант</p>
        <p className="demo-footer__meta">
          Чат отвечает только на вопросы по IT; остальное — по контактам выше.
        </p>
      </footer>

      <ChatWidget />
    </div>
  )
}

export default App
