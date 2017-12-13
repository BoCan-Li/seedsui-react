import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class InputBox extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    left: PropTypes.node,
    leftStyle: PropTypes.object,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { style, className, left, leftStyle, children } = this.props;
    let dom = null;
    if (left) {
      dom = (<div className={'inputbox' + (className ? ' ' + className : '')} style={style}>
        <label className="inputbox-left" style={leftStyle}>{left}</label>
        <div className="inputbox-right inputbox">
          {children}
        </div>
      </div>);
    } else {
      dom = (<div className={'inputbox' + (className ? ' ' + className : className)} style={style}>
        {children}
      </div>);
    }
    return dom;
  }
}
