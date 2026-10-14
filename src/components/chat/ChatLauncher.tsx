interface ChatLauncherProps {
  open: boolean
  onClick: () => void
  showPulse: boolean
  pulseKey: number
}

export function ChatLauncher({ open, onClick, showPulse, pulseKey }: ChatLauncherProps) {
  return (
    <div className="chat-launcher-wrap">
      {showPulse && (
        <div className="chat-launcher-ripples" key={pulseKey} aria-hidden>
          <span className="chat-launcher-ripples__ring" />
          <span className="chat-launcher-ripples__ring" />
          <span className="chat-launcher-ripples__ring" />
        </div>
      )}
      <button
        type="button"
        className={`chat-launcher ${open ? 'chat-launcher--open' : ''}`}
        onClick={onClick}
        aria-label={open ? 'Свернуть чат' : 'Открыть чат'}
        aria-expanded={open}
      >
        {open ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <img
            className="chat-launcher__avatar"
            src="/launcher-agent.svg"
            alt=""
            width={60}
            height={60}
          />
        )}
      </button>
    </div>
  )
}
