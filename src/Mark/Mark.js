import React, {forwardRef} from 'react';

const Mark = forwardRef(({
  children,
  ...others
}, ref) =>  {
  return (
    children ? <span ref={ref} {...others} className={`mark${others.className ? ' ' + others.className : ''}`}>{children}</span> : null
  )
})

export default Mark
