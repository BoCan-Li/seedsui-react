import React, { forwardRef, useContext } from 'react';
import {createPortal} from 'react-dom';
import Context from '../Context/instance.js';

const Loading = forwardRef(({
  portal,
  type = 'floating',
  maskAttribute = {},
  iconAttribute,
  captionAttribute = {},
  children,
  caption,
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};

  let content = <div>{caption || locale['loading'] || '正在加载...'}</div>;
  if (type === 'custom') { // 自定义样式
    content = (<div {...others} className={`loading-custom${others.className ? ' ' + others.className : ''}`}>
      {iconAttribute && <span {...iconAttribute} className={`loading-custom-icon${iconAttribute.className ? ' ' + iconAttribute.className : ''}`}></span>}
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
      {caption && <div {...captionAttribute} className={`loading-floating-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{caption || locale['loading'] || '正在加载...'}</div>}
    </div>);
  }
  if (portal) {
    return createPortal(
      <div ref={ref} {...maskAttribute} className={'loading-mask mask active' + (maskAttribute.className ? ' ' + maskAttribute.className : '')}>
        {content}
        {children}
      </div>,
      portal
    )
  }
  return (
    <div ref={ref} {...maskAttribute} className={'loading-mask mask active' + (maskAttribute.className ? ' ' + maskAttribute.className : '')}>
      {content}
      {children}
    </div>
  );
})

export default Loading
  
