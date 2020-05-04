import React, { forwardRef } from 'react';
import InputText from './../InputText';

const InputNumber = forwardRef(({...props}, ref) =>  {
    return <InputText ref={ref} {...props} type="number"/>;
})

export default InputNumber
