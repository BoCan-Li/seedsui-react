import React, { Component } from 'react';
import {withRouter} from 'react-router'
import logo from './logo.svg';
import './About.css';
@withRouter
class About extends Component {
  onClickBack = () => {
    // const { match, location, history } = this.props
    const {history} = this.props;
    history.goBack();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={this.onClickBack}>返回</button>
        </p>
      </div>
    );
  }
}

export default About;
