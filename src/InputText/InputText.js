import React, {forwardRef, useRef, useImperativeHandle} from 'react';

const InputText = forwardRef(({
  type = 'text', // 类型: text | number | tel | password
  pre, // 自动伸缩文本框
  // 容器
  onClick,
  // 文本框
  inputAttribute = {},
  autoFocus,
  maxLength,
  max, // 日期或者数字框
  min,
  digits,
  readOnly = false,
  disabled = false,

  value = '',
  defaultValue = '',
  placeholder = '',
  // 文本框事件
  onChange,
  onBlur,
  onFocus,
  // 左右图标
  liconAttribute = {},
  licon,
  riconAttribute = {},
  ricon,
  // 清除按键
  clear,
  clearAttribute = {},
  // 右侧内容
  rcaption,
  // 子内容
  children,
  fail,
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  // 点击容器
  function click (e) {
    let elInput = refEl.current.querySelector('.input-text') || refEl.current.querySelector('.input-pre');
    if (!elInput) return;
    if (disabled) return;
    var target = e.target;
    if (target.classList.contains('clearicon')) {
      onClear(e);
      e.stopPropagation();
      return;
    }
    if (target.classList.contains('licon') && liconAttribute.onClick) {
      liconAttribute.onClick(e, elInput.value);
      e.stopPropagation();
      return;
    }
    if (target.classList.contains('ricon') && riconAttribute.onClick) {
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
  // 自动扩充功能
  function preAutoSize (target, preTarget) {
    target.style.height = preTarget.clientHeight + 'px';
  }
  // 文本框事件
  function change (e) {
    var target = e.target;
    var val = target.value;
    // 自动扩充功能
    if (pre) {
      let elPre = target.nextElementSibling;
      if (elPre.tagName === 'PRE') {
        elPre.children[0].innerText = val;
        preAutoSize(target, elPre);
      }
    }
    // 最大长度
    if (maxLength && val && val.length > maxLength) {
      val = val.substring(0, maxLength)
    }
    // 输入时只校验最大值、小数点、最大长度、返回错误
    if (type === 'number') {
      val = Math.Calc.correctNumber(e.target.value, {max, digits, maxLength, fail});
    }
    // onChange
    if (onChange) onChange(e, val);
  }
  function blur (e) {
    var target = e.target;
    var value = target.value;
    if (type === 'number') {
      // 失去焦点时只校验非空、最小值
      value = Math.Calc.correctNumber(value, {min});
      if (onChange) onChange(e, value);
    }
    if (onBlur) onBlur(e, value);
  }
  function focus (e) {
    var target = e.target;
    var value = target.value;
    if (onFocus) {
      onFocus(e, value);
      e.stopPropagation();
    }
    if (readOnly) {
      target.blur();
    }
  }
  // 点击清除
  function onClear (e) {
    let elInput = refEl.current.querySelector('.input-text') || refEl.current.querySelector('.input-pre');
    if (!elInput) return;
    elInput.focus();
    // 赋值
    if (clear && typeof clear === 'function') clear(e, '');
    if (onChange) {
      onChange(e, '');
    }
    // 自动扩充功能
    if (pre) {
      preAutoSize();
    }
    e.stopPropagation();
  }
  function getInputDOM () {
    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    inputAttribute = filterProps(inputAttribute)
    // pre类型
    if (pre) {
      // pre的左右padding
      let preLeft = 0;
      let preRight = 0;
      if (inputAttribute.style) {
        if (inputAttribute.style.padding) {
          const paddingValues = inputAttribute.style.padding.split(' ');
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
        } else if (inputAttribute.style.paddingLeft || inputAttribute.style.paddingRight) {
          preLeft = inputAttribute.style.paddingLeft || '0';
          preRight = inputAttribute.style.paddingRight || '0';
        }
      }
      return (<div {...inputAttribute} className={`input-pre-box${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}>
        <textarea autoFocus={autoFocus} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} onChange={change} onBlur={blur} onFocus={focus}></textarea>
        <pre style={{left: preLeft, right: preRight}}><span>{value}</span></pre>
      </div>);
    }
    // textarea类型
    if (type === 'textarea') {
      // 如果值绑定属性,则只有通过父组件的prop来改变值
      return <textarea {...inputAttribute} autoFocus={autoFocus} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={change} onBlur={blur} onFocus={focus} className={`input-area${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}></textarea>;
    }
    // 其它类型
    return <input {...inputAttribute} max={max} min={min} autoFocus={autoFocus} type={type} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={change} onBlur={blur} onFocus={focus} className={`input-text${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}/>;
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

  return (<div ref={refEl} {...others} className={`input-text-box${others.className ? ' ' + others.className : ''}`} onClick={click}>
      {licon && licon}
      {otherLiconAttribute && <i {...otherLiconAttribute} className={`licon icon${otherLiconAttribute.className ? ' ' + otherLiconAttribute.className : ''}`}></i>}
      {getInputDOM()}
      {children && children}
      {/* clearicon仅用于点击区分, 没有实际的样式用途 */}
      {clear && value && !readOnly && !disabled && <i {...otherClearAttribute} className={`icon clearicon${otherClearAttribute.className ? ' ' + otherClearAttribute.className : ' ricon close-icon-clear size18'}`}></i>}
      {otherRiconAttribute && <i {...otherRiconAttribute} className={`ricon icon${otherRiconAttribute.className ? ' ' + otherRiconAttribute.className : ''}`}></i>}
      {ricon && ricon}
      {rcaption && rcaption}
    </div>);
})

export default InputText
