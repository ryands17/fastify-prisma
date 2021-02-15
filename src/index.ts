import { app } from './app'
import { envs } from './utils'

const start = async () => {
  await app.listen(envs.PORT)
  app.log.info(`app running on ${envs.HOST}:${envs.PORT}/`)
}

start()
