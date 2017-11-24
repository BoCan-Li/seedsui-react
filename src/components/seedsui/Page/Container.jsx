import React, { Component, PropTypes } from 'react';

export default class Container extends Component {
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
      <article className={'container' + (className ? ' ' + className : '')} style={style}>
        { this.props.children }
      </article>
    );
  }
}
