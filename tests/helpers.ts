import { app } from '../src/app'
import { prisma } from '../src/helpers/utils'

beforeAll(async () => {
  return app.ready()
})

afterAll(async () => {
  await app.close()
  return prisma.$disconnect()
})

export { app }
