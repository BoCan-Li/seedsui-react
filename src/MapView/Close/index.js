import React, {useContext} from 'react';
import Context from './../../Context/instance.js';

function Close ({
  ...props
}) {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};
  return (
    <div {...props} className={`mapview-close${props.className ? ' ' + props.className : ''}`} >
      <div className={`mapview-close-label`}>{locale('close') || '关闭'}</div>
    </div>
  )
}

export default Close;
