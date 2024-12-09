import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Pages from "@/pages";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Pages />
    </ApolloProvider>
  </StrictMode>,
);
