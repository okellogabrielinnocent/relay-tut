import React from 'react';
import logo from './logo.svg';
import './App.css';
import fetchGraphQl from './fetchGraphQL';
import { graphql } from 'babel-plugin-relay/macro';
import { RelayEnvironmentProvider, loadQuery, usePreloadedQuery } from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';


const { Suspense } = React;

const RespositoryNameQuery = graphql`
  query AppRepositoryNameQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RespositoryNameQuery, {

});
function App(props) {
  const data = usePreloadedQuery(RespositoryNameQuery, props.preloadedQuery);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data.repository.name}
        </p>
      </header>
    </div>
  );
}

function AppRoot(props) {
  <RelayEnvironmentProvider enviroment={RelayEnvironment}>
    <Suspense fallback={<div>Loading...</div>}>
      <App preloadedQuery={preloadedQuery} />
    </Suspense>
  </RelayEnvironmentProvider>
}

export default AppRoot;