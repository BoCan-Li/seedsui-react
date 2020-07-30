import React, {forwardRef, useContext} from 'react';
import {createPortal} from 'react-dom';
import Context from './../Context/instance.js';

const Dialog = forwardRef(({
  portal,
  show,
  onClick,
  animation = 'fade',  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  duration,

  maskAttribute = {},

  children,
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  // const locale = context.locale || function (key) {return key || ''};

  // 点击dialog主体
  function click (e) {
    e.stopPropagation()
  }
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
      className={`mask dialog-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}
      style={Object.assign({}, durationStyle, maskAttribute.style || {})}
    >
      <div
        {...others}
        className={`dialog${animationClassName ? ' ' + animationClassName : ''}${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}
        style={Object.assign({}, durationStyle, others.style || {})}
        onClick={onClick ? onClick : click}
        data-animation={animation}
      >
        {children && children}
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
})

export default Dialog
