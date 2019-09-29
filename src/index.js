import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/styles/index.scss';
import './fontawesome';
import App from './App';
import{ client } from './config/apolloClient';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<ApolloProvider client={client} >
  <BrowserRouter><App /></BrowserRouter>
</ApolloProvider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
