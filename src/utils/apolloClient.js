import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const createApolloClient = () =>
  new ApolloClient({
    link: new HttpLink({ uri: 'http://192.168.1.64:4000/graphql' }),
    cache: new InMemoryCache(),
  });

export default createApolloClient;
