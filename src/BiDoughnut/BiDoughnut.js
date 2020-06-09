import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';

const BiDoughnut = forwardRef(({
  style,
  borderWidth = 3, // 边框宽度
  size = 50, // 大小,px
  duration = 1000, // 时长
  rotate = 0, // 最大360
  delay = 100,  // 延时
  captionAttribute = {},
  children,
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  const refElLeftCircle = useRef(null)
  const refElRightCircle = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });

  function getDuration () {
    const correctRotate = rotate > 360 ? 360 : rotate
    const duration1 = duration / 360;
    const durationRotate = duration1 * correctRotate;
    let durationLeft = 0;
    let durationRight = durationRotate;
    if (correctRotate > 180) {
      durationRight = duration1 * 180;
      durationLeft = duration1 * (correctRotate - 180);
    }
    return {
      durationRotate: durationRotate,
      delayLeft: durationRight,
      durationLeft: durationLeft,
      durationRight: durationRight
    }
  }
  function getRotate () {
    let rotateLeft = -135; // 左circle旋转角度
    let rotateRight = -135 + rotate; // 右circle旋转角度
    if (rotate > 180) {
      rotateRight = 45;
      rotateLeft = -135 + (rotate - 180);
    }
    return {
      rotateLeft,
      rotateRight
    }
  }
  // 只有延迟100毫秒动画才会生效
  function aniRotate () {
    // 时长与延时
    const duration = getDuration();
    const durationLeft = duration.durationLeft;
    const delayLeft = duration.delayLeft;
    const durationRight = duration.durationRight;
    // 旋转
    const rotate = getRotate();
    let rotateLeft = rotate.rotateLeft;
    let rotateRight = rotate.rotateRight;
    setTimeout(() => {
      if (refElLeftCircle.current) {
        refElLeftCircle.current.style.WebkitTransitionDuration = `${durationLeft}ms`;
        refElLeftCircle.current.style.WebkitTransitionDelay = `${delayLeft}ms`;
      }
      if (refElRightCircle.current) {
        refElRightCircle.current.style.WebkitTransitionDuration = `${durationRight}ms`;
      }
      if (refElLeftCircle.current) {
        refElLeftCircle.current.style.WebkitTransform = `rotate(${rotateLeft}deg)`;
      }
      if (refElRightCircle.current) {
        refElRightCircle.current.style.WebkitTransform = `rotate(${rotateRight}deg)`;
      }
    }, delay);
  }
  // 动画旋转
  aniRotate();
  return (
    <div ref={refEl} {...others} className={`bi-doughtut${others.className ? ' ' + others.className : ''}`} style={Object.assign({width: `${size}px`, height: `${size}px`}, style || {})}>
      <div className="bi-doughtut-wrapper left">
        <div ref={refElLeftCircle} className="bi-doughtut-circle left" style={{borderWidth: `${borderWidth}px`, width: `${size - (borderWidth * 2)}px`, height: `${size - (borderWidth * 2)}px`}}></div>
      </div>
      <div className="bi-doughtut-wrapper right">
        <div ref={refElRightCircle} className="bi-doughtut-circle right" style={{borderWidth: `${borderWidth}px`, width: `${size - (borderWidth * 2)}px`, height: `${size - (borderWidth * 2)}px`}}></div>
      </div>
      <div
        {...captionAttribute}
        className={`bi-doughtut-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}
      >
        {children}
      </div>
    </div>
  );
})

export default BiDoughnut;
