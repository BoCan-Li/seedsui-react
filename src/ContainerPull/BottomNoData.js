import React, {forwardRef, useRef, useImperativeHandle, useContext} from 'react';
import Context from './../Context/instance.js';

const BottomNoData = forwardRef(({
  children,
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};

  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });

  return <div className="SID-Dragrefresh-NoDataContainer containerpull-pull" style={{height: '50px'}} {...others}>
    {!children && <div className="containerpull-pull-box">
      <div className="containerpull-pull-caption">{locale['no_more_data'] || '没有更多数据了'}</div>
    </div>}
    {children}
  </div>
})

export default BottomNoData
