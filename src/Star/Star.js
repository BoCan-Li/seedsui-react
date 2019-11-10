import React, { Component } from 'react';

export default class Star extends Component {
  static propTypes = {
  };
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      ...others
    } = this.props;
    return (
      <i {...others} className={`star${others.className ? ' ' + others.className : ''}`}/>
    );
  }
}
