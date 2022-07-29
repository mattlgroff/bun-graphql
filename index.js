import { Hono } from 'hono'
import { graphqlServer } from '@honojs/graphql-server'
import { buildSchema } from 'graphql'

export const app = new Hono()

const schema = buildSchema(`
type Query {
  hello: String
}
`)

const rootValue = {
  hello: () => 'Hello Hono!',
}


app.post(
  '/graphql',
  graphqlServer({
    schema,
    rootValue,
  })
)

app.get('/', (c) => c.text('Please use /graphql'))

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
}