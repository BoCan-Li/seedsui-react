import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  static propTypes = {
    args: PropTypes.any,

    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  }
  constructor(props) {
    super(props);
  }
  onClick = (e) => {
    if (this.props.onClick) this.props.onClick(Object.getArgs(e, this.props.args));
  }
  render() {
    const {args, children, className, onClick, ...others} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={'card' + (className ? ' ' + className : '')} onClick={this.onClick} {...others}>
        {children}
      </div>
    );
  }
}
