import { PrismaClient } from '@prisma/client'
import { fastify } from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import { isDev, envs } from './utils'
import { router } from './routes'

const app = fastify({
  logger: { level: isDev() ? 'info' : 'warn' },
})

app.register(helmet)
app.register(cors, { credentials: true, origin: envs.CORS_HOST })
app.register(router)

const prisma = new PrismaClient()

export { app, prisma }
