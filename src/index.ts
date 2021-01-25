import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import { app } from './app'
import { envs } from './utils'

const start = async () => {
  app.register(helmet)
  app.register(cors, { credentials: true, origin: envs.CORS_HOST })
  await app.listen(envs.PORT)
  app.log.info(`app running on ${envs.HOST}:${envs.PORT}/`)
}

start()
