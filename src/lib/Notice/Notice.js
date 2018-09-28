import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon';
export default class Notice extends Component {
  static propTypes = {
    args: PropTypes.any,
    show: PropTypes.bool,
    
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func, // 点击内容区域
    icon: PropTypes.node,
    iconSrc: PropTypes.string,
    iconStyle: PropTypes.object,
    iconClassName: PropTypes.string, // notice-icon-nodata | notice-icon-error
    caption: PropTypes.string,
    sndcaption: PropTypes.string,
    children: PropTypes.node
  }
  static defaultProps = {
    args: null,
    show: true,
    caption: '',
    sndcaption: ''
  }
  constructor(props) {
    super(props);
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(this.getArgs(e));
    }
  }
  render() {
    const {
      args,
      show,
      className, style, onClick,
      icon, iconSrc, iconStyle, iconClassName,
      caption,
      sndcaption,
      children,
      ...others
    } = this.props;
    return (
      show ? <div ref={el => {this.$el = el;}} className={`notice${className ? ' ' + className : ''}`} style={style} {...others}>
        <div className="notice-content" onClick={this.onClick}>
          {(iconSrc || iconClassName) && <Icon className={`notice-icon${iconClassName ? ' ' + iconClassName : ''}`} src={iconSrc ? iconSrc : ''} style={iconStyle}/>}
          {icon}
          <div className="notice-caption">{caption}</div>
          {sndcaption && <div className="notice-sndcaption">{sndcaption}</div>}
          {children}
        </div>
      </div> : null
    );
  }
}
