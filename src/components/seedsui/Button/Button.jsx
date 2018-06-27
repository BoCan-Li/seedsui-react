import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    args: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,

    children: PropTypes.node,
  }
  static defaultProps = {
    args: null
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event')) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onClick = (e) => {
    if (this.props.onClick) this.props.onClick(this.getArgs(e));
  }
  render() {
    const {
      className, style, disabled,
      children
    } = this.props;
    return (
      <a ref={el => {this.$el = el;}} className={'button' + (className ? ' ' + className : '')} disabled={disabled} style={style} onClick={this.onClick}>
        {children}
      </a>
    );
  }
}
