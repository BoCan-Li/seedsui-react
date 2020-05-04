import React, { forwardRef } from 'react';
import InputText from './../InputText';

const InputTel = forwardRef(({...props}, ref) =>  {
    return <InputText ref={ref} {...props} type="tel"/>;
})

export default InputTel
