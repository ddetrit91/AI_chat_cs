import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getHealthPayload } from '../server/handlers.js'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (_req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
  if (_req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  res.status(200).json(getHealthPayload())
}
