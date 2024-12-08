// npm install @apollo/server express graphql cors
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import * as fs from "node:fs";
import {resolvers} from "./graphql/resolvers/resolvers";

interface MyContext {
    token?: string;
}

const app = express();
const port = process.env.PORT || 4000;
const httpServer = http.createServer(app);
const typeDefs = fs.readFileSync("./src/graphql/schema.graphql", {
    encoding: "utf-8",
})


const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
});
// // Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    "/",
    cors<cors.CorsRequest>(),
    express.json(),
    express.urlencoded({extended: true})
);

app.use("/graphql", expressMiddleware(server));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});


// Modified server startup
await new Promise<void>((resolve) =>
    httpServer.listen({port: 4000}, resolve)
);

console.log(`🚀 Express Server ready at http://localhost:${port}}/`);
console.log(`🚀 GraphQL Server ready at http://localhost:${port}/graphql`);