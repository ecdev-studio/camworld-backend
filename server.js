const { createServer } = require("http");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const cors = require('cors');

(async () => {
  const contextMiddleware = require('./utils/contextMiddleware')
  const PORT = process.env.PORT ? process.env.PORT : 5559;
  const app = express();
  require('express-ws')(app);
  app.use(cors())
  require('./models/Associations');
  const httpServer = createServer(app);

  const resolvers = require('./graphql/resolver/rootResolver')
  const typeDefs = require('./graphql/schema')


  const schema = makeExecutableSchema({ typeDefs, resolvers });

  app.get('/', (req, res) => {
    res.status(200).send('API is running....');
  })

  const server = new ApolloServer({
    schema,
    context: contextMiddleware,
    playground: true,
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });

})();
