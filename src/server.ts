import { connect } from 'mongoose';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers } from '../graphql/resolvers.js';
import { readFileSync } from 'fs';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';

const typeDefs = readFileSync('./graphql/schema.graphql', {
  encoding: 'utf-8',
});

const server = new ApolloServer({
  typeDefs: [typeDefs, DIRECTIVES],
  resolvers,
});

await server.start();

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  'mongodb+srv://ThisIsForSchool:lSaFPLvHIk2bPCCz@cluster0.mtqaf6e.mongodb.net/test?retryWrites=true&w=majority';

const app = express();

app.use(
  '/',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server)
);
app.use(cors({ origin: '*', credentials: true }));
console.log('test');
try {
  const mongoConnect = async () => {
    await connect(MONGODB_URI);
  };

  mongoConnect();

  // app.use(express.json());

  // app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  await new Promise<void>((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`Server ready at http://localhost:${PORT}/`);
} catch (err) {
  console.error(err);
}
