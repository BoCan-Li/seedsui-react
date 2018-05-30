import React, { Component } from 'react';
import {withRouter} from 'react-router';
import Error from 'components/seedsui/Error/Error.jsx';

@withRouter
export default class Exception extends Component {
  render() {
    const {msg} = this.props.match.params;
    return (
      <Error caption={msg}/>
    );
  }
}
