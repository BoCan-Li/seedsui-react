import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Peg extends Component {
  static propTypes = {
    type: PropTypes.string, // line
    iconClassName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
  }
  static defaultProps = {
    className: 'top right'
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {type, iconClassName, className, style, children} = this.props;
    let newClassName = '';
    switch (type) {
      case 'line':
        newClassName = 'sticker-line';
        break;
      default:
        newClassName = 'sticker';
    }
    return (
      <span ref={el => {this.$el = el;}} className={`${newClassName}${iconClassName ? ' sticker-icon' : ''}${className ? ' ' + className: ''}`} style={style}>
        {iconClassName && <span class={`size12 ${iconClassName}`}></span>}
        {children && <span>{children}</span>}
      </span>
    );
  }
}
