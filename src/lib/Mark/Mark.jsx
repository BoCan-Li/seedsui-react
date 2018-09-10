import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Mark extends Component {
  static propTypes = {
    className: PropTypes.string, // info/success/cancel/warn/disable/primary
    style: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.node,
  }
  static defaultProps = {
    className: 'info'
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { className, style, children, onClick } = this.props;
    return (
      children ? <span ref={el => {this.$el = el;}} className={`mark ${className}`} style={style} onClick={onClick}>{children}</span> : null
    );
  }
}
