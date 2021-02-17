import { PrismaClient } from '@prisma/client'
import { compare, genSaltSync, hash } from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export const isDev = () => process.env.NODE_ENV === 'development'

export const envs = {
  PORT: process.env.PORT || 4000,
  HOST: process.env.HOST || 'http://localhost',
  CORS_HOST: process.env.CORS_HOST || 'http://localhost:3000/',
  JWT_SECRET: process.env.JWT_SECRET || 'secret123',
}

export const prisma = new PrismaClient()

export const hashPassword = (password: string) => {
  let salt = genSaltSync(10)
  return new Promise<string>(res => {
    hash(password, salt, (err, saltedPassword) => {
      res(saltedPassword)
    })
  })
}

export const comparePassword = (password: string, hashedPassword: string) => {
  return new Promise<boolean>(res => {
    compare(password, hashedPassword, (err, same) => {
      if (err) res(false)
      else res(same)
    })
  })
}

export const createAccessToken = (data: any) => {
  return new Promise<string | undefined>((res, rej) => {
    jwt.sign(data, envs.JWT_SECRET, {}, (err, token) => {
      if (err) rej(err)
      res(token)
    })
  })
}

export const verifyToken = (token: string | undefined) => {
  return new Promise((res, rej) => {
    if (!token) {
      rej('invalid token')
      return
    }

    jwt.verify(token, envs.JWT_SECRET, {}, (err, decoded) => {
      if (err) {
        rej('invalid token')
        return
      }
      res(decoded)
    })
  })
}
