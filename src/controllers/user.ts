import { RouteHandlerMethod } from 'fastify'
import { prisma } from '../helpers/utils'

export const getAllUsers: RouteHandlerMethod = async (req, res) => {
  try {
    let users = await prisma.user.findMany({
      select: { name: true, email: true },
    })
    return res.send({ data: { users } })
  } catch (error) {
    console.error('users', error)
    res.status(500).send({ error: `Cannot fetch users` })
  }
}
