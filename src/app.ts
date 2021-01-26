import { PrismaClient } from '@prisma/client'
import { fastify } from 'fastify'
import { isDev } from './utils'

const app = fastify({
  logger: { level: isDev() ? 'info' : 'warn' },
})

const prisma = new PrismaClient()

app.get('/health', (_, res) => {
  res.status(200).send()
})

app.get('/user', async (_, res) => {
  try {
    res.send({ data: { users: await prisma.user.findMany() } })
  } catch (e) {
    console.log('/user', e)
    res.status(500).send({ error: 'Failed to fetch users' })
  }
})

export { app }
