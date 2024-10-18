import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";


// Obtener variable de entorno o endpoint default
const apiUrl = import.meta.env.VITE_GRAPHQL_API_URL || 'http://localhost:5274/graphql';

const uploadLink = createUploadLink({
    uri: apiUrl,
    headers: {
      'GraphQL-preflight': '1'
    }
  })
  
  // Mantener la configuración de autenticación
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'GraphQL-preflight': '1'
      }
    }
  })
  
  // Crear el cliente Apollo con la nueva configuración
  const apolloClient = new ApolloClient({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      mutate: {
        errorPolicy: 'all'
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }
  })
  
export default apolloClient;
