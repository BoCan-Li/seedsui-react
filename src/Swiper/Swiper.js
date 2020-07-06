// require (PrototypeArray.js), 使用了equals
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import Instance from './instance';

const Swiper = forwardRef(({
  params = {},
  speed = 500,
  activeIndex = 0,
  onClick,
  onChange,
  // 画布容器
  wrapperAttribute = {},
  // 单项容器
  slideAttribute = {},
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
  const slides = React.Children.toArray(children)

  useEffect(() => {
    if (!refEl || !refEl.current) return
    instance.current = new Instance(refEl.current, {
      ...params,
      on: {
        slideChange: function () {
          if (onChange) onChange(instance.current)
        },
        click: function (e) {
          if (onClick) onClick(instance.current, e)
        },
        ...params.on
      }
    });
    refEl.current.instance = instance;
    slideToActiveIndex();
  }, []) // eslint-disable-line

  function beforeUpdate () {
    if (!instance.current && (!slides || !slides.length)) return false;
    return true;
  }
  useEffect(() => {
    if (!beforeUpdate()) return;
    instance.current.update();
    slideToActiveIndex();
  }, slides); // eslint-disable-line

  useEffect(() => {
    slideToActiveIndex();
  }, [activeIndex]); // eslint-disable-line

  function slideToActiveIndex () {
    if (!beforeUpdate()) return;
    let index = 0;
    if (activeIndex > slides.length - 1) {
      index = slides.length - 1;
    } else if (activeIndex < 0) {
      index = 0;
    } else {
      index = activeIndex;
    }
    // 跳转索引与当前索引一致不需要跳转
    if (index === instance.current.activeIndex) return;
    instance.current.slideTo(index, speed);
  }

  // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
  if (instance.current) {
    if (!params.on || !params.on.slideChange) {
      instance.current.off('slideChange');
      instance.current.on('slideChange', function () {
        if (onChange) onChange(instance.current)
      });
    }
    if (!params.on || !params.on.click) {
      instance.current.off('click');
      instance.current.on('click', function (e) {
        if (onClick) onClick(instance.current, e)
      });
    }
  }

  return (
    <div ref={refEl} {...others} className={`swiper-container${others.className ? ' ' + others.className : ''}`}>
      <div className="swiper-wrapper">
        {slides && slides.map((slide, index) => {
          return (<div {...slideAttribute} className={`swiper-slide${slideAttribute.className ? ' ' + slideAttribute.className : ''}`} style={{overflow: params.zoom ? 'hidden' : '', ...(slideAttribute.style || {})}} key={index}>
            {params.zoom ? <div className="swiper-zoom-container">{slide}</div> : slide}
          </div>)
        })}
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
