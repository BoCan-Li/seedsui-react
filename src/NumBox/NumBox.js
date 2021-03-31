// require PrototypeMath.js, 用于解决加减法精度丢失的问题
import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'

const NumBox = forwardRef(
  (
    {
      // 容器
      disabled,
      // 加减号
      plusAttribute = {},
      minusAttribute = {},
      // 文本框
      inputAttribute = {},
      defaultValue,
      value,
      digits,
      max,
      min,
      placeholder,
      maxLength = '16',
      readOnly,
      required, // 设置非空时, 会自动补一个合法值
      // 自动获取焦点
      autoFocus, // 渲染时自动获取焦点
      autoSelect, // 渲染时自动选中
      clickButtonFocus, // 点击加减按钮获取焦点
      // 左右图标
      licon,
      liconAttribute,
      ricon,
      riconAttribute,
      // events
      onClick,
      onChange,
      onBlur,
      onFocus,
      ...others
    },
    ref
  ) => {
    const refEl = useRef(null)
    const refElInput = useRef(null)
    useImperativeHandle(ref, () => {
      return refEl.current
    })

    useEffect(() => {
      if (autoFocus) {
        focus()
      }
    }, []) // eslint-disable-line

    const [minDisabled, setMinDisabled] = useState(false)
    const [maxDisabled, setMaxDisabled] = useState(false)

    useEffect(() => {
      let val = refElInput.current.value || ''
      updateState(val)
    }, []) // eslint-disable-line

    // 更新禁用状态
    function updateState(val) {
      if (!isNaN(min) && !isNaN(val) && val <= min) {
        setMinDisabled(true)
      } else {
        setMinDisabled(false)
      }
      if (!isNaN(max) && !isNaN(val) && val >= max) {
        setMaxDisabled(true)
      } else {
        setMaxDisabled(false)
      }
    }

    // 数字纠正
    function correctNumber(originVal) {
      let val = originVal
      if (typeof val === 'number') val = String(val)
      // 最大长度
      if (maxLength && val && val.length > maxLength) {
        val = val.substring(0, maxLength)
      }
      // 小数位截取
      if (!isNaN(digits)) {
        if (val.indexOf('.') !== -1) {
          val = val.substring(0, val.indexOf('.') + Number(digits) + 1)
        }
      }
      // 输入时只校验最大值、小数点、最大长度、返回错误
      if (!isNaN(max) && !isNaN(val)) {
        if (Number(val) > Number(max)) val = max
      }
      if (!isNaN(min) && !isNaN(val)) {
        if (Number(val) < Number(min)) val = min
      }
      return val
    }

    // 获取焦点时, 如果readOnly或者disabled时, 需要立即失去焦点, 解决ios会出现底栏的问题
    function focusHandler(e) {
      if (readOnly || disabled) {
        e.target.blur()
        return
      }
      if (onFocus) onFocus(e)
    }
    // 失去焦点需要校验值是否正确
    function blurHandler(e) {
      if (readOnly || disabled) {
        return
      }
      // 如果value和框内值不等, 设置为相等
      // if (refElInput.current && refElInput.current.value !== value) {
      //   refElInput.current.value = value;
      // }
      // 失去焦点时只校验非空、最小值
      const val = correctNumber(e.target.value)
      if (val !== '' + e.target.value) {
        change(e, val)
      }
      if (onBlur) onBlur(e)
    }
    // 点击加减号清除时获取焦点
    function focus() {
      if (disabled || readOnly || !refElInput.current) return
      refElInput.current.focus()
      if (autoSelect) refElInput.current.select()
    }
    // 修改值回调
    function change(e, val) {
      if (defaultValue || defaultValue === '') {
        e.target.value = val
      }
      updateState(val)
      if (onChange) onChange(e, val)
    }

    // 修改值
    function handleChange(e) {
      let val = e.target.value
      if (e.target.validity.badInput) {
        val = ''
      } else {
        if (val !== '') {
          val = correctNumber(val)
        }
      }
      // Callback
      change(e, val)
    }
    // 点击文本框, 逢0清空
    function clickInput(e) {
      if (inputAttribute.onClick) inputAttribute.onClick(e, value)
    }
    // 点击减
    function clickMinus(e) {
      let event = { target: refElInput.current }
      let val = correctNumber(Math.Calc.subtract(refElInput.current.value, 1))
      // Callback
      change(event, val)
      if (minusAttribute.onClick) minusAttribute.onClick(e, val)
      if (clickButtonFocus) {
        focus()
      }
    }
    // 点击加
    function clickPlus(e) {
      let event = { target: refElInput.current }
      let val = correctNumber(Math.Calc.add(refElInput.current.value, 1))
      // Callback
      change(event, val)
      if (plusAttribute.onClick) plusAttribute.onClick(e, val)
      if (clickButtonFocus) {
        focus()
      }
    }
    // 点击容器
    function handleClick(e) {
      e.stopPropagation()
      if (disabled) return
      var target = e.target
      if (liconAttribute && liconAttribute.onClick && target.classList.contains('licon')) {
        liconAttribute.onClick(e, refElInput.current.value)
        return
      }
      if (riconAttribute && riconAttribute.onClick && target.classList.contains('ricon')) {
        riconAttribute.onClick(e, refElInput.current.value)
        return
      }
      if (target.classList.contains('numbox-input')) {
        clickInput(e)
        return
      }
      if (target.classList.contains('numbox-button-plus')) {
        clickPlus(e)
        return
      }
      if (target.classList.contains('numbox-button-minus')) {
        clickMinus(e)
        return
      }
      if (onClick) onClick(e, refElInput.current.value)
    }
    // render
    function getInputDOM() {
      return (
        <input
          ref={refElInput}
          type="number"
          {...inputAttribute}
          className={`numbox-input${
            inputAttribute.className ? ' ' + inputAttribute.className : ''
          }`}
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={focusHandler}
          onBlur={blurHandler}
        />
      )
    }

    // 过滤已经回调的属性
    function filterProps(props) {
      if (!props) return {}
      const { onClick, ...otherProps } = props
      return { ...otherProps }
    }
    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    let otherLiconAttribute = filterProps(liconAttribute)
    let otherRiconAttribute = filterProps(riconAttribute)
    return (
      <div
        ref={refEl}
        {...others}
        disabled={min >= max || disabled}
        className={`numbox${others.className ? ' ' + others.className : ''}`}
        onClick={handleClick}
      >
        <input
          value="-"
          disabled={minDisabled}
          {...plusAttribute}
          type="button"
          className={`numbox-button numbox-button-minus${
            plusAttribute.className ? ' ' + plusAttribute.className : ''
          }`}
        />
        {licon && licon}
        {otherLiconAttribute && !Object.isEmptyObject(otherLiconAttribute) && (
          <i
            {...otherLiconAttribute}
            className={`licon icon${
              otherLiconAttribute.className ? ' ' + liconAttribute.className : ''
            }`}
          ></i>
        )}
        {getInputDOM()}
        {otherRiconAttribute && !Object.isEmptyObject(otherRiconAttribute) && (
          <i
            {...otherRiconAttribute}
            className={`ricon icon${
              otherRiconAttribute.className ? ' ' + otherRiconAttribute.className : ''
            }`}
          ></i>
        )}
        {ricon && ricon}
        <input
          value="+"
          disabled={maxDisabled}
          {...minusAttribute}
          type="button"
          className={`numbox-button numbox-button-plus${
            minusAttribute.className ? ' ' + minusAttribute.className : ''
          }`}
        />
      </div>
    )
  }
)

export default NumBox
