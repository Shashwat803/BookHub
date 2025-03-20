import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/typeDef";
import resolvers from "./graphql/resolvers";
import sequelize from "./configs/db";
import express, { Application } from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";
import cors from "cors";
import bodyParser from "body-parser";
require('dotenv').config()

async function startServer(): Promise<void> {
  const app: Application = express();

  app.use(graphqlUploadExpress() as any);

  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/uploads", express.static("public/uploads"));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server) as any);

  try {
    await sequelize.authenticate();
    console.log("Database Connected");
    await sequelize.sync({ alter: false });

    const PORT: number = 9000;
    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error(" Database Connection Error:", error);
  }
}

startServer();
