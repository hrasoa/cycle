import * as React from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { myTheme } from '../theme';
import { Layout } from '../components/Layout';
import { sideNavCollapsed } from '../cache';

const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: 'http://localhost:3000/api/graphql',
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          sideNavCollapsed: {
            read() {
              return sideNavCollapsed();
            },
          },
        },
      },
    },
  }),
});

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;  
    margin: 0;
    padding: 0;
  }

  html, body, #__next {
    height: 100%;
  }

  body {
    color: ${(props) => props.theme.colors.TextPrimary};
    font-family: ${(props) => props.theme.fonts.Body};
    font-size: ${(props) => props.theme.fontSizes.Body};
    line-height: ${(props) => props.theme.lineHeights['24x']};
  }

  button {
    border: none;
    background: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={myTheme}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
