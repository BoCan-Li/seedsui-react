import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Group extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {children, style, className, onClick} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={'group' + (className ? ' ' + className : '')} style={style} onClick={onClick}>
        {children}
      </div>
    );
  }
}
