import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import { resolvers } from "./resolver.js";
import mongoose from "mongoose";


const app=express()


async function initServer() {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  const MONGO_URI = 'mongodb://localhost:27017/graph-todo';

  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
  app.use((req, res) => {
    res.send("Server started successfully");
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

initServer();
