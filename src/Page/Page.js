import React, {forwardRef} from 'react';

const Page = forwardRef(({
  animation,
  children,
  ...others
}, ref) =>  {
  return <section ref={ref} {...others} className={'page' + (others.className ? ' ' + others.className : '')} data-animation={animation}>
    {children}
  </section>
})

export default Page
