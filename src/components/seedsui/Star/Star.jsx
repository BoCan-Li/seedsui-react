import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Star extends Component {
  static propTypes = {
    args: PropTypes.any,
    active: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
  };
  static defaultProps = {
    args: null
  }
  constructor(props) {
    super(props);
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
    if (this.props.onClick) {
      this.props.onClick(this.getArgs(e));
    }
  }
  render() {
    const {active, className, style} = this.props;
    return (
      <i className={`star${active ? ' active' : ''}${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}/>
    );
  }
}
