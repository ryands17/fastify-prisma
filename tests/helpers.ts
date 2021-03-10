import { app } from '../src/app'
import { prisma } from '../src/helpers/utils'

beforeAll(async done => {
  await app.ready()
  done()
})

afterAll(async done => {
  await app.close()
  await prisma.$disconnect()
  done()
})

export { app }
