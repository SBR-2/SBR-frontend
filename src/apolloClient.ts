import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createHttpLink } from "@apollo/client/link/http";
import { setContext } from "@apollo/client/link/context";

// Obtener variable de entorno o endpoint default
const apiUrl =
  import.meta.env.VITE_GRAPHQL_API_URL || "https://localhost:7289/graphql/";

const httpLink = createHttpLink({
  uri: apiUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
