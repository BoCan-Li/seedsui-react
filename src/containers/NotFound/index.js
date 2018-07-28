import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notice from 'components/seedsui/Notice/Notice.jsx';

export default class NotFound extends Component {
  static propTypes = {
    caption: PropTypes.string
  }
  static defaultProps = {
    caption: '找不到当前页面'
  }
  render() {
    const {caption} = this.props;
    return (
      <Notice caption={caption} iconClassName="notice-icon-nodata"/>
    );
  }
}