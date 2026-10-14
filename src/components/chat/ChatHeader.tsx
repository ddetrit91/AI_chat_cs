import { MOCK_AGENT } from '../../mock/aiAgent'
import type { Theme } from '../../hooks/useTheme'

interface ChatHeaderProps {
  theme: Theme
  onToggleTheme: () => void
  onMinimize: () => void
}

export function ChatHeader({ theme, onToggleTheme, onMinimize }: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <div className="chat-header__info">
        <img
          className="chat-header__avatar"
          src={MOCK_AGENT.avatarUrl}
          alt=""
          width={40}
          height={40}
        />
        <div>
          <h2 className="chat-header__name">{MOCK_AGENT.name}</h2>
          <p className="chat-header__status">
            <span className="chat-header__status-dot" aria-hidden />
            {MOCK_AGENT.status}
          </p>
        </div>
      </div>
      <div className="chat-header__actions">
        <button
          type="button"
          className="chat-header__btn"
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path
                d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.5 5.5 0 0 1-4.4 2.26 5.5 5.5 0 0 1-5.16-3.4A5.5 5.5 0 0 1 12 3z"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path
                d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0zM5.99 4.58a1 1 0 0 0-1.41 1.41l1.42 1.42a1 1 0 1 0 1.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 0 0-1.41 1.41l1.42 1.42a1 1 0 0 0 1.41-1.41l-1.42-1.42zm1.41-13.8a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 1 0 1.41 1.41l1.42-1.42a1 1 0 0 0 0-1.41zM7.4 18.01a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 1 0 1.41 1.41l1.42-1.42a1 1 0 0 0 0-1.41z"
              />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="chat-header__btn"
          onClick={onMinimize}
          aria-label="Свернуть чат"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    </header>
  )
}
