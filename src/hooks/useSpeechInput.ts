import { useCallback, useEffect, useRef, useState } from 'react'

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
}

export function useSpeechInput(
  onTranscript: (text: string, isFinal: boolean) => void,
  enabled: boolean,
) {
  const Recognition = getSpeechRecognition()
  const supported = Boolean(Recognition)
  const [listening, setListening] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const onTranscriptRef = useRef(onTranscript)
  const wantListenRef = useRef(false)

  onTranscriptRef.current = onTranscript

  const stop = useCallback(() => {
    wantListenRef.current = false
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  useEffect(() => {
    if (!enabled) stop()
  }, [enabled, stop])

  useEffect(() => {
    return () => {
      wantListenRef.current = false
      recognitionRef.current?.abort()
    }
  }, [])

  const start = useCallback(() => {
    if (!Recognition) {
      setError('Голосовой ввод не поддерживается в этом браузере. Попробуйте Chrome или Edge.')
      return
    }

    setError(null)
    recognitionRef.current?.abort()

    const recognition = new Recognition()
    recognition.lang = 'ru-RU'
    recognition.continuous = true
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognitionRef.current = recognition
    wantListenRef.current = true

    recognition.onresult = (event) => {
      let interim = ''
      let finalText = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const piece = event.results[i][0]?.transcript ?? ''
        if (event.results[i].isFinal) finalText += piece
        else interim += piece
      }
      if (finalText.trim()) onTranscriptRef.current(finalText.trim(), true)
      else if (interim.trim()) onTranscriptRef.current(interim.trim(), false)
    }

    recognition.onerror = (event) => {
      if (event.error === 'aborted' || event.error === 'no-speech') return
      if (event.error === 'not-allowed') {
        setError('Нужен доступ к микрофону в настройках браузера.')
      } else {
        setError('Не удалось распознать речь. Попробуйте ещё раз.')
      }
      wantListenRef.current = false
      setListening(false)
    }

    recognition.onend = () => {
      if (wantListenRef.current && recognitionRef.current === recognition) {
        try {
          recognition.start()
          return
        } catch {
          wantListenRef.current = false
        }
      }
      setListening(false)
    }

    try {
      recognition.start()
      setListening(true)
    } catch {
      setError('Не удалось запустить микрофон.')
      wantListenRef.current = false
      setListening(false)
    }
  }, [Recognition])

  const toggle = useCallback(() => {
    if (listening) stop()
    else start()
  }, [listening, start, stop])

  return { supported, listening, error, toggle, stop }
}
