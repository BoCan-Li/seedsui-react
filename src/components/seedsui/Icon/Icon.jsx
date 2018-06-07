import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from './../Badge/Badge.jsx';

export default class Icon extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    src: PropTypes.string,
    lazyLoad: PropTypes.bool,
    onClick: PropTypes.func,

    badgeCaption: PropTypes.string,
    badgeClassName: PropTypes.string,
    badgeStyle: PropTypes.object,
    badgeLimit: PropTypes.number,
    badgeEllipsis: PropTypes.string,
    
    children: PropTypes.node,
  }
  static defaultProps = {
    lazyLoad: false
  }
  constructor(props) {
    super(props);
  }

  render() {
    const {onClick, style, className, src, lazyLoad, children, badgeCaption, badgeClassName, badgeStyle, badgeLimit, badgeEllipsis} = this.props;
    let nodataIconClassName = '';
    let newStyle = style;
    // 懒人加载时,先显示一张默认的背景图,然后在子元素上显示在线图片
    if (lazyLoad && src) {
      newStyle = style;
      nodataIconClassName = 'bg-no-img';
    } else if (src) {
      nodataIconClassName = '';
      newStyle = Object.assign({backgroundImage: 'url(' + src + ')'}, style);
    }
    
    return (
      <i ref={(el) => {this.$el = el}} onClick={onClick} className={`icon${nodataIconClassName ? ' ' + nodataIconClassName : ''}${className ? ' ' + className : ''}`} style={newStyle}>
      {lazyLoad && src && <span className="icon-img" style={{backgroundImage: 'url(' + src + ')'}}></span>}
      {children}
      {badgeCaption && badgeCaption !== '0' && <Badge className={badgeClassName} style={badgeStyle} limit={badgeLimit} ellipsis={badgeEllipsis}>{badgeCaption}</Badge>}
      </i>
    );
  }
}
