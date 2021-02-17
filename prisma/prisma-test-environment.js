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
    // Run the migrations to ensure our schema has the required structure
    await exec(`yarn prisma db push --preview-feature`)
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
