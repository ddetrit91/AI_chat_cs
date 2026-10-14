import { ChatWidget } from './components/chat/ChatWidget'
import './App.css'

function App() {
  return (
    <div className="demo">
      <header className="demo-header">
        <span className="demo-logo">CloudDesk</span>
        <nav className="demo-nav" aria-label="Основная навигация">
          <a href="#features">Возможности</a>
          <a href="#pricing">Тарифы</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      <section className="demo-hero">
        <h1>Управляйте проектами без лишней суеты</h1>
        <p>
          Демо-страница с виджетом чата в углу экрана — как на сайтах с Jivo.
          Откройте чат и задайте вопрос про тарифы или поддержку.
        </p>
        <a className="demo-cta" href="#features">Узнать больше</a>
      </section>

      <div className="demo-sections" id="features">
        <article className="demo-card">
          <h2>Задачи и доски</h2>
          <p>
            Канбан, списки и календарь в одном месте. Команда видит приоритеты
            в реальном времени.
          </p>
        </article>
        <article className="demo-card" id="pricing">
          <h2>Гибкие тарифы</h2>
          <p>
            От бесплатного старта до корпоративных лицензий. Спросите в чате
            про подбор тарифа.
          </p>
        </article>
        <article className="demo-card" id="contact">
          <h2>Поддержка 24/7</h2>
          <p>
            ИИ-консультант отвечает сразу; сложные кейсы передаются живым
            специалистам.
          </p>
        </article>
      </div>

      <footer className="demo-footer">
        © {new Date().getFullYear()} CloudDesk — демо чата ИИ-агента
      </footer>

      <ChatWidget />
    </div>
  )
}

export default App
