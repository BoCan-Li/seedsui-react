import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {style, className, children, ...others} = this.props;
    return (
      <header ref={el => {this.$el = el;}} className={'header' + (className ? ' ' + className : '')} style={style} {...others}>
        {children}
      </header>
    );
  }
}
