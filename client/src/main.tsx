import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import AuthContextProvider from "./context/AuthContext";
import JWTManager from "./utils/jwt";
import { toastify } from "./utils/toastify.tsx";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      toastify(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        2000,
        "error"
      );
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from JWTManager if it exists
  const token = JWTManager.getAccessToken();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
})


const client = new ApolloClient({
  link: from([errorLink, authLink, uploadLink]),
  //link: uploadLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ApolloProvider>
);

postMessage({ payload: "removeLoading" }, "*");
