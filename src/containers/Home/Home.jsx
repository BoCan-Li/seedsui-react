import React, { Component } from 'react'
import Page from 'components/seedsui/Page/Page.jsx';
import Header from 'components/seedsui/Page/Header.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import Container from 'components/seedsui/Page/Container.jsx';

export default class Home extends Component {
  render() {
    return (
      <Page>
        <Header>
          <Titlebar title="首页"/>
        </Header>
        <Container>
          <ul>
            <li><a href="/">Home主页</a></li>
            <li><a href="/about/带参数">About带参数</a></li>
            <li><a href="/routechildren">Children子路由</a></li>
            <li><a href="/counter">Redux</a></li>
          </ul>
        </Container>
      </Page>
    )
  }
}
