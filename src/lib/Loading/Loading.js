import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Loading extends Component {
  static propTypes = {
    portal: PropTypes.object, // 传送至DOM
    type: PropTypes.string, // floating | filling | custom
    
    maskStyle: PropTypes.object,
    maskClassName: PropTypes.string,
    maskBefore: PropTypes.node,

    style: PropTypes.object,

    iconClassName: PropTypes.string,
    iconSrc: PropTypes.string,
    caption: PropTypes.string
  }
  static defaultProps = {
    caption: '正在加载...',
    type: 'floating'
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const {
      type,
      maskStyle, maskClassName, maskBefore,
      style,
      iconClassName, iconSrc, caption } = this.props;
    let content = <div>加载中...</div>;
    if (type === 'custom') { // 自定义样式
      content = (<div className="loading-custom" style={style}>
        {(iconClassName || iconSrc) && <span style={iconSrc ? {backgroundImage: `url(${iconSrc})`} : {}} className={`loading-custom-icon${iconClassName ? ' ' + iconClassName : ''}`}></span>}
        {caption && <p className="loading-custom-caption">{caption}</p>}
      </div>);
    } else if(type === 'filling') { // 填料环
      content = (<div className="loading-filling active" style={style}>
        <div className="loading-filling-icon"></div>
      </div>);
    } else if (type === 'floating') { // 流光
      content = (<div className="loading-floating animated" style={style}>
        <div className="loading-floating-icon">
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
        <div className={'loading-mask mask active' + (maskClassName ? ' ' + maskClassName : '')} style={maskStyle}>
          {maskBefore}
          {content}
        </div>,
        this.props.portal
      )
    }
    return (
      <div ref={el => {this.$el = el;}} className={'loading-mask mask active' + (maskClassName ? ' ' + maskClassName : '')} style={maskStyle}>
        {maskBefore}
        {content}
      </div>
    );
  }
}
