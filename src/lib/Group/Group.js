import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Group extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  }
  static defaultProps = {
    className: 'border-tb'
  }
  constructor(props) {
    super(props);
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
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
    const {children, style, className, onClick, ...others} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={'group' + (className ? ' ' + className : '')} style={style} onClick={this.onClick} {...others}>
        {children}
      </div>
    );
  }
}
