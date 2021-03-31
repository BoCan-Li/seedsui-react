import React, { forwardRef } from 'react'
import InputText from './../InputText'

const InputColor = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} type="color" />
})

export default InputColor
