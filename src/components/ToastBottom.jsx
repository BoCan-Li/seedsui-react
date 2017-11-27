import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toast from 'components/seedsui/Toast/Toast.jsx';

export default class ToastBottom extends Component {
  static propTypes = {
    show: PropTypes.bool,
    text: PropTypes.string
  };


  render() {
    const { show, text } = this.props;
    return (
      <Toast type="bottom" show={show} mask={false} text={text} style={{borderRadius: '4px'}}/>
    );
  }
}
