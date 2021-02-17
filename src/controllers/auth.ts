import { RouteHandlerMethod } from 'fastify'
import { logError } from '../helpers/errors'
import {
  comparePassword,
  createAccessToken,
  hashPassword,
  prisma,
} from '../helpers/utils'

export const signup: RouteHandlerMethod = async (req, res) => {
  try {
    let { name, email, password } = req.body as any

    password = await hashPassword(password)
    let { password: pass, ...user } = await prisma.user.create({
      data: { name, email, password },
    })

    res.send({ data: { user } })
  } catch (error) {
    res.status(400).send({ error: `User already exists!` })
    logError('signup', error)
  }
}

export const login: RouteHandlerMethod = async (req, res) => {
  try {
    let { email, password } = req.body as any

    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password' })
    }

    if (!(await comparePassword(password, user.password))) {
      return res.status(401).send({ error: 'Invalid email or password' })
    }

    let { password: pass, ...data } = user
    return res.send({
      data: { user: data, accessToken: await createAccessToken(data) },
    })
  } catch (error) {
    res.status(500).send({ error: 'Server error!' })
    logError('login', error)
  }
}
