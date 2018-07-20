import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Icon from './../Icon';
import Instance from './alert.js';

export default class Alert extends Component {
  static propTypes = {
    portal: PropTypes.object,
    args: PropTypes.any,
    show: PropTypes.bool,

    duration: PropTypes.number,
    onClickSubmit: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickMask: PropTypes.func,
    onShowed: PropTypes.func,
    onHid: PropTypes.func,

    className: PropTypes.string,
    style: PropTypes.object,
    icon: PropTypes.node,
    iconSrc: PropTypes.string,
    iconStyle: PropTypes.object,
    iconClassName: PropTypes.string,

    caption: PropTypes.node,
    submitCaption: PropTypes.node,
    cancelCaption: PropTypes.node,
    children: PropTypes.node
  }
  static defaultProps = {
    show: false,

    duration: 300,
    args: null,
    caption: '',
    submitCaption: '确定',
    cancelCaption: '取消',
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  /* shouldComponentUpdate = (nextProps) => { // 因为是容器,不能使用此方法,不然会影响内部元素的更新
    if (nextProps.show !== this.props.show) {
      return true;
    }
    return false;
  } */
  componentDidUpdate = (prevProps) => {
    if (prevProps.show !== this.props.show) {
      // 显示与隐藏
      if (this.props.show) {
        this.state.instance.show();
      } else if (!this.props.show) {
        this.state.instance.hide();
      }
      // 点击事件更新
      if (this.props.onClickCancel) this.state.instance.setOnClickCancel(this.props.onClickCancel)
      if (this.props.onClickSubmit) this.state.instance.setOnClickSubmit(this.props.onClickSubmit)
    }
  }
  componentDidMount = () => {
    if (this.state.instance) return;
    const {show, args, duration, onClickSubmit, onClickCancel, onClickMask, onShowed, onHid} = this.props;
    const instance = new Instance({
      mask: this.$el,
      args: args,
      duration: duration,
      onClickSubmit: onClickSubmit || null,
      onClickCancel: onClickCancel || null,
      onClickMask: onClickMask || null,
      onShowed: onShowed || null,
      onHid: onHid || null
    });
    if (show) instance.show();
    this.setState({
      instance
    });
  }
  render() {
    const {
      className, style,
      caption,
      icon, iconSrc, iconStyle, iconClassName,
      children,
      cancelCaption, submitCaption, onClickCancel, onClickSubmit
    } = this.props;
    return createPortal(
      <div ref={(el) => {this.$el = el}} className="mask alert-mask">
        <div className={`alert${className ? ' ' + className : ''}`} style={style} data-animation="zoom">
          {caption && <h1>{caption}</h1>}
          <div className="alert-content">
            {(iconSrc || iconClassName) && <Icon className={`alert-content-icon${iconClassName ? ' ' + iconClassName : ''}`} src={iconSrc ? iconSrc : ''} style={iconStyle}/>}
            {icon}
            {/* 内容 */}
            {children}
          </div>
          <div className="alert-handler">
            {onClickCancel && <a className="alert-cancel">{cancelCaption}</a>}
            {onClickSubmit && <a className="alert-submit">{submitCaption}</a>}
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
