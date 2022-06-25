import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/App'
import { ApolloProvider, ApolloClient, createHttpLink } from '@apollo/client'
import cache from './cache'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:5000/graphql'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    } 
  }
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink)
})


ReactDOM.render(
  <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);