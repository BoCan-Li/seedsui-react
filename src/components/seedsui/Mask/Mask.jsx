import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Mask extends Component {
  static propTypes = {
    classsName: PropTypes.string,
    show: PropTypes.bool,
    style: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { classsName, show, style, onClick, children } = this.props;
    return (
      <div className={'mask' + (classsName ? ' ' + classsName : '') + (show ? ' active' : '')} style={style} onClick={onClick}>
        {children && children}
      </div>
    );
  }
}
