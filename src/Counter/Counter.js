import React, {forwardRef, useRef, useImperativeHandle, useEffect} from 'react';
import {Counter as Instance} from './instance.js';

const Counter = forwardRef(({
  duration = 5000,
  from = 0,
  to = 10,
  suffix = '', // 后缀
  autoPlay = true, // 是否自动播放
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });

  const instance = useRef(null);
  useEffect(() => {
    if (instance.current) return;
    initInstance();
  }, []);

  function initInstance () {
    instance.current = new Instance(refEl.current);
    if (autoPlay) {
      instance.current.play();
    }
    refEl.current.instance = instance;
  }
  return <span ref={refEl} {...others} className={`counter${others.className ? ' ' + others.className: ''}`} data-duration={duration} data-from={from} data-to={to} data-suffix={suffix}>1</span>;
})

export default Counter
