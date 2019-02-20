import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Star extends Component {
  static propTypes = {
    args: PropTypes.any,
    className: PropTypes.string,
    onClick: PropTypes.func
  };
  static defaultProps = {
    args: null
  }
  constructor(props) {
    super(props);
  }
  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(Object.getArgs(e, this.props.args));
    }
  }
  render() {
    const {args, className, onClick, ...others} = this.props;
    return (
      <i className={`star${className ? ' ' + className : ''}`} {...others} onClick={this.onClick}/>
    );
  }
}
