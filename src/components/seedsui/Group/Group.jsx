import React, { Component, PropTypes } from 'react';

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { children, style, className } = this.props;
    return (
      <div className={'group' + (className ? ' ' + className : '')} style={style}>
        {children}
      </div>
    );
  }
}
