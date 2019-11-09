import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Loading extends Component {
  static propTypes = {
    portal: PropTypes.object, // 传送至DOM
    type: PropTypes.string, // floating | filling | custom
    
    maskAttribute: PropTypes.object,
    iconAttribute: PropTypes.object,
    captionAttribute: PropTypes.object,
    caption: PropTypes.node,

    children: PropTypes.node
  }
  static defaultProps = {
    caption: window._seeds_lang['loading'] || '正在加载...',
    type: 'floating'
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const {
      portal,
      type,
      maskAttribute = {},
      iconAttribute = {},
      captionAttribute = {},
      caption,
      children,
      ...others
    } = this.props;
    let content = <div>加载中...</div>;
    if (type === 'custom') { // 自定义样式
      content = (<div {...others} className={`loading-custom${others.className ? ' ' + others.className : ''}`}>
        {(iconAttribute.className || iconAttribute.src) && <span style={iconAttribute.src ? {backgroundImage: `url(${iconAttribute.src})`} : {}} className={`loading-custom-icon${iconAttribute.className ? ' ' + iconAttribute.className : ''}`}></span>}
        {caption && <p {...captionAttribute} className={`loading-custom-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{caption}</p>}
      </div>);
    } else if(type === 'filling') { // 填料环
      content = (<div {...others} className={`loading-filling active${others.className ? ' ' + others.className : ''}`}>
        <div className="loading-filling-icon"></div>
      </div>);
    } else if (type === 'floating') { // 流光
      content = (<div {...others} className={`loading-floating animated${others.className ? ' ' + others.className : ''}`}>
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
        {caption && <div {...captionAttribute} className={`loading-floating-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{caption}</div>}
      </div>);
    }
    if (portal) {
      return createPortal(
        <div ref={el => {this.$el = el;}} {...maskAttribute} className={'loading-mask mask active' + (maskAttribute.className ? ' ' + maskAttribute.className : '')}>
          {content}
          {children}
        </div>,
        portal || document.getElementById('root') || document.body
      )
    }
    return (
      <div ref={el => {this.$el = el;}} {...maskAttribute} className={'loading-mask mask active' + (maskAttribute.className ? ' ' + maskAttribute.className : '')}>
        {content}
        {children}
      </div>
    );
  }
}
