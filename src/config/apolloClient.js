import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import { persistCache } from 'apollo-cache-persist';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink, concat } from 'apollo-link';

const cache = new InMemoryCache();


(async function () {
  await persistCache({
    cache,
    storage: window.localStorage,
  });
}())
 
// const USER = gql`
//     query {
//       user @client {
//         isLoggedIn,
//         data
//       }
//     }
//   `

const options = {
  uri: 'http://localhost:5000/graphql'
}
const httpLink = new HttpLink(options)

const link = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(options),
  httpLink
)

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  })
  return forward(operation);
});




export const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, link),
  resolvers: {
    User: {
      isLoggedIn: () => !!localStorage.getItem('token')
    }
  }
})

const data = {
  user: {
    isLoggedIn: false,
    verified: false,
    isAdmin: false,
    firstName: null,
    __typename: 'User'    
  }
}

cache.writeData({data: {isLoggedIn: !!localStorage.getItem('token')}})


client.onResetStore(() => cache.writeData({ data }))