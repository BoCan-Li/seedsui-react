import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Group extends Component {
  static propTypes = {
    args: PropTypes.any,

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
  onClick = (e) => {
    if (this.props.onClick) this.props.onClick(Object.getArgs(e, this.props.args));
  }
  render() {
    const {args, children, style, className, onClick, ...others} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={'group' + (className ? ' ' + className : '')} style={style} onClick={this.onClick} {...others}>
        {children}
      </div>
    );
  }
}
