import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Loading extends Component {
  static propTypes = {
    portal: PropTypes.object, // 传送至DOM
    type: PropTypes.string, // floating | filling
    maskBefore: PropTypes.node,
    iconSrc: PropTypes.string,
    caption: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    loadingStyle: PropTypes.object
  }
  static defaultProps = {
    caption: '正在加载...',
    type: 'floating',
    style: {}
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { style, className, type, iconSrc, caption, loadingStyle, maskBefore } = this.props;
    let content = <div>加载中...</div>;
    if (iconSrc) { // 自定义样式
      content = (<div className="loading-wrapper" style={loadingStyle}>
        {iconSrc && <img alt="" src={iconSrc} className="loading-icon"/>}
        {caption && <p>{caption}</p>}
      </div>);
    } else if(type === 'filling') { // 填料环
      content = (<div className="loading-filling active" style={loadingStyle}>
        <div className="loading-filling-wrapper"></div>
      </div>);
    } else if (type === 'floating') { // 流光
      content = (<div className="loading-floating animated" style={loadingStyle}>
        <div className="loading-floating-wrapper">
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
        </div>
        <div className="loading-floating-caption">{caption}</div>
      </div>);
    }
    if (this.props.portal) {
      return createPortal(
        <div className={'loading-mask mask active' + (className ? ' ' + className : '')} style={style}>
          {maskBefore}
          {content}
        </div>,
        this.props.portal
      )
    }
    return (
      <div className={'loading-mask mask active' + (className ? ' ' + className : '')} style={style}>
        {maskBefore}
        {content}
      </div>
    );
  }
}
