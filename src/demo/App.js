import React, { Component } from 'react';
import {Page, Header, Titlebar, Container} from './../lib';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }
  render() {
    return (
      <Page ref={(el) => {this.$page = el}}>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
          <div className="step-box">
            <div className="step outline-active">
              <div className="step-icon"><i className="icon-ok-fill"></i></div>
              <div className="step-caption">发送授权书</div>
            </div>
            <div className="step active">
              <div className="step-icon">2</div>
              <div className="step-caption">法人授权</div>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <div className="step-caption">认证通过</div>
            </div>
            <hr className="step-line"></hr>
          </div>
        </Container>
      </Page>
    );
  }
}

export default App;
