import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
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
      <header className={'header' + (className ? ' ' + className : '')} style={style}>
        { this.props.children }
      </header>
    );
  }
}
