import React, { useState, forwardRef, Fragment } from 'react';
import InputText from './../InputText';
import PickerDistrict from './../PickerDistrict';

// 函数组件因为没有实例, 所以也没有ref, 必须通过forwardRef回调ref
const InputDistrict = forwardRef(({
  // Input
  value,
  onClick,
  onChange,

  // Picker
  valueForKey,
  type = '', // province | city | district | street
  pickerProps = {
    maskAttribute: {},
    submitAttribute: {}
  },
  ...others
}, ref) =>  {
  let [show, setShow] = useState(false);

  // 点击文本框
  function onClickInput (...parameter) {
    if (onClick) onClick(...parameter);
    setShow(!show);
  }
  // 点击遮罩
  function onClickMask (e) {
    if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
      pickerProps.maskAttribute.onClick(e);
    }
    setShow(!show);
  }
  // 点击确定按钮
  function onClickSubmit (e, value, options) {
    if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
      pickerProps.submitAttribute.onClick(e, value, options);
    }
    // 赋值
    if (onChange) {
      onChange(e, value, options);
    }
    // 隐藏框
    setShow(!show);
  }
  // 点击取消按钮
  function onClickCancel (e) {
    if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
      pickerProps.cancelAttribute.onClick(e);
    }
    setShow(!show);
  }
  return <Fragment>
    <InputText
      value={value}
      {...others}
      type="text"
      readOnly
      onClick={onClickInput}
    />
    <PickerDistrict
      {...pickerProps}
      maskAttribute={{
        ...pickerProps.maskAttribute,
        onClick: onClickMask
      }}
      submitAttribute={{
        ...pickerProps.submitAttribute,
        onClick: onClickSubmit
      }}
      cancelAttribute={{
        ...pickerProps.cancelAttribute,
        onClick: onClickCancel
      }}
      valueForKey={valueForKey}
      type={type}
      value={value}
      show={pickerProps.show === undefined ? show : pickerProps.show}
    />
  </Fragment>
})

export default InputDistrict
