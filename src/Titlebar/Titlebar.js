import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Device from './../Device';
import Bridge from './../Bridge';

export default class Titlebar extends Component {
  static propTypes = {
    className: PropTypes.string,
    
    showUrlTitle: PropTypes.bool, // 标题是否显示url中的titlebar
    caption: PropTypes.node,
    captionAttribute: PropTypes.object, // 只有caption为string类型或者显示地址栏标题时才有用

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
    Bridge.back();
  }
  getButtonsDOM = (arr) => {
    return arr.map((item, index) => {
      if (item === '$back') {
        item = {
          className: this.props.backClassName || null,
          style: this.props.backStyle || null,
          icon: this.props.backIcon || null,
          iconClassName: this.props.backIconClassName || null,
          iconStyle: this.props.backIconStyle || {},
          caption: this.props.backCaption || null,
          onClick: this.onClickBack
        };
      }
      return (
        <a key={index} disabled={item.disabled} onClick={(e) => {if (item.onClick) item.onClick(Object.getArgs(e, item.args));}} className={`titlebar-button button${item.className ? ' ' + item.className : ' bar'}`} style={item.style}>
          {(item.iconSrc || item.iconClassName) && <span className={`icon${item.iconClassName ? ' ' + item.iconClassName : ''}`} style={Object.assign(item.iconSrc ? {backgroundImage: `url(${item.iconSrc})`} : {}, item.iconStyle)}></span>}
          {item.icon && item.icon}
          {item.caption && <span>{item.caption}</span>}
        </a>
      );
    });
  }
  render() {
    let {
      className,
    
      showUrlTitle,
      caption,
      captionAttribute = {},

      lButtons,
      rButtons,

      backClassName,
      backStyle,
      backIcon,
      backIconClassName,
      backIconStyle,
      backCaption,
      onClickBack,
      
      children,
      ...others
    } = this.props;
    // 构建左右按钮
    let lButtonsDOM = null;
    if (Array.isArray(lButtons)) {
      lButtonsDOM = this.getButtonsDOM(lButtons);
    }
    let rButtonsDOM = null;
    if (Array.isArray(rButtons)) {
      rButtonsDOM = this.getButtonsDOM(rButtons);
    }
    // 设置显示标题
    let title = Device.getUrlParameter('titlebar', location.search);
    if (showUrlTitle && title) {
      caption = <h1 {...captionAttribute} className={`titlebar-caption nowrap text-center${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{decodeURIComponent(decodeURIComponent(title))}</h1>;
    } else if (typeof caption === 'string') {
      caption = <h1 {...captionAttribute} className={`titlebar-caption nowrap text-center${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{caption}</h1>
    }
    return (
      <div className={`titlebar${className ? ' ' + className : ''}`} {...others}>
        <div className="titlebar-left">
          {lButtonsDOM}
        </div>
        {caption}
        {children}
        <div className="titlebar-right">
          {rButtonsDOM}
        </div>
      </div>
    );
  }
}
