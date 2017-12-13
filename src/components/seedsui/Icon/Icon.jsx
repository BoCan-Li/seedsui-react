import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Icon extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    src: PropTypes.string
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { style, className, src } = this.props;
    return (
      <i className={'icon' + (className ? ' ' + className : '')} style={Object.assign({backgroundImage: 'url(' + src + ')', marginRight: '8px'}, style)}></i>
    );
  }
}
