// @ts-check
const util = require('util')
const { PrismaClient } = require('@prisma/client')
const NodeEnvironment = require('jest-environment-node')
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require('unique-names-generator')
const exec = util.promisify(require('child_process').exec)

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    // Generate a unique sqlite identifier for this test context
    this.schema = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      style: 'lowerCase',
    })
    this.client = new PrismaClient()
    let url = `postgresql://postgres:password@localhost:5432/prisma?schema=${this.schema}`
    process.env.DATABASE_URL = url
    this.global.process.env.DATABASE_URL = url
  }

  async setup() {
    // Push the state from your Prisma schema to your database (create tables & columns)
    await exec(`yarn prisma db push --preview-feature`)
    
    // While `prisma db push` is great for prototyping it doesn't record the history of your migrations
    // See https://www.prisma.io/docs/reference/api-reference/command-reference#db-push
    // For migrations history use `prisma migrate`, see https://www.prisma.io/docs/concepts/components/prisma-migrate
    // After running `prisma migrate dev --preview-feature`, comment the previous `db push` command and uncomment the following line 
    // await exec(`yarn prisma migrate deploy --preview-feature`)
    
    return super.setup()
  }

  async teardown() {
    await this.client.$executeRaw(
      `drop schema if exists "${this.schema}" cascade`
    )
    await this.client.$disconnect()
  }
}

module.exports = PrismaTestEnvironment
