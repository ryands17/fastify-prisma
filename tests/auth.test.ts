import supertest from 'supertest'
import { app } from './helpers'

test('signup', async () => {
  const users = await supertest(app.server)
    .post('/signup')
    .send({
      email: 'user@g.com',
      password: 'password',
      name: 'User',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  expect(users.body).toHaveProperty('data.user')
  expect(users.body.data.user).toEqual({
    id: 1,
    email: 'user@g.com',
    name: 'User',
  })
})

test('login', async () => {
  const res = await supertest(app.server)
    .post('/login')
    .send({
      email: 'user@g.com',
      password: 'password',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  expect(res.body).toHaveProperty('data.user')
  expect(res.body).toHaveProperty('data.accessToken')
})
