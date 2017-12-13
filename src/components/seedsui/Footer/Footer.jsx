import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Footer extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { style, className } = this.props;
    return (
      <footer className={'footer' + (className ? ' ' + className : '')} style={style}>
        { this.props.children }
      </footer>
    );
  }
}
