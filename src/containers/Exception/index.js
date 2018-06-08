import React, { Component } from 'react';
import {withRouter} from 'react-router';
import Notice from 'components/seedsui/Notice/Notice.jsx';

@withRouter
export default class Exception extends Component {
  render() {
    const {msg} = this.props.match.params;
    return (
      <Notice caption={msg} iconClassName="notice-icon-error"/>
    );
  }
}
