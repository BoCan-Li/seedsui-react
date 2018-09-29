import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from './../Badge';
import Close from './../Close';

export default class Icon extends Component {
  static propTypes = {
    base: PropTypes.string, // img | pureImg | icon | pureIcon
    baseClassName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    lazyLoad: PropTypes.bool,

    defaultImgClassName: PropTypes.string,
    defaultImgStyle: PropTypes.object,
    src: PropTypes.string,

    badgeCaption: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    badgeClassName: PropTypes.string,
    badgeStyle: PropTypes.object,
    badgeLimit: PropTypes.number,
    badgeEllipsis: PropTypes.string,
    
    onClickClose: PropTypes.func,
    closeClassName: PropTypes.string,
    closeStyle: PropTypes.object,
    
    children: PropTypes.node,
  }
  static defaultProps = {
    base: 'icon',
    baseClassName: 'icon',
    defaultImgClassName: 'bg-no-img',
    lazyLoad: false
  }
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {
      base, baseClassName, className, style,
      defaultImgClassName, defaultImgStyle, src, lazyLoad,
      children,
      badgeCaption, badgeClassName, badgeStyle, badgeLimit, badgeEllipsis,
      closeClassName, closeStyle, onClickClose,
      ...others
    } = this.props;
    if (base === 'pureImg') {
      if (src && lazyLoad) {
        return <img alt="" className={`icon-img ${defaultImgClassName}`} style={defaultImgStyle} data-load-src={src}/>
      }
      if (src && !lazyLoad) {
        return <img alt="" className={`icon-img ${defaultImgClassName}`} style={defaultImgStyle} src={src}/>
      }
      return null
    }
    if (base === 'pureIcon') {
      if (src && lazyLoad) {
        return <span className={`icon-full ${defaultImgClassName}`} style={defaultImgStyle} data-load-src={src}></span>
      }
      if (src && !lazyLoad) {
        return <span className={`icon-full ${defaultImgClassName}`} style={Object.assign({backgroundImage: `url(${src})`}, defaultImgStyle)}></span>
      }
      return null
    }
    return (
      <span ref={el => {this.$el = el;}} className={`${baseClassName}${className ? ' ' + className : ''}`} style={style} {...others}>
        {src && base === 'icon' && lazyLoad && <span className={`icon-full ${defaultImgClassName}`} style={defaultImgStyle} data-load-src={src}></span>}
        {src && base === 'icon' && !lazyLoad && <span className={`icon-full ${defaultImgClassName}`} style={Object.assign({backgroundImage: `url(${src})`}, defaultImgStyle)}></span>}
        {src && base === 'img' && lazyLoad && <img alt="" className={`icon-img ${defaultImgClassName}`} style={defaultImgStyle} data-load-src={src}/>}
        {src && base === 'img' && !lazyLoad && <img alt="" className={`icon-img ${defaultImgClassName}`} style={defaultImgStyle} src={src}/>}
        {children}
        {badgeCaption && badgeCaption !== '0' && <Badge className={badgeClassName} style={badgeStyle} limit={badgeLimit} ellipsis={badgeEllipsis}>{badgeCaption}</Badge>}
        {onClickClose && <Close onClick={onClickClose} className={`${closeClassName ? ' ' + closeClassName : ''}`}/>}
      </span>
    );
  }
}
