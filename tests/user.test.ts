import supertest from 'supertest'
import { app } from './helpers'

test('list users', async () => {
  const users = await supertest(app.server)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect(200)

  expect(users.body).toHaveProperty('data.users')
  expect(users.body.data.users).toHaveLength(2)
})
