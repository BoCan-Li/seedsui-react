import React, {forwardRef, useRef, useImperativeHandle, Fragment, useState} from 'react';
import InputText from './../InputText';
import PickerSelect from './../PickerSelect';
import SelectGroup from './SelectGroup';

const InputSelect = forwardRef(({
  checkbox,
  // Input
  onClick,
  onChange,

  // Picker
  multiple = false,
  list = [], // [{id: '', name: ''}]
  selected,
  pickerProps = {},
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const [show, setShow] = useState(false)
  // 点击文本框
  function onClickInput (...parameter) {
    if (onClick) onClick(...parameter);
    if (others.readOnly) return;
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
    if (refEl.current) e.target = refEl.current
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
    if (refEl.current) e.target = refEl.current
    if (pickerProps && pickerProps.cancelAttribute && pickerProps.cancelAttribute.onClick) {
      pickerProps.cancelAttribute.onClick(e);
      return;
    }
    setShow(false);
  }

  // 过滤非法数据
  list = list.filter(item => {
    if (!item || (!item.id && !item.name)) return false;
    return true;
  });
  if (checkbox) {
    return <Fragment>
      <SelectGroup
        list={list}
        // Input
        onClick={onClick}
        onChange={onChange}

        // Picker
        multiple={multiple}
        list={list}
        selected={selected}
        pickerProps={pickerProps}
        {...others}
      />
    </Fragment>
  }
  return <Fragment>
    <InputText ref={refEl} {...others} readOnly onClick={onClickInput}/>
    <PickerSelect
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
      list={list}
      selected={selected}
      value={others.value} 
      show={pickerProps.show === undefined ? show : pickerProps.show}
      multiple={multiple}
    />
  </Fragment>;
})

export default InputSelect
