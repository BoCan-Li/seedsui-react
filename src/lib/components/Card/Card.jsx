import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {children, style, className, onClick} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={'card' + (className ? ' ' + className : '')} style={style} onClick={onClick}>
        {children}
      </div>
    );
  }
}
