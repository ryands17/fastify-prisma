import { app, prisma } from '../src/app'

beforeAll(async done => {
  await app.ready()
  done()
})

afterAll(async done => {
  await prisma.$disconnect()
  await app.close()
  done()
})

export { app }
