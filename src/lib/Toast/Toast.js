import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Icon from './../Icon';

export default class Toast extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,

    duration: PropTypes.number,

    maskClassName: PropTypes.string,
    maskStyle: PropTypes.object,

    className: PropTypes.string,
    style: PropTypes.object,

    caption: PropTypes.node,
    captionStyle: PropTypes.object,
    captionClassName: PropTypes.string,

    icon: PropTypes.node,
    iconSrc: PropTypes.string,
    iconStyle: PropTypes.object,
    iconClassName: PropTypes.string,
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  render() {
    const {
      duration, show,
      maskClassName, maskStyle,
      className, style,
      icon, iconSrc, iconStyle, iconClassName,
      caption, captionStyle, captionClassName
    } = this.props;
    return createPortal(
      <div ref={(el) => {this.$el = el}} className={`mask toast-mask${maskClassName ? ' ' + maskClassName : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, maskStyle)}>
        <div className={`toast${className ? ' ' + className : ''}${show ? ' active' : ''}`} style={Object.assign(duration !== undefined ? {WebkitTransitionDuration: duration + 'ms'} : {}, style)}>
          <div className="toast-wrapper">
            {(iconSrc || iconClassName) && <Icon className={`toast-icon${iconClassName ? ' ' + iconClassName : ''}`} src={iconSrc ? iconSrc : ''} style={iconStyle}/>}
            {icon}
            {caption && <span className={`toast-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{caption}</span>}
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
