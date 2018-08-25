import React, { Component } from 'react';
import {withRouter} from 'react-router';
import Page from 'components/seedsui/Page/Page.jsx';
import Container from 'components/seedsui/Container/Container.jsx';
import Header from 'components/seedsui/Header/Header.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';

@withRouter
export default class Layout extends Component {
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="布局"/>
        </Header>
        <Container>
        </Container>
      </Page>
    );
  }
}
