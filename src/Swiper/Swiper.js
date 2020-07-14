// require (PrototypeArray.js), 使用了equals
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import Instance from './instance';

const Swiper = forwardRef(({
  params = {},
  // 画布容器
  wrapperAttribute = {},
  // 分页
  paginationAttribute = {},
  // 翻页
  prevAttribute = {},
  nextAttribute = {},
  // 轮播页
  children,
  // 容器子元素
  containerChildren,
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null)

  useEffect(() => {
    if (!refEl || !refEl.current) return
    instance.current = new Instance('.swiper-container', {
      ...params
    });
    refEl.current.instance = instance;
  }, []) // eslint-disable-line

  // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
  if (instance.current) {
    if (!params.on) return;
    for (let eventName in params.on) {
      instance.current.off(eventName);
      instance.current.on(eventName, params.on[eventName]);
    }
  }

  return (
    <div ref={refEl} {...others} className={`swiper-container${others.className ? ' ' + others.className : ''}`}>
      <div className="swiper-wrapper">
        {children}
      </div>
      {/* 系统默认分页 */}
      {params.pagination && <div {...paginationAttribute} className={`swiper-pagination${paginationAttribute.className ? ' ' + paginationAttribute.className : ''}`}></div>}
      {/* 翻页控件 */}
      {params.navigation && params.navigation.prevEl && <div {...prevAttribute} className={`swiper-button-prev${prevAttribute.className ? ' ' + prevAttribute.className : ''}`}></div>}
      {params.navigation && params.navigation.nextEl && <div {...nextAttribute} className={`swiper-button-next${nextAttribute.className ? ' ' + nextAttribute.className : ''}`}></div>}
      {containerChildren}
    </div>
  );
})

export default Swiper
