import cors from 'cors'
import express from 'express'
import { getHealthPayload, handleChatBody } from './handlers.js'
import './env.js'

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(cors({ origin: true }))
app.use(express.json({ limit: '64kb' }))

app.get('/api/health', (_req, res) => {
  res.json(getHealthPayload())
})

app.post('/api/chat', async (req, res) => {
  const result = await handleChatBody(req.body)
  res.status(result.status).json(result.data)
})

app.listen(port, () => {
  console.log(`API: http://localhost:${port}`)
})
