import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Icon from './../Icon/Icon.jsx';
import Instance from './toast.js';

export default class Toast extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,

    position: PropTypes.string, // top | middle | bottom
    duration: PropTypes.number,
    delay: PropTypes.number,
    propagation: PropTypes.bool, // 弹出后是否允许点击,false不能点击,true可以点击
    onShowed: PropTypes.func,
    onHid: PropTypes.func,

    className: PropTypes.string,
    style: PropTypes.object,
    caption: PropTypes.string,
    icon: PropTypes.node,
    iconSrc: PropTypes.string,
    iconStyle: PropTypes.object,
    iconClassName: PropTypes.string,
  }
  static defaultProps = {
    position: 'bottom',
    duration: 300,
    delay: 0,
    propagation: true,

    caption: '',
    show: false
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  shouldComponentUpdate = (nextProps) => {
    if (this.props.show === nextProps.show && nextProps.caption === this.props.caption) {
      return false;
    }
    return true;
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.show) {
      this.state.instance.show();
    } else {
      this.state.instance.hide();
    }
  }
  componentDidMount = () => {
    if (this.state.instance) return;
    const {duration, delay, onShowed, onHid, show} = this.props;
    const instance = new Instance({
      mask: this.$el,
      duration: duration,
      delay: delay,
      propagationClass: '',
      onShowed: onShowed || null,
      onHid: onHid || null
    });
    this.setState({
      instance
    });
    if (show) instance.show();
  }
  render() {
    const {
      position, propagation,
      className, style,
      icon, iconSrc, iconStyle, iconClassName,
      caption
    } = this.props;
    return createPortal(
      <div ref={(el) => {this.$el = el}} className={`mask toast-mask${position ? ' ' + position : ''}${propagation ? ' toast-propagation' : ''}`}>
        <div className={`toast${className ? ' ' + className : ''}`} style={style}>
          <div className="toast-wrapper">
            {(iconSrc || iconClassName) && <Icon className={`toast-icon${iconClassName ? ' ' + iconClassName : ''}`} src={iconSrc ? iconSrc : ''} style={iconStyle}/>}
            {icon}
            <span className="toast-caption">{caption}</span>
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
