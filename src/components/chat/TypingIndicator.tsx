export function TypingIndicator() {
  return (
    <div className="chat-typing" aria-live="polite" aria-label="Агент печатает">
      <span className="chat-typing__dot" />
      <span className="chat-typing__dot" />
      <span className="chat-typing__dot" />
    </div>
  )
}
