import React, { forwardRef } from 'react'
import InputText from './../InputText'

const InputArea = forwardRef(({ ...props }, ref) => {
  return <InputText ref={ref} {...props} type="textarea" />
})

export default InputArea
