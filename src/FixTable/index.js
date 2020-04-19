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
    $el: refEl.current
  }));

  useEffect(() => {
    if (!refEl || !refEl.current) return;
    console.log('计算尺寸')
    Instance.updateContainerSize(refEl.current, leftFixed, rightFixed);
    Instance.onScroll(refEl.current, onBottomRefresh)
  }, [leftFixed, rightFixed, tbody])

  function scroll (e) {
    Instance.onScroll(e.target, onBottomRefresh)
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
