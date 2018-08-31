import React from 'react';
import {Page, Header, Container, Alert, Titlebar} from '../lib';

const App = () => (
  <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      <Alert></Alert>
      <input type="search"/>
    </Container>
  </Page>
);

export default App;
