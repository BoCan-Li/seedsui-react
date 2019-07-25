import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Icon from './../Icon';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Alert extends Component {
  static propTypes = {
    portal: PropTypes.object,
    args: PropTypes.any,
    show: PropTypes.bool,

    duration: PropTypes.number,

    maskStyle: PropTypes.object,
    maskClassName: PropTypes.string,
    onClickMask: PropTypes.func,

    style: PropTypes.object,
    className: PropTypes.string,

    caption: PropTypes.node,
    captionStyle: PropTypes.object,
    captionClassName: PropTypes.string,

    icon: PropTypes.node,
    iconSrc: PropTypes.string,
    iconStyle: PropTypes.object,
    iconClassName: PropTypes.string,

    contentStyle: PropTypes.object,
    contentClassName: PropTypes.string,
    children: PropTypes.node,

    submitStyle: PropTypes.object,
    submitClassName: PropTypes.string,
    submitCaption: PropTypes.node,
    disabled: PropTypes.bool,
    onClickSubmit: PropTypes.func,

    cancelStyle: PropTypes.object,
    cancelClassName: PropTypes.string,
    cancelCaption: PropTypes.node,
    onClickCancel: PropTypes.func,
  }
  static defaultProps = {
    submitCaption: window._seeds_lang['ok'] || '确定',
    cancelCaption: window._seeds_lang['cancel'] || '取消',
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  onClickMask = (e) => {
    if (this.props.onClickMask) this.props.onClickMask(Object.getArgs(e, this.props.args));
    e.stopPropagation();
  }
  onClickCancel = (e) => {
    if (this.props.onClickCancel) this.props.onClickCancel(Object.getArgs(e, this.props.args));
    e.stopPropagation();
  }
  onClickSubmit = (e) => {
    if (this.props.onClickSubmit) this.props.onClickSubmit(Object.getArgs(e, this.props.args));
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
            {onClickCancel && <a className={`alert-cancel button lg${cancelClassName ? ' ' + cancelClassName : ''}`} style={cancelStyle} onClick={this.onClickCancel}>{cancelCaption}</a>}
            {onClickSubmit && <a className={`alert-submit button lg${submitClassName ? ' ' + submitClassName : ''}`} style={submitStyle} onClick={this.onClickSubmit} disabled={disabled}>{submitCaption}</a>}
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
