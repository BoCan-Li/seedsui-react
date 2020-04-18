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
  ...others
}, ref) =>  {
  const refEl = createRef(null)
  useImperativeHandle(ref, () => ({
    refEl: refEl
  }));

  useEffect(() => {
    if (!refEl || !refEl.current) return;
    Instance.updateContainerSize(refEl.current, leftFixed, rightFixed);
  }, [leftFixed, rightFixed])

  function scroll (e) {
    if (!onBottomRefresh) return;
    var container = e.target;
    var clientHeight = container.clientHeight // || window.innerHeight
    var scrollHeight = container.scrollHeight
    var scrollTop = container === document.body ? document.documentElement.scrollTop : container.scrollTop
    // console.log(clientHeight + ':' + scrollHeight + ':' + scrollTop)
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
    </div>
  );
})

export default FixTable
