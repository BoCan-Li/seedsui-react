import React, {forwardRef} from 'react';

const Wrapper = forwardRef(({
  ...props
}, ref) =>  {
  return (
    <div
      ref={ref}
      {...props}
      className={`mapview${props.className ? ' ' + props.className : ''}`}
      id="Id-MapLocateNow-MapContainer"
    >
    </div>
  );
})

export default Wrapper;
