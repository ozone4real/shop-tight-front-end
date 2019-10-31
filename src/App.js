import React, { useEffect, useState, Fragment } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { USER } from './graphql/queries';
import { persistCache } from 'apollo-cache-persist';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink, concat } from 'apollo-link';
// import './App.css';
import Header from './components/ui-molecules/Header';
import NavBar from './components/ui-molecules/NavBar';
import LogInPage from './components/pages/LogInPage';
import { Route, Switch } from 'react-router-dom'
import SignUpPage from './components/pages/SignUpPage'
import  RegisterProductPage from './components/pages/RegisterProductPage'
import AddCategoryPage from './components/pages/AddCategoryPage'
import AddSubCategoryPage from './components/pages/AddSubCategoryPage'
import EditCategoryPage from './components/pages/EditCategoryPage';
import HomePage from './components/pages/HomePage';
import ViewProductPage from './components/pages/ViewProductPage';


function App() {
  const [ client, setClient ] = useState(null)
  useEffect(() => {
    // setInterval(() => localStorage.clear(), 5000 )
    const initializeClient = async () => {
      const cache = new InMemoryCache();
      const data = {
        user: {
          isLoggedIn: false,
          verified: false,
          isAdmin: false,
          firstName: null,
          __typename: 'User'    
        }
      };

      await persistCache({
        cache,
        storage: window.localStorage,
        key: 'shop-tight-cache'
      });

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
      
      const client = new ApolloClient({
        cache,
        link: concat(authMiddleware, link),
        resolvers: {
          User: {
            isLoggedIn: () => !!localStorage.getItem('token')
          }
        }
      });

      try {
        cache.readQuery({query: USER})
      } catch(e) {
        cache.writeData({ data })
      }

      client.onResetStore(() => cache.writeData({data}))

      setClient(client)
    }
    initializeClient()
  }, [])

  console.log(client)
  if(!client) {
    return <h5>....Loading</h5>
  }
  return (
    <ApolloProvider client={client} >
    <div className="App">
      <Header/>
      <NavBar />
      <Switch>
      <Route path="/registerProduct" component={RegisterProductPage} />
      <Route path="/addCategory" component={AddCategoryPage} />
      <Route path="/categories/:url_key/edit" component={EditCategoryPage} />
      <Route path="/addSubCategory" component={AddSubCategoryPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/products/:urlKey" component={ViewProductPage} />
      <Route path="/login" component={LogInPage} />
      <Route path="/" component={HomePage} exact />
      </Switch>
    </div>
    </ApolloProvider>
    
  );
}

export default App;
