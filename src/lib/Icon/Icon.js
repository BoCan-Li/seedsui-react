import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from './../Badge';

export default class Icon extends Component {
  static propTypes = {
    style: PropTypes.object,
    baseClassName: PropTypes.string,
    className: PropTypes.string,
    defaultImgClassName: PropTypes.string,
    src: PropTypes.string,
    lazyLoad: PropTypes.bool,
    onClick: PropTypes.func,

    badgeCaption: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    badgeClassName: PropTypes.string,
    badgeStyle: PropTypes.object,
    badgeLimit: PropTypes.number,
    badgeEllipsis: PropTypes.string,
    
    children: PropTypes.node,
  }
  static defaultProps = {
    baseClassName: 'icon',
    defaultImgClassName: 'bg-no-img',
    lazyLoad: false
  }
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {style, baseClassName, defaultImgClassName, className, src, lazyLoad, children, badgeCaption, badgeClassName, badgeStyle, badgeLimit, badgeEllipsis, ...others} = this.props;
    return (
      <span ref={el => {this.$el = el;}} className={`${baseClassName}${className ? ' ' + className : ''}`} style={style} {...others}>
      {lazyLoad && src && <span className={`icon-img ${defaultImgClassName}`} data-load-src={src}></span>}
      {!lazyLoad && src && <span className={`icon-img ${defaultImgClassName}`} style={{backgroundImage: `url(${src})`}}></span>}
      {children}
      {badgeCaption && badgeCaption !== '0' && <Badge className={badgeClassName} style={badgeStyle} limit={badgeLimit} ellipsis={badgeEllipsis}>{badgeCaption}</Badge>}
      </span>
    );
  }
}
