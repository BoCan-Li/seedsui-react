import React, { forwardRef } from 'react'
import InputText from './../InputText'

const InputPre = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} pre />
})

export default InputPre
