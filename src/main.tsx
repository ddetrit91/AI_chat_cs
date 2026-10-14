import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const storedTheme = localStorage.getItem('ai-chat-theme')
document.documentElement.setAttribute(
  'data-theme',
  storedTheme === 'dark' ? 'dark' : 'light',
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
