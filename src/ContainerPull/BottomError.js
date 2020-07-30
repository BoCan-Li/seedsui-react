import React, {forwardRef, useRef, useImperativeHandle, useContext} from 'react';
import Context from './../Context/instance.js';

const BottomError = forwardRef(({
  children,
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};

  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });

  return <div className="SID-Dragrefresh-ErrorContainer containerpull-pull" style={{height: '50px'}} {...others}>
    {!children && <div className="containerpull-pull-box">
      <div className="containerpull-pull-caption">{locale('refreshing_failed') || '加载失败, 请稍后再试'}</div>
    </div>}
    {children}
  </div>
})

export default BottomError
