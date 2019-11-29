import React, { useEffect, useState, Fragment } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { USER } from './graphql/queries';
import { persistCache } from 'apollo-cache-persist';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink, concat } from 'apollo-link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/ui-molecules/Header';
import Dashboard from "./components/pages/Dashboard";
import NavBar from './components/ui-molecules/NavBar';
import LogInPage from './components/pages/LogInPage';
import { Route, Switch, withRouter } from 'react-router-dom'
import SignUpPage from './components/pages/SignUpPage'
import  RegisterProductPage from './components/pages/RegisterProductPage'
import AddCategoryPage from './components/pages/AddCategoryPage'
import AddSubCategoryPage from './components/pages/AddSubCategoryPage'
import EditCategoryPage from './components/pages/EditCategoryPage';
import HomePage from './components/pages/HomePage';
import ViewProductPage from './components/pages/ViewProductPage';
import CartPage from './components/pages/CartPage';
import CheckOutPage from './components/pages/CheckOutPage';
import OrderDetailsPage from './components/pages/OrderDetailsPage';
import VerifyUser from './components/pages/VerifyUser';
import EditProductPage from './components/pages/EditProductPage';
import CategoryPage from './components/pages/CategoryPage';
import Footer from './components/ui-molecules/Footer';
import SearchResultsPage from './components/pages/SearchResultsPage';


function App({ location: { pathname } }) {
  const [ client, setClient ] = useState(null)
  const [ displayFooterAndHeader, setDisplayFooterAndHeader ] = useState(true)
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
        },
        userCart: []
      };

      await persistCache({
        cache,
        storage: window.localStorage,
        key: 'shop-tight-cache'
      });

      const options = {
        uri: process.env.REACT_APP_API_URL || 'http://localhost:5000/graphql'
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

  useEffect(() => {
    setDisplayFooterAndHeader(!['/signup', '/login'].includes(pathname))
  }, [pathname])

  if(!client) {
    return <h5>....Loading</h5>
  }

  return (
    <ApolloProvider client={client} >
    <div className="App">
      { displayFooterAndHeader && 
        <Fragment>
          <Header/>
          <NavBar />
        </Fragment>
       }
      <ToastContainer autoClose={5000} draggable={true} position="bottom-left" />
      <main>
      <Switch>
      <Route path="/registerProduct" component={RegisterProductPage} />
      <Route path="/addCategory" component={AddCategoryPage} />
      <Route path="/categories/:url_key/edit" component={EditCategoryPage} />
      <Route path="/addSubCategory" component={AddSubCategoryPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/products/:urlKey/edit" component={EditProductPage} />
      <Route path="/products/:urlKey" component={ViewProductPage} />
      <Route path="/login" component={LogInPage} />
      <Route path="/orders/:id" component={OrderDetailsPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/categories/:urlKey" component={CategoryPage} />
      <Route path="/search" component={SearchResultsPage} />
      <Route path="/cart" component={CartPage} />
      < Route path="/verify" component={VerifyUser} />
      <Route path="/checkout" component={CheckOutPage} />
      <Route path="/" component={HomePage} exact />
      </Switch>
      </main>
      { displayFooterAndHeader && <Footer /> }
    </div>
    </ApolloProvider>
    
  );
}

export default withRouter(App);
