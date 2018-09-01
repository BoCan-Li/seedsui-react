import React from 'react';
import {Page, Header, Container, Alert, Titlebar, Progress} from '../lib';

const App = () => (
  <Page>
    <Header>
      <Titlebar caption="SeedsUI"/>
    </Header>
    <Container>
      <Alert></Alert>
      <Progress percentage={50}/>
    </Container>
  </Page>
);

export default App;
