import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Icon from './../Icon';

export default class Alert extends Component {
  static propTypes = {
    portal: PropTypes.object,
    args: PropTypes.any,
    show: PropTypes.bool,

    duration: PropTypes.number,

    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,
    onClickMask: PropTypes.func,

    className: PropTypes.string,
    style: PropTypes.object,

    icon: PropTypes.node,
    iconSrc: PropTypes.string,
    iconStyle: PropTypes.object,
    iconClassName: PropTypes.string,

    caption: PropTypes.node,
    captionStyle: PropTypes.object,
    captionClassName: PropTypes.string,

    contentStyle: PropTypes.object,
    contentClassName: PropTypes.string,

    children: PropTypes.node,

    submitStyle: PropTypes.object,
    submitClassName: PropTypes.string,
    submitCaption: PropTypes.node,
    disabled: PropTypes.bool,

    cancelStyle: PropTypes.object,
    cancelClassName: PropTypes.string,
    cancelCaption: PropTypes.node,

    onClickSubmit: PropTypes.func,
    onClickCancel: PropTypes.func,
  }
  static defaultProps = {
    submitCaption: '确定',
    cancelCaption: '取消',
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
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
  onClickMask = (e) => {
    if (this.props.onClickMask) this.props.onClickMask(this.getArgs(e));
    e.stopPropagation();
  }
  onClickCancel = (e) => {
    if (this.props.onClickCancel) this.props.onClickCancel(this.getArgs(e));
    e.stopPropagation();
  }
  onClickSubmit = (e) => {
    if (this.props.onClickSubmit) this.props.onClickSubmit(this.getArgs(e));
    e.stopPropagation();
  }
  render() {
    const {
      duration, show,
      maskClassName, maskStyle,
      className, style,
      caption, captionStyle, captionClassName,
      contentStyle, contentClassName,
      icon, iconSrc, iconStyle, iconClassName,
      children,
      submitCaption, submitStyle, submitClassName, onClickSubmit, disabled,
      cancelCaption, cancelStyle, cancelClassName, onClickCancel,
    } = this.props;
    return createPortal(
      <div ref={(el) => {this.$el = el}} className={`mask alert-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, maskStyle)} onClick={this.onClickMask}>
        <div className={`alert${className ? ' ' + className : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, style)} data-animation="zoom">
          {caption && <h1 className={captionClassName} style={captionStyle}>{caption}</h1>}
          <div className={`alert-content${contentClassName ? ' ' + contentClassName : ''}`} style={contentStyle}>
            {(iconSrc || iconClassName) && <Icon className={`alert-content-icon${iconClassName ? ' ' + iconClassName : ''}`} src={iconSrc ? iconSrc : ''} style={iconStyle}/>}
            {icon}
            {/* 内容 */}
            {children}
          </div>
          <div className="alert-handler">
            {onClickCancel && <a className={`alert-cancel${cancelClassName ? ' ' + cancelClassName : ''}`} style={cancelStyle} onClick={this.onClickCancel}>{cancelCaption}</a>}
            {onClickSubmit && <a className={`alert-submit${submitClassName ? ' ' + submitClassName : ''}`} style={submitStyle} onClick={this.onClickSubmit} disabled={disabled}>{submitCaption}</a>}
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
