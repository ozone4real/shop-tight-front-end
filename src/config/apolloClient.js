import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    'x-auth-token': localStorage.getItem('token')
  }
})

export default new ApolloClient({
  cache,
  link
})