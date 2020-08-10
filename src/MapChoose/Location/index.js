import React, {useContext} from 'react';
import Context from './../../Context/instance.js';

function Location ({
  ...props
}) {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};
  return (
    <div {...props} className={`map-location${props.className ? ' ' + props.className : ''}`}>
      <div className={`map-location-icon`}></div>
      <div className={`map-location-label`}>{locale('reposition') || '重新定位'}</div>
    </div>
  )
}

export default Location;
