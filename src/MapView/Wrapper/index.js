import React from 'react';

function Wrapper ({
  props = {}
}) {
  return (
    <div {...props} className={`mapview${props.className ? ' ' + props.className : ''}`} id="Id-MapLocateNow-MapContainer"></div>
  );
}
export default Wrapper;