import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
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
  ref = useRef(null)

  useEffect(() => {
    if (!ref || !ref.current) return;
    console.log('计算尺寸')
    Instance.updateContainerSize(ref.current, leftFixed, rightFixed);
    Instance.onScroll(ref.current, onBottomRefresh)
  }, [leftFixed, rightFixed, tbody])

  function scroll (e) {
    Instance.onScroll(e.target, onBottomRefresh)
  }

  if (!thead || !tbody) return null;
  return (
    <div ref={ref} {...others} className={'fixtable' + (others.className ? ' ' + others.className : '')} onScroll={scroll}>
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
