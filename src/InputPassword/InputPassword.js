import React, { forwardRef } from 'react'
import InputText from './../InputText'

const InputPassword = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} type="password" />
})

export default InputPassword
