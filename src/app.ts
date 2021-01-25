import { fastify } from 'fastify'
import { isDev } from './utils'

const app = fastify({
  logger: { level: isDev() ? 'info' : 'warn' },
})

app.get('/health', (_, res) => {
  res.status(200).send()
})

export { app }
