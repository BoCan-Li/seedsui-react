import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Badge extends Component {
  static propTypes = {
    children: PropTypes.node,
    limit: PropTypes.number,
    ellipsis: PropTypes.string, // 有limit属性时ellipsis才生效
  }
  static defaultProps = {
    children: '0',
    limit: 2,
    ellipsis: '+',
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      children,
      limit,
      ellipsis,
      ...others
    } = this.props;
    // 标题
    let caption = children;
    // 自动宽度,当大于两位时变宽
    let autoWidthClass = '';
    if (limit && children && (typeof children === 'string' || typeof children === 'number')) {
      // 数字大于99,则显示99+
      if (!isNaN(children)) {
        caption = children.length > limit ? '99999'.substring(0, limit) + ellipsis : children;
      } else {
        caption = children.length > limit ? children.substring(0, limit) + ellipsis : children;
      }
      // 数字大于2位以及2位以上,显示最大宽度
      autoWidthClass = children.length >= 2 ? 'badge-max-width' : '';
    }
    return (
      <span ref={el => {this.$el = el;}} {...others} className={`badge${autoWidthClass ? ' ' + autoWidthClass : ''}${others.className ? ' ' + others.className : ''}`}>{caption}</span>
    );
  }
}
