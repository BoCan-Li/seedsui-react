import React, { forwardRef } from 'react'

const Button = forwardRef(({ children, ...others }, ref) => {
  return (
    <a
      ref={ref}
      {...others}
      className={'button' + (others.className ? ' ' + others.className : '')}
    >
      {children}
    </a>
  )
})

export default Button
