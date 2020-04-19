import React, { createRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import Instance from './instance.js';

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
const FixTable = forwardRef(({
  thead,
  tbody,
  theadFixed = false,
  leftFixed = [],
  rightFixed = [],
  onBottomRefresh,
  children,
  ...others
}, ref) =>  {
  const refEl = createRef(null)
  useImperativeHandle(ref, () => ({
    refEl: refEl
  }));

  useEffect(() => {
    if (!refEl || !refEl.current) return;
    console.log('计算尺寸')
    Instance.updateContainerSize(refEl.current, leftFixed, rightFixed);
  }, [leftFixed, rightFixed, tbody])

  function scroll (e) {
    var container = e.target;
    // 左右滚动样式, 为了显隐投影
    var scrollLeft = container === document.body ? document.documentElement.scrollLeft : container.scrollLeft
    var clientWidth = container.clientWidth
    var scrollWidth = container.scrollWidth
    if (scrollLeft + clientWidth >= scrollWidth) { // 最右边
      container.classList.remove('fixtable-ping-right')
    } else if (scrollLeft === 0) { // 最左边
      container.classList.remove('fixtable-ping-left')
    } else {
      container.classList.add('fixtable-ping-left')
      container.classList.add('fixtable-ping-right')
    }
    // 滚动到底部事件
    if (!onBottomRefresh) return;
    var clientHeight = container.clientHeight
    var scrollHeight = container.scrollHeight
    var scrollTop = container === document.body ? document.documentElement.scrollTop : container.scrollTop
    if (scrollTop + clientHeight >= scrollHeight - 2) {
      onBottomRefresh()
    }
  }

  if (!thead || !tbody) return null;
  return (
    <div ref={refEl} {...others} className={'fixtable' + (others.className ? ' ' + others.className : '')} onScroll={scroll}>
      <table className={`fixtable-thead${theadFixed ? ' fixed' : ''}`}>
        <colgroup></colgroup>
        {/* <colgroup>
          <col style="width: 100px; min-width: 100px;">
          <col style="width: 100px; min-width: 100px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 100px; min-width: 100px;">
        </colgroup> */}
        {thead}
      </table>
      <table className="fixtable-tbody">
        <colgroup></colgroup>
        {/* <colgroup>
          <col style="width: 100px; min-width: 100px;">
          <col style="width: 100px; min-width: 100px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 150px; min-width: 150px;">
          <col style="width: 100px; min-width: 100px;">
        </colgroup> */}
        {tbody}
      </table>
      {children}
    </div>
  );
})

export default FixTable
