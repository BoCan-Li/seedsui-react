import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Device from './../Device.js';
import Bridge from './../Bridge';
import Icon from './../Icon';

export default class Titlebar extends Component {
  static propTypes = {
    className: PropTypes.string,
    
    showUrlTitle: PropTypes.bool, // 标题是否显示url中的title
    caption: PropTypes.node,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,
    onClickCaption: PropTypes.func,

    lButtons: PropTypes.array, // [{className: string, style: object, iconClassName: string, icon: node, caption: string}]
    rButtons: PropTypes.array,
    backClassName: PropTypes.string,
    backStyle: PropTypes.object,
    backIcon: PropTypes.node,
    backIconClassName: PropTypes.string,
    backIconStyle: PropTypes.object,
    backCaption: PropTypes.string,
    onClickBack: PropTypes.func,
    children: PropTypes.node
  }
  static defaultProps = {
    showUrlTitle: true,
    lButtons: ['$back'],
    className: 'border-b',
    backIconClassName: 'shape-arrow-left'
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  onClickBack = () => {
    const {onClickBack} = this.props;
    // 如果有onClickBack的props,则优先执行props的方法
    if (onClickBack) {
      onClickBack();
      return;
    }
    // 否则走默认的返回
    const isFromApp = Device.getUrlParameter('isFromApp', location.search) || '';
    if (isFromApp === '1') {
      try {
        Bridge.closeWindow();
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === 'home') {
      try {
        Bridge.goHome();
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === 'confirm') {
      try {
        Bridge.showConfirm('您确定要离开此页面吗?', {
          onSuccess: (e) => {
            e.hide();
            window.history.go(-1);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else if (isFromApp === 'confirm-close') {
      try {
        Bridge.showConfirm('您确定要离开此页面吗?', {
          onSuccess: (e) => {
            e.hide();
            Bridge.closeWindow();
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      history.back();
    }
  }
  getButtonsDOM = (arr) => {
    return arr.map((item, index) => {
      if (item === '$back') {
        item = {
          className: this.props.backClassName || null,
          style: this.props.backStyle || null,
          icon: this.props.backIcon || null,
          iconClassName: this.props.backIconClassName || null,
          iconStyle: this.props.backIconStyle || null,
          caption: this.props.backCaption || null,
          onClick: this.onClickBack
        };
      }
      return (
        <a key={index} disabled={item.disabled} onClick={() => {if (item.onClick) item.onClick(item.args || '');}} className={`titlebar-button button${item.className ? ' ' + item.className : ' bar'}`} style={item.style}>
          {(item.iconSrc || item.iconClassName) && <Icon className={`${item.iconClassName ? ' ' + item.iconClassName : ''}`} src={item.iconSrc ? item.iconSrc : ''} style={item.iconStyle}/>}
          {item.icon && item.icon}
          {item.caption && <span>{item.caption}</span>}
        </a>
      );
    });
  }
  render() {
    const {
      className,
      showUrlTitle,
      caption, captionClassName, captionStyle, children, onClickCaption,
      lButtons, rButtons, backIconClassName, backIconStyle, backClassName, backStyle, backCaption, onClickBack, ...others
    } = this.props;
    let lButtonsDOM = null;
    if (Array.isArray(lButtons)) {
      lButtonsDOM = this.getButtonsDOM(lButtons);
    }
    let rButtonsDOM = null;
    if (Array.isArray(rButtons)) {
      rButtonsDOM = this.getButtonsDOM(rButtons);
    }
    // 设置标题显示url中的title,则默认优先显示title
    let title = caption;
    if (showUrlTitle) {
      title = Device.getUrlParameter('titlebar', location.search) || caption;
      title = decodeURIComponent(title);
    }
    const captionDOM = children ? children : (<h1 className={`titlebar-caption nowrap text-center${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle} onClick={onClickCaption}>{title}</h1>);
    return (
      <div className={`titlebar${className ? ' ' + className : ''}`} {...others}>
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
