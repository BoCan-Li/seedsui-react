import React, {forwardRef, useRef, useImperativeHandle, useEffect, useState} from 'react';

const InputText = forwardRef(({
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
  clearAttribute,
  // 右侧内容
  rcaption,
  // 子内容
  children,
  // events
  onClick,
  onChange,
  onBlur,
  onFocus,
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  const refElInput = useRef(null)
  const refElPre = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });

  useEffect(() => {
    let val = refElInput.current.value;
    // 更新清除按钮
    updateState(val);
    // 更新高度
    if (pre) {
      preAutoSize(val);
    }
    if (autoFocus) {
      focus();
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if ((defaultValue || defaultValue === '') && refElInput.current) {
      if (refElInput.current.value !== defaultValue) {
        console.log(defaultValue)
        refElInput.current.value = defaultValue;
      }
    }
  }, [defaultValue])

  const [clearShow, setClearShow] = useState(false);

  // 更新清除按钮
  function updateState (val) {
    if (typeof val === 'number') {
      val = String(val)
    }
    if (val) {
      setClearShow(true);
    } else {
      setClearShow(false);
    }
  }
  // 自动扩充功能
  function preAutoSize (val) {
    refElPre.current.children[0].innerText = val;
    refElInput.current.style.height = refElPre.current.clientHeight + 'px';
  }
  // 点击加减号清除时获取焦点
  function focus () {
    if (disabled || readOnly || !refElInput.current) return;
    refElInput.current.focus();
    if (autoSelect) refElInput.current.select();
  }
  // 修改值回调
  function change (e, val) {
    if (defaultValue || defaultValue === '') {
      e.target.value = val;
    }
    // 更新清空按钮
    updateState(val);
    // 更新自动扩充功能
    if (pre) {
      preAutoSize(val);
    }
    if (onChange) onChange(e, val);
  }

  // 点击容器
  function clickHandler (e) {
    let elInput = refElInput.current;
    if (!elInput) return;
    if (disabled) return;
    var target = e.target;
    if (target.classList.contains('clearicon')) {
      clickClear(e);
      e.stopPropagation();
      return;
    }
    if (target.classList.contains('licon') && liconAttribute && liconAttribute.onClick) {
      liconAttribute.onClick(e, elInput.value);
      e.stopPropagation();
      return;
    }
    if (target.classList.contains('ricon') && riconAttribute && riconAttribute.onClick) {
      riconAttribute.onClick(e, elInput.value);
      e.stopPropagation();
      return;
    }
    if (target.classList.contains('input-text') && inputAttribute.onClick) {
      inputAttribute.onClick(e, elInput.value);
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(e, elInput.value);
      e.stopPropagation();
    }
  }
  function correctNumber (originVal) {
    let val = originVal;
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
      if (val > max) val = max;
    }
    if (!isNaN(min) && !isNaN(val)) {
      if (val < min) val = min;
    }
    return val;
  }
  // 文本框事件
  function changeHandler (e) {
    var target = e.target;
    var val = correctNumber(target.value);
    // onChange
    change(e, val);
  }
  // 点击清除
  function clickClear (e) {
    focus();
    let event = {target: refElInput.current};
    if (clear && typeof clear === 'function') clear(event, '');
    // Callback
    change(event, '');
    e.stopPropagation();
  }
  // render
  function getInputDOM () {
    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    let otherInputAttribute = filterProps(inputAttribute)
    // pre类型
    if (pre) {
      // pre的左右padding
      let preLeft = 0;
      let preRight = 0;
      if (otherInputAttribute.style) {
        if (otherInputAttribute.style.padding) {
          const paddingValues = otherInputAttribute.style.padding.split(' ');
          if (paddingValues.length === 1) {
            preLeft = paddingValues[0];
            preRight = paddingValues[0];
          } else if (paddingValues.length === 2) {
            preLeft = paddingValues[1];
            preRight = paddingValues[1];
          } else if (paddingValues.length === 4) {
            preLeft = paddingValues[1];
            preRight = paddingValues[3];
          }
        } else if (otherInputAttribute.style.paddingLeft || otherInputAttribute.style.paddingRight) {
          preLeft = otherInputAttribute.style.paddingLeft || '0';
          preRight = otherInputAttribute.style.paddingRight || '0';
        }
      }
      return (<div {...otherInputAttribute} className={`input-pre-box${otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''}`}>
        <textarea
          ref={refElInput}
          autoFocus={autoFocus}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          readOnly={readOnly}
          disabled={disabled}
          className={`input-pre`}
          placeholder={placeholder}
          onChange={changeHandler}
          onBlur={onBlur}
          onFocus={onFocus}
        ></textarea>
        <pre ref={refElPre} style={{left: preLeft, right: preRight}}><span></span></pre>
      </div>);
    }
    // textarea类型
    if (type === 'textarea') {
      // 如果值绑定属性,则只有通过父组件的prop来改变值
      return <textarea
        ref={refElInput}
        {...otherInputAttribute}
        autoFocus={autoFocus}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`input-area${otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''}`}
      ></textarea>;
    }
    // 其它类型
    return <input
      ref={refElInput}
      type={type}
      {...otherInputAttribute}
      className={`input-text${otherInputAttribute.className ? ' ' + otherInputAttribute.className : ''}`}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      maxLength={maxLength}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={changeHandler}
      autoFocus={autoFocus}
      onBlur={onBlur} onFocus={onFocus} />;
  }

  // 过滤已经回调的属性
  function filterProps (props) {
    if (!props) return {};
    const {onClick, ...otherProps} = props;
    return {...otherProps};
  }

  // 剔除掉onClick事件, 因为在容器onClick已经回调了
  const otherLiconAttribute = filterProps(liconAttribute)
  const otherRiconAttribute = filterProps(riconAttribute)
  const otherClearAttribute = filterProps(clearAttribute)
  return (<div ref={refEl} {...others} className={`input-text-box${others.className ? ' ' + others.className : ''}`} onClick={clickHandler}>
    {licon && licon}
    {liconAttribute && <i {...otherLiconAttribute} className={`licon icon${otherLiconAttribute.className ? ' ' + otherLiconAttribute.className : ''}`}></i>}
    {getInputDOM()}
    {children && children}
    {/* clearicon仅用于点击区分, 没有实际的样式用途 */}
    {clearShow && clear && !readOnly && !disabled && <i {...otherClearAttribute} className={`icon clearicon${otherClearAttribute.className ? ' ' + otherClearAttribute.className : ' ricon close-icon-clear size18'}`}></i>}
    {riconAttribute && <i {...otherRiconAttribute} className={`ricon icon${otherRiconAttribute.className ? ' ' + otherRiconAttribute.className : ''}`}></i>}
    {ricon && ricon}
    {rcaption && rcaption}
  </div>);
})

export default InputText
