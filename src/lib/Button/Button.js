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
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  onClick = (e) => {
    if (this.props.onClick) this.props.onClick(Object.getArgs(e, this.props.args));
  }
  render() {
    const {
      args,
      className, style, disabled,
      children,
      onClick,
      ...others
    } = this.props;
    return (
      <a ref={el => {this.$el = el;}} className={'button' + (className ? ' ' + className : '')} disabled={disabled} style={style} onClick={this.onClick} {...others}>
        {children}
      </a>
    );
  }
}
