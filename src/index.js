import { Hono } from 'hono';
import { graphqlServer } from '@honojs/graphql-server';
import { buildSchema } from 'graphql/utilities/buildASTSchema.js';
import playgroundHTML from './utils/playground';

export const app = new Hono();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootValue = {
  hello: () => 'Hello Hono!',
};

// Adds GraphQL Playground to baseEndpoint
app.get('/', () => {
  return new Response(playgroundHTML('/graphql'), {
    headers: {
      'Content-Type': 'text/html'
    }
  })
});

// Hono.js GraphQL Server
app.use(
  '/graphql',
  graphqlServer({
    schema,
    rootValue,
  })
);


const port = process.env.PORT || 3000;

console.log(`🥟 Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};