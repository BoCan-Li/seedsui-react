import React, {forwardRef, useContext} from 'react';
import {createPortal} from 'react-dom';
import Context from './../Context/instance.js';

const Alert = forwardRef(({
  portal,
  show,
  animation = 'zoom', // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  duration,

  maskAttribute = {},

  caption,
  captionAttribute = {},

  icon,

  contentAttribute = {},

  submitCaption,
  submitAttribute = {},

  cancelCaption,
  cancelAttribute = {},

  children,
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};

  // 构建动画
  let animationClassName = '';
  switch (animation) {
    case 'slideLeft':
      animationClassName = 'popup-animation right-middle';
      break;
    case 'slideRight':
      animationClassName = 'popup-animation left-middle';
      break;
    case 'slideUp':
      animationClassName = 'popup-animation bottom-center';
      break;
    case 'slideDown':
      animationClassName = 'popup-animation top-center';
      break;
    case 'zoom':
      animationClassName = 'popup-animation middle';
      break;
    case 'fade':
      animationClassName = 'popup-animation middle';
      break;
    case 'none':
      animationClassName = '';
      break;
    default:
      animationClassName = 'popup-animation middle';
  }
  // 动画时长
  let durationStyle = {};
  if (typeof duration === 'number') {
    durationStyle = {
      WebkitTransitionDuration: duration + 'ms'
    }
  }

  return createPortal(
    <div
      ref={ref}
      {...maskAttribute}
      className={`mask alert-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}
      style={Object.assign({}, durationStyle, maskAttribute.style || {})}
    >
      <div
        data-animation={animation}
        {...others}
        className={`alert${animationClassName ? ' ' + animationClassName : ''}${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}
        style={Object.assign({}, durationStyle, others.style || {})}
      >
        {caption && <h1 {...captionAttribute}>{caption}</h1>}
        <div {...contentAttribute} className={`alert-content${contentAttribute.className ? ' ' + contentAttribute.className : ''}`}>
          {icon}
          {/* 内容 */}
          {children}
        </div>
        <div className="alert-handler">
          {cancelAttribute.onClick && <a {...cancelAttribute} className={`alert-cancel button lg${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelCaption || locale('取消', 'cancel')}</a>}
          {submitAttribute.onClick && <a {...submitAttribute} className={`alert-submit button lg${submitAttribute.className ? ' ' + submitAttribute.className : ''}`}>{submitCaption || locale('确定', 'ok')}</a>}
        </div>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
})

export default Alert
