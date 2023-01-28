import { Hono } from 'hono';
import { graphqlServer } from '@honojs/graphql-server';
import { buildSchema } from 'graphql/utilities/buildASTSchema.js';
import playgroundHTML from './utils/playground';

export const app = new Hono();

const schema = buildSchema(
  Bun.readFile("./src/schema.graphql")
);

const rootResolver = (ctx) => {
  return {
    hello: () => 'Hello Hono!',
  }
}

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
    rootResolver,
  })
);


const port = process.env.PORT || 3000;

console.log(`Hono 🥟 GraphQL Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};