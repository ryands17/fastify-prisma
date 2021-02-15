import { RouteOptions } from 'fastify'
type RouteConfig = Record<string, RouteOptions>

const routes: RouteConfig = {
  healthCheck: {
    method: 'GET',
    url: '/health',
    handler: (_, res) => {
      res.status(200).send()
    },
  },
}

export const renderRoutes = Object.values(routes)
