import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Posts } from "@/pages/Posts.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage.tsx";
import { Post } from "@/pages/Post.tsx";
import "../index.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/post/:postId",
    element: <Post />,
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <ToastContainer />
    </ApolloProvider>
  </StrictMode>,
);
