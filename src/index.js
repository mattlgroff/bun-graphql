import { Hono } from 'hono';
import { graphqlServer } from '@honojs/graphql-server';
import { buildSchema } from 'graphql/utilities/buildASTSchema.js';
import playgroundHTML from './utils/playground';

// Initialize Hono
export const app = new Hono();

// Builds schema from a .graphql file
const schema = buildSchema(
  Bun.readFile("./src/schema.graphql")
);

// Resolvers
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

// Set the default port to 3000, or use the PORT environment variable
const port = process.env.PORT || 3000;

console.log(`Hono 🥟 GraphQL Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};