require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { DataSource } from "typeorm";
import { createServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";

import refreshTokenRouter from "./Routes/refreshTokenRouter";
import { Context } from "./Context/Context";
import path from "path";
const { graphqlUploadExpress } = require('graphql-upload-ts');

const MysqlDataSource = new DataSource({
  type: "mysql",
  port: 3306,
  host: process.env.NODE_ENV === "development" ? process.env.DEV_SERVER : process.env.PROD_SERVER,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  synchronize: true,
  entities: [__dirname + "/entity/*{.js,.ts}"],

});

const main = async () => {
  MysqlDataSource.initialize()
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const app = express();
  app.use(express.static(path.resolve(__dirname, "../../client/dist")));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/refresh_token", refreshTokenRouter);

  app.use(
    "/images/products/",
    express.static(path.join(__dirname, "images/products"))
  );

  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      //import multiple resolvers
      resolvers: [`${__dirname}/Resolvers/*.{ts,js}`],
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    context: ({ req, res }): Context => <Context>({
      req,
      res,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:5173",
        "http://110.235.249.118:5173",
        "http://110.235.249.118:4000",
      ],
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;

  await new Promise((resolve) =>
    httpServer.listen({ port: PORT }, resolve as () => void)
  );

  // Typically, http://localhost:4000/graphql
  console.log(
    `SERVER STARTED In ${process.env.NODE_ENV} Mode, And PORT ${PORT}`
  );
};

main().catch((err) => {
  console.log(err);
});
