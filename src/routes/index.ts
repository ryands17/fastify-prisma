import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { renderRoutes } from './routes'

export const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  opts,
  next
) => {
  for (let route of renderRoutes) {
    fastify.route(route)
  }
  next()
}
