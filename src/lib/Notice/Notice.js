import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon';
export default class Notice extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    show: PropTypes.bool,
    // args: PropTypes.array
    
    className: PropTypes.string,
    style: PropTypes.object,
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
    sndcaption: '',
    style: {}
  }
  constructor(props) {
    super(props);
    this.state = {}
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
      show,
      className, style,
      icon, iconSrc, iconStyle, iconClassName,
      caption,
      sndcaption,
      children
    } = this.props;
    return (
      show ? <div ref={el => {this.$el = el;}} className={`notice${className ? ' ' + className : ''}`} style={style}>
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