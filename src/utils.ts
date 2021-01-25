export const isDev = () => process.env.NODE_ENV === 'development'

export const envs = {
  PORT: process.env.PORT || 4000,
  HOST: process.env.HOST || 'http://localhost',
  CORS_HOST: process.env.CORS_HOST || 'http://localhost:3000/',
}
