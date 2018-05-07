import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import Device from './../utils/device.js';
import bridge from './../utils/bridge'
import Icon from './../Icon/Icon.jsx';

@withRouter
export default class Titlebar extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,

    caption: PropTypes.string,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,

    onClickBack: PropTypes.func,
    onClickCaption: PropTypes.func,
    lButtons: PropTypes.array, // [{iconClassName: 'xx', caption: 'xx'}]
    rButtons: PropTypes.array,
    children: PropTypes.node
  }
  static defaultProps = {
    lButtons: ['$back'],
    className: 'border-b'
  }
  constructor(props) {
    super(props);
  }
  onClickBack = () => {
    const {history, onClickBack} = this.props;
    // 如果有onClickBack的props,则优先执行props的方法
    if (onClickBack) {
      onClickBack();
      return;
    }
    // 否则走默认的返回
    const isFromApp = Device.getUrlParameter('isFromApp', this.props.location.search) || '';
    if (isFromApp === '1') {
      try {
        bridge.closeWindow();
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === '2') {
      try {
        bridge.goHome();
      } catch (error) {
        console.log(error);
      }
    } else {
      history.goBack();
    }
  }
  getButtonsDOM = (arr) => {
    return arr.map((item, index) => {
      if (item === '$back') {
        item = {
          iconClassName: 'shape-arrow-left',
          onClick: this.onClickBack
        };
      }
      return (
        <a key={index} onClick={() => {if (item.onClick) item.onClick(item.args || '');}} className={`titlebar-button${item.className ? ' ' + item.className : ''}`} style={item.style}>
          {(item.iconSrc || item.iconClassName) && <Icon className={`${item.iconClassName ? ' ' + item.iconClassName : ''}`} src={item.iconSrc ? item.iconSrc : ''} style={item.iconStyle}/>}
          {item.icon && item.icon}
          {item.caption && <span>{item.caption}</span>}
        </a>
      );
    });
  }
  render() {
    const {
      className, style,
      caption, captionClassName, captionStyle, children, onClickCaption,
      lButtons, rButtons
    } = this.props;
    let lButtonsDOM = null;
    if (Array.isArray(lButtons)) {
      lButtonsDOM = this.getButtonsDOM(lButtons);
    }
    let rButtonsDOM = null;
    if (Array.isArray(rButtons)) {
      rButtonsDOM = this.getButtonsDOM(rButtons);
    }
    const captionDOM = children ? children : (<h1 className={`titlebar-caption nowrap text-center${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle} onClick={onClickCaption}>{caption}</h1>);
    return (
      <div className={`titlebar${className ? ' ' + className : ''}`} style={style}>
        <div className="titlebar-left">
          {lButtonsDOM}
        </div>
        {captionDOM}
        <div className="titlebar-right">
          {rButtonsDOM}
        </div>
      </div>
    );
  }
}
