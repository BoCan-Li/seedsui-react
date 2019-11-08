import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Stencil extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
  }
  static defaultProps = {
    className: 'stencil-list'
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {className, ...others} = this.props;
    return createPortal(
      <div ref={el => {this.$el = el;}} className={`stencil${className ? ' ' + className : ''}`} {...others}>
      </div>,
      this.props.portal || document.getElementById('root') || document.body
    );
  }
}
