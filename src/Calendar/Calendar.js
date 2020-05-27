// require (PrototypeDate.js), 使用了format
import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import Instance from './instance.js';

const Calendar = forwardRef(({
  type = 'month', // week | month
  activeTo = '', // today | default
  defaultDate, // 默认日期
  titleFormat, // 标题日期格式化 YYYY年MM月DD日 周E 第W周
  disableBeforeDate, // 禁用之前日期
  disableAfterDate, // 禁用之后日期
  verticalDrag, // 是否允许垂直拖动
  prevHTML = '&lt', // 左箭头
  nextHTML = '&gt', // 右箭头
  onChange,
  onClick,
  onError
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null)

  // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
  if (instance.current) {
    instance.current.params.onChange = change;
    instance.current.params.onClick = click;
    instance.current.params.onError = onError;
  }
  function change (s) {
    if (onChange) onChange(s, s.activeDate.format('YYYY-MM-DD'), s.activeDate)
  }
  function click (s) {
    if (onClick) onClick(s, s.selectedDate.format('YYYY-MM-DD'), s.selectedDate)
  }
  useEffect(() => {
    if (instance.current) return
    instance.current = new Instance(refEl.current, {
      viewType: type,
      titleFormat: titleFormat,
      disableBeforeDate: disableBeforeDate,
      disableAfterDate: disableAfterDate,
      verticalDrag: verticalDrag,
      defaultDate: defaultDate,
      prevHTML: prevHTML,
      nextHTML: nextHTML,
      onChange: change,
      onClick: click,
      onError: onError // func(e, err)
    });
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!instance.current) return
    if (type === 'month') {
      instance.current.showMonth();
    } else if (type === 'week') {
      instance.current.showWeek();
    }
  }, [type])

  useEffect(() => {
    if (!instance.current) return
    if (activeTo instanceof Date) {
      instance.current.setDate(activeTo);
      return;
    }
    if (activeTo === 'today') {
      instance.current.setToday();
    } else if (activeTo === 'default') {
      instance.current.setDefaultDate();
    }
  }, [activeTo])

  return (
    <div ref={refEl} className="calendar"></div>
  );
})

export default Calendar
