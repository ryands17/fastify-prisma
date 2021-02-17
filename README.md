# Fastify + Prisma

- A basic setup of a [Fastify](https://www.fastify.io/) app using [Prisma](https://www.prisma.io/) to interact with Postgres.

## Setup

- Rename `.env.example` to `.env` and replace the placeholder values in `DATABASE_URL` with the actual values of your database instance.

## Commands

- `yarn dev`

Runs the app in dev mode by default on [http://localhost:4000](http://localhost:4000).

## Todo

- [ ] Add migrations
- [ ] Refactor error handling
- [ ] Validate request body (zod)
- [ ] Add better logging in development
