import { useCallback, useEffect, useState } from 'react'
import { useChat } from '../../hooks/useChat'
import { useTheme } from '../../hooks/useTheme'
import { ChatLauncher } from './ChatLauncher'
import { ChatPanel } from './ChatPanel'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [hasClickedLauncher, setHasClickedLauncher] = useState(false)
  const [pulseKey, setPulseKey] = useState(0)
  const { theme, toggleTheme } = useTheme()
  const { messages, isTyping, sendMessage, ensureWelcome } = useChat()

  useEffect(() => {
    if (hasClickedLauncher) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const id = window.setInterval(() => {
      setPulseKey((k) => k + 1)
    }, 5000)

    return () => window.clearInterval(id)
  }, [hasClickedLauncher])

  const handleToggle = useCallback(() => {
    setHasClickedLauncher(true)
    setOpen((prev) => {
      const next = !prev
      if (next) ensureWelcome()
      return next
    })
  }, [ensureWelcome])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div className="chat-widget">
      <ChatPanel
        open={open}
        messages={messages}
        isTyping={isTyping}
        theme={theme}
        onToggleTheme={toggleTheme}
        onClose={handleClose}
        onSend={sendMessage}
      />
      <ChatLauncher
        open={open}
        onClick={handleToggle}
        showPulse={!hasClickedLauncher && !open}
        pulseKey={pulseKey}
      />
    </div>
  )
}
