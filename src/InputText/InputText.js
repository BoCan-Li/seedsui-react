import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'

const InputText = forwardRef(
  (
    {
      // 容器
      type = 'text', // 类型: text | number | tel | password
      pre, // 自动伸缩文本框
      readOnly,
      disabled,
      // 文本框
      inputAttribute = {},
      defaultValue,
      value,
      digits,
      max,
      min,
      placeholder,
      maxLength,
      // 自动获取焦点
      autoFocus, // 渲染时自动获取焦点
      autoSelect, // 渲染时自动选中
      // 左右图标
      licon,
      liconAttribute,
      ricon,
      riconAttribute,
      // 清除按键
      clear,
      clearReadOnly,
      clearAttribute,
      // 右侧内容
      rcaption,
      // 子内容
      children,
      // events
      onClick,
      onCompositionStart, // 输入开始时
      onCompositionUpdate, // 输入进行中
      onCompositionEnd, // 输入完成时
      onInput,
      onChange,
      onBlur,
      onFocus,
      ...others
    },
    ref
  ) => {
    const rootRef = useRef(null)
    const inputRef = useRef(null)
    const preRef = useRef(null)
    useImperativeHandle(ref, () => {
      return rootRef.current
    })

    const [clearShow, setClearShow] = useState(false)

    useEffect(() => {
      let val = inputRef.current.value
      // 更新清除按钮和自适应的高度
      updateClear(val)
      preAutoSize(val)
      // 自动获取焦点
      if (autoFocus) {
        focus()
      }
    }, []) // eslint-disable-line

    useEffect(() => {
      if (!readOnly || !pre) return
      setTimeout(() => {
        let val = inputRef.current.value
        // 更新清除按钮和自适应的高度
        updateClear(val)
        preAutoSize(val)
      }, 100)
    }, [value]) // eslint-disable-line

    // 更新清空按钮
    useEffect(() => {
      if (inputRef.current) {
        updateClear(inputRef.current.value)
        preAutoSize(inputRef.current.value)
      }
    }, [value]) // eslint-disable-line

    // 更新清除按钮
    function updateClear(val) {
      if (typeof val === 'number') {
        val = String(val)
      }
      if (val) {
        setClearShow(true)
      } else {
        setClearShow(false)
      }
    }
    // 自动扩充功能
    function preAutoSize(val) {
      if (!pre) return
      preRef.current.children[0].innerText = val
      inputRef.current.style.height = preRef.current.clientHeight + 'px'
    }
    // 校验maxLength和max、min
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
    // 点击加减号清除时获取焦点
    function focus() {
      if (disabled || readOnly || !inputRef.current) return
      inputRef.current.focus()
      if (autoSelect) inputRef.current.select()
    }
    // 清空按钮控制
    function inputHandler(event) {
      var e = event.nativeEvent
      // 修改值时有渲染延迟, 更新清空按钮和自适应的高度
      setTimeout(() => {
        updateClear(e.target.value)
        preAutoSize(e.target.value)
      }, 100)
      // Callback
      if (onInput) onInput(e, e.target.value)
    }
    // 修改值回调
    function changeHandler(e, value, callback) {
      var target = e.target
      var val = typeof value === 'string' || typeof value === 'number' ? value : target.value
      // 校验maxLength和max、min
      if (val !== '') {
        val = correctNumber(target.value)
      }
      if (callback) {
        callback(e, val)
      }
    }

    // 点击容器
    function clickHandler(e) {
      let elInput = inputRef.current
      if (!elInput) return
      if (disabled) return
      var target = e.target
      if (target.classList.contains('clearicon')) {
        clickClear(e)
        e.stopPropagation()
        return
      }
      if (target.classList.contains('licon') && liconAttribute && liconAttribute.onClick) {
        liconAttribute.onClick(e, elInput.value)
        e.stopPropagation()
        return
      }
      if (target.classList.contains('ricon') && riconAttribute && riconAttribute.onClick) {
        riconAttribute.onClick(e, elInput.value)
        e.stopPropagation()
        return
      }
      if (target.classList.contains('input-text') && inputAttribute.onClick) {
        inputAttribute.onClick(e, elInput.value)
        e.stopPropagation()
        return
      }
      if (onClick) {
        onClick(e, elInput.value)
        e.stopPropagation()
      }
    }
    // 点击清除
    function clickClear(event) {
      focus()
      let e = { target: inputRef.current }
      if (clear && typeof clear === 'function') clear(e, '')
      else if (clearReadOnly && typeof clearReadOnly === 'function') clearReadOnly(e, '')
      // Callback
      if (onChange) {
        onChange(e, '')
      } else if (!value) {
        // 有value没有onChange本身就清空不掉, 所以要控制这种情况不允许清空
        e.target.value = ''
      }
      // 修改值时有渲染延迟, 更新清空按钮和自适应的高度
      setTimeout(() => {
        updateClear(e.target.value)
        preAutoSize(e.target.value)
      }, 100)

      event.stopPropagation()
    }
    // render
    function getInputDOM() {
      // 剔除掉onClick事件, 因为在容器onClick已经回调了
      let otherInputAttribute = filterProps(inputAttribute)
      // pre类型
      if (pre) {
        // pre的左右padding
        let preLeft = 0
        let preRight = 0
        if (otherInputAttribute.style) {
          if (otherInputAttribute.style.padding) {
            const paddingValues = otherInputAttribute.style.padding.split(' ')
            if (paddingValues.length === 1) {
              preLeft = paddingValues[0]
              preRight = paddingValues[0]
            } else if (paddingValues.length === 2) {
              preLeft = paddingValues[1]
              preRight = paddingValues[1]
            } else if (paddingValues.length === 4) {
              preLeft = paddingValues[1]
              preRight = paddingValues[3]
            }
          } else if (
            otherInputAttribute.style.paddingLeft ||
            otherInputAttribute.style.paddingRight
          ) {
            preLeft = otherInputAttribute.style.paddingLeft || '0'
            preRight = otherInputAttribute.style.paddingRight || '0'
          }
        }
        return (
          <div
            {...otherInputAttribute}
            className={`input-pre-box${
              otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''
            }`}
          >
            <textarea
              ref={inputRef}
              autoFocus={autoFocus}
              value={value}
              defaultValue={defaultValue}
              maxLength={maxLength}
              readOnly={readOnly}
              disabled={disabled}
              className={`input-pre`}
              placeholder={placeholder}
              onChange={onChange ? (e) => changeHandler(e, null, onChange) : null}
              onCompositionStart={
                onCompositionStart ? (e) => changeHandler(e, null, onCompositionStart) : null
              }
              onCompositionUpdate={
                onCompositionUpdate ? (e) => changeHandler(e, null, onCompositionUpdate) : null
              }
              onCompositionEnd={
                onCompositionEnd ? (e) => changeHandler(e, null, onCompositionEnd) : null
              }
              onInput={inputHandler}
              onBlur={onBlur}
              onFocus={onFocus}
            ></textarea>
            <pre ref={preRef} style={{ left: preLeft, right: preRight }}>
              <span></span>
            </pre>
          </div>
        )
      }
      // textarea类型
      if (type === 'textarea') {
        // 如果值绑定属性,则只有通过父组件的prop来改变值
        return (
          <textarea
            ref={inputRef}
            {...otherInputAttribute}
            autoFocus={autoFocus}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange ? (e) => changeHandler(e, null, onChange) : null}
            onCompositionStart={
              onCompositionStart ? (e) => changeHandler(e, null, onCompositionStart) : null
            }
            onCompositionUpdate={
              onCompositionUpdate ? (e) => changeHandler(e, null, onCompositionUpdate) : null
            }
            onCompositionEnd={
              onCompositionEnd ? (e) => changeHandler(e, null, onCompositionEnd) : null
            }
            onInput={inputHandler}
            onBlur={onBlur}
            onFocus={onFocus}
            className={`input-area${
              otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''
            }`}
          ></textarea>
        )
      }
      // 其它类型
      return (
        <input
          ref={inputRef}
          type={type}
          {...otherInputAttribute}
          className={`input-text${
            otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''
          }`}
          defaultValue={defaultValue}
          value={value}
          min={!isNaN(min) ? Number(min) : ''}
          max={!isNaN(max) ? Number(max) : ''}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={onChange ? (e) => changeHandler(e, null, onChange) : null}
          onCompositionStart={
            onCompositionStart ? (e) => changeHandler(e, null, onCompositionStart) : null
          }
          onCompositionUpdate={
            onCompositionUpdate ? (e) => changeHandler(e, null, onCompositionUpdate) : null
          }
          onCompositionEnd={
            onCompositionEnd ? (e) => changeHandler(e, null, onCompositionEnd) : null
          }
          onInput={inputHandler}
          autoFocus={autoFocus}
          onBlur={onBlur}
          onFocus={onFocus}
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
    const otherLiconAttribute = filterProps(liconAttribute)
    const otherRiconAttribute = filterProps(riconAttribute)
    const otherClearAttribute = filterProps(clearAttribute)
    return (
      <div
        ref={rootRef}
        {...others}
        className={`input-text-box${others.className ? ' ' + others.className : ''}`}
        onClick={clickHandler}
      >
        {licon && licon}
        {liconAttribute && (
          <i
            {...otherLiconAttribute}
            className={`licon icon${
              otherLiconAttribute.className ? ' ' + otherLiconAttribute.className : ''
            }`}
          ></i>
        )}
        {getInputDOM()}
        {children && children}
        {/* clearicon仅用于点击区分, 没有实际的样式用途 */}
        {clearShow && (clearReadOnly || clear) && (clearReadOnly || !readOnly) && !disabled && (
          <i
            {...otherClearAttribute}
            className={`icon clearicon${
              otherClearAttribute.className
                ? ' ' + otherClearAttribute.className
                : ' ricon close-icon-clear size18'
            }`}
          ></i>
        )}
        {riconAttribute && (
          <i
            {...otherRiconAttribute}
            className={`ricon icon${
              otherRiconAttribute.className ? ' ' + otherRiconAttribute.className : ''
            }`}
          ></i>
        )}
        {ricon && ricon}
        {rcaption && rcaption}
      </div>
    )
  }
)

export default InputText
