import React, { Component } from 'react';
import Notice from 'components/seedsui/Notice/Notice.jsx';

export default class NotFound extends Component {
  render() {
    return (
      <Notice caption="找不到当前页面" iconClassName="icon-no-data"/>
    );
  }
}
