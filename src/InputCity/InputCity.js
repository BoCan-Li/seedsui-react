import React, {forwardRef, useState, Fragment} from 'react';
import InputText from './../InputText';
import PickerCity from './../PickerCity';

const InputCity = forwardRef(({
  // Input
  onClick,
  onChange,

  // Picker
  type = 'district',
  valueForKey,
  pickerProps = {},
  ...others
}, ref) =>  {
  const [show, setShow] = useState(false)
  // 点击文本框
  function onClickInput (...parameter) {
    if (onClick) onClick(...parameter);
    setShow(true);
  }
  // 点击遮罩
  function onClickMask (e) {
    if (pickerProps && pickerProps.maskAttribute && pickerProps.maskAttribute.onClick) {
      pickerProps.maskAttribute.onClick(e);
      return;
    }
    setShow(false);
  }
  // 点击确定按钮
  function onClickSubmit (e, value, options) {
    if (ref.current) e.target = ref.current
    // 确定按钮回调
    if (pickerProps && pickerProps.submitAttribute && pickerProps.submitAttribute.onClick) {
      pickerProps.submitAttribute.onClick(e, value, options);
      return;
    }
    // 赋值
    if (onChange) {
      onChange(e, value, options);
    }
    // 隐藏框
    setShow(false)
  }
  // 点击取消按钮
  function onClickCancel (e) {
    if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
      pickerProps.cancelAttribute.onClick(e);
      return;
    }
    setShow(false);
  }

  return <Fragment>
    <InputText ref={ref} {...others} type="text" readOnly onClick={onClickInput}/>
    <PickerCity
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
      value={others.value}
      show={pickerProps.show === undefined ? show : pickerProps.show}
    />
  </Fragment>
})

export default InputCity