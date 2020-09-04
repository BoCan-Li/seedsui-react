import React, {useContext} from 'react';
import Context from './../../Context/instance.js';

function Close ({
  ...props
}) {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};
  return (
    <div {...props} className={`map-close${props.className ? ' ' + props.className : ''}`} >
      <div className={`map-close-label`}>{locale('关闭', 'close')}</div>
    </div>
  )
}

export default Close;
