interface ChatLauncherProps {
  open: boolean
  onClick: () => void
  showPulse: boolean
  pulseKey: number
}

function LauncherAvatar() {
  return (
    <svg
      className="chat-launcher__avatar"
      viewBox="0 0 64 64"
      width={60}
      height={60}
      aria-hidden
    >
      <circle cx="32" cy="32" r="32" fill="#2A9A4A" />
      <circle cx="22" cy="16" r="16" fill="#ffffff" fillOpacity="0.18" />
      <path fill="#1F7A38" d="M8 64h48v-10c-7-8-14-11-24-11S15 46 8 54v10z" />
      <rect x="27" y="42" width="10" height="8" rx="3" fill="#E0B48E" />
      <ellipse cx="32" cy="31" rx="13.5" ry="14.5" fill="#F0C8A6" />
      <path fill="#6B4A38" d="M21 26c1-8 6-11 11-11s10 3 11 11c-2-3-6-5-11-5s-9 2-11 5z" />
      <path fill="#5A3C2E" d="M23 20c3-3 15-3 18 0-2-3-6-4.5-9-4.5S25 17 23 20z" />
      <path
        stroke="#F7F7F7"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        d="M17.5 33c0-10 6-15.5 14.5-15.5S46.5 23 46.5 33"
      />
      <rect x="12.5" y="28.5" width="8" height="13" rx="4" fill="#F7F7F7" />
      <rect x="43.5" y="28.5" width="8" height="13" rx="4" fill="#F7F7F7" />
      <rect x="14.5" y="31" width="4.2" height="8" rx="2.1" fill="#2A9A4A" fillOpacity="0.28" />
      <rect x="45.3" y="31" width="4.2" height="8" rx="2.1" fill="#2A9A4A" fillOpacity="0.28" />
      <path
        stroke="#F7F7F7"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        d="M48 37.5c-2.4 4-6.2 5.4-10 4.2"
      />
      <circle cx="37.5" cy="42" r="2" fill="#F7F7F7" />
      <circle cx="27" cy="31.5" r="1.45" fill="#3A2A22" />
      <circle cx="37" cy="31.5" r="1.45" fill="#3A2A22" />
      <path
        d="M28 36.8c2.1 1.5 5.9 1.5 8 0"
        stroke="#C07A58"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
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
          <LauncherAvatar />
        )}
      </button>
    </div>
  )
}
