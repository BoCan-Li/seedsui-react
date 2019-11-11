import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Stencil extends Component {
  static propTypes = {
  }
  static defaultProps = {
    className: 'stencil-list'
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {...others} = this.props;
    return createPortal(
      <div ref={el => {this.$el = el;}} {...others} className={`stencil${others.className ? ' ' + others.className : ''}`}>
      </div>,
      this.props.portal || document.getElementById('root') || document.body
    );
  }
}
