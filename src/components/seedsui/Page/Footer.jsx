import React, { Component, PropTypes } from 'react';

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
