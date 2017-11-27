import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toast from 'components/seedsui/Toast/Toast.jsx';
import right from './right.png';

export default class ToastMiddle extends Component {
  static propTypes = {
    show: PropTypes.bool,
    text: PropTypes.string
  };
  static defaultProps = {
    show: true
  }

  render() {
    const { show, text } = this.props;
    return (
      <Toast type="middle" show={show} mask text={text} img={right} style={{borderRadius: '8px'}}/>
    );
  }
}
