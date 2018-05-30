import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notice from 'components/seedsui/Notice/Notice.jsx';

export default class Error extends Component {
  static propTypes = {
    caption: PropTypes.string
  }
  static defaultProps = {
    caption: '错误信息面板'
  }
  render() {
    const {caption} = this.props;
    return (
      <Notice caption={caption} iconClassName="notice-icon-error"/>
    );
  }
}
