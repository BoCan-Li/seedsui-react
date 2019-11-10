import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputText extends Component {
  static propTypes = {
    type: PropTypes.string, // 类型: text | number | tel | password
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    pre: PropTypes.bool, // 自动扩充功能
    // 容器
    onClick: PropTypes.func,
    // 文本框
    inputAttribute: PropTypes.object,
    autoFocus: PropTypes.bool,
    maxLength: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    max: PropTypes.oneOfType([ // 日期或者数字框
      PropTypes.string,
      PropTypes.number
    ]),
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    digits: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]),
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,

    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
    // 文本框事件
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    // 左右图标
    liconAttribute: PropTypes.bool,
    licon: PropTypes.node,
    riconAttribute: PropTypes.bool,
    ricon: PropTypes.node,
    // 清除按键
    clear: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    clearAttribute: PropTypes.object,
    // 右侧内容
    rcaption: PropTypes.node
  }
  static defaultProps = {
    type: 'text',
    value: '',
    readOnly: false,
    disabled: false
  }
  constructor(props) {
    super(props);
    this.state = {
      showClear: props.value && props.clear && !props.readOnly && !props.disabled // 用于非valueBindProp
    }
  }
  // 解决非valueBindProp状态下, readOnly和disabled发生变化时, 不更新清除按钮的问题
  componentDidUpdate = (prevProps) => {
    if (prevProps.readOnly !== this.props.readOnly || prevProps.disabled !== this.props.disabled) {
      this.updateShowClear()
    }
  }
  // 点击容器
  onClick = (e) => {
    e.stopPropagation();
    const {
      onClick,
      inputAttribute = {},
      liconAttribute = {},
      riconAttribute = {}
    } = this.props;
    if (this.props.disabled) return;
    var target = e.target;
    if (target.classList.contains('clearicon')) {
      this.onClear(e);
    } else if (target.classList.contains('licon')) {
      if (liconAttribute.onClick) liconAttribute.onClick(e, this.$input.value);
    } else if (target.classList.contains('ricon')) {
      if (riconAttribute.onClick) riconAttribute.onClick(e, this.$input.value);
    } else if (target.classList.contains('input-text')) {
      if (onClick) onClick(e, this.$input.value);
      if (inputAttribute.onClick) inputAttribute.onClick(e, this.$input.value);
    } else {
      if (onClick) onClick(e, this.$input.value);
    }
  }
  // 自动扩充功能
  preAutoSize = () => {
    this.$input.style.height = this.$pre.clientHeight + 'px';
  }
  // 文本框事件
  onChange = (e) => {
    var target = e.target;
    var value = target.value;
    const {
      pre, valueBindProp, type, onChange, maxLength
    } = this.props;
    // 自动扩充功能
    if (pre) {
      this.$pre.children[0].innerText = value;
      this.preAutoSize();
    }
    // 最大长度
    if (maxLength && value && value.length > maxLength) {
      value = value.substring(0, maxLength)
    }
    // 输入时只校验最大值、小数点、最大长度、返回错误
    if (type === 'number') {
      const {max, digits, onError} = this.props;
      value = Math.Calc.correctNumber(e.target.value, {max, digits, maxLength, onError});
    }
    // onChange
    if (onChange) onChange(e, value);
    // 非valueBindProp时, 更新清除按钮状态
    if (!valueBindProp) this.updateShowClear(value);
  }
  onBlur = (e) => {
    var target = e.target;
    var value = target.value;
    const {valueBindProp, min, type, onBlur, onChange} = this.props;
    if (type === 'number') {
      // 失去焦点时只校验非空、最小值
      value = Math.Calc.correctNumber(value, {min});
      if (!valueBindProp) target.value = value;
      if (onChange) onChange(e, value);
    }
    if (onBlur) onBlur(e, value);
  }
  onFocus = (e) => {
    var target = e.target;
    var value = target.value;
    const {onFocus, readOnly} = this.props;
    if (onFocus) {
      onFocus(e, value);
      e.stopPropagation();
    }
    if (readOnly) {
      target.blur();
    }
  }
  // 点击清除
  onClear = (e) => {
    this.$input.focus();
    // 赋值
    const {valueBindProp, clear, pre, onChange} = this.props;
    if (!valueBindProp) this.$input.value = '';
    if (clear && typeof clear === 'function') clear(e, '');
    if (onChange) {
      onChange(e, '');
    }
    // 自动扩充功能
    if (pre) {
      this.preAutoSize();
    }
    e.stopPropagation();
    // 非valueBindProp时, 更新清除按钮状态
    if (!valueBindProp) this.updateShowClear('');
  }
  getInputDOM = () => {
    const {
      max,
      min,
      pre, // 自动伸缩文本框
      type,
      valueBindProp,
      autoFocus,
      inputAttribute = {},
      maxLength,
      value,
      placeholder,
      readOnly,
      disabled
    } = this.props;
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
        {valueBindProp && <textarea ref={(el) => {this.$input = el;}} autoFocus={autoFocus} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus}></textarea>}
        {!valueBindProp && <textarea ref={(el) => {this.$input = el;}} autoFocus={autoFocus} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus}></textarea>}
        <pre ref={(el) => {this.$pre = el;}} style={{left: preLeft, right: preRight}}><span>{value}</span></pre>
      </div>);
    }
    // textarea类型
    if (type === 'textarea') {
      // 如果值绑定属性,则只有通过父组件的prop来改变值
      if (valueBindProp) {
        return <textarea ref={(el) => {this.$input = el;}} {...inputAttribute} autoFocus={autoFocus} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-area${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}></textarea>;
      }
      return <textarea ref={(el) => {this.$input = el;}} {...inputAttribute} autoFocus={autoFocus} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-area${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}></textarea>;
    }
    // 其它类型
    if (valueBindProp) { // 如果值绑定属性,则只有通过父组件的prop来改变值
      return <input ref={(el) => {this.$input = el;}} {...inputAttribute} max={max} min={min} autoFocus={autoFocus} type={type} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-text${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}/>;
    }
    return <input ref={(el) => {this.$input = el;}} {...inputAttribute} max={max} min={min} autoFocus={autoFocus} type={type} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-text${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}/>;
  }
  // 非valueBindProp时, 更新清除按钮状态
  updateShowClear = (value) => {
    const {readOnly, disabled, clear, valueBindProp} = this.props;
    if (valueBindProp) return;
    if (readOnly || disabled || !clear) {
      this.setState({
        showClear: false
      });
      return;
    }
    let showClear = false;
    if (value) {
      showClear = true;
    } else {
      showClear = false;
    }
    this.setState({
      showClear: showClear
    });
  }
  render() {
    const {
      type,
      valueBindProp,
      pre,
      // 容器
      onClick,
      // 文本框
      inputAttribute = {},
      autoFocus,
      maxLength,
      max,
      min,
      digits,
      readOnly,
      disabled,

      value,
      placeholder,
      // 文本框事件
      onChange,
      onBlur,
      onFocus,
      // 左右图标
      liconAttribute,
      licon,
      riconAttribute,
      ricon,
      // 清除按键
      clear,
      clearAttribute,
      // 右侧内容
      rcaption,
      ...othres
    } = this.props;
    // 支持valueBindProp和非valueBindProp两种模式的清空按钮控制
    let showClear = false;
    if (value && !readOnly && !disabled) {
      showClear = true;
    } else {
      showClear = false;
    }
    let isShowClear = valueBindProp ? showClear : this.state.showClear;
    return (<div ref={(el) => {this.$el = el;}} {...othres} className={`input-text-box${othres.className ? ' ' + othres.className : ''}`} onClick={this.onClick}>
        {licon && licon}
        {liconAttribute && liconAttribute.className && <i {...liconAttribute} className={`icon${liconAttribute.className ? ' ' + liconAttribute.className : ''}`}></i>}
        {this.getInputDOM()}
        {/* clearicon仅用于点击区分, 没有实际的样式用途 */}
        {clear && <i {...clearAttribute} className={`icon clearicon${isShowClear ? '' : ' hide'}${clearAttribute ? ' ' + clearAttribute.className : ' ricon close-icon-clear size18'}`}></i>}
        {riconAttribute && riconAttribute.className && <i {...riconAttribute} className={`icon${riconAttribute.className ? ' ' + riconAttribute.className : ''}`}></i>}
        {ricon && ricon}
        {rcaption && rcaption}
      </div>);
  }
}
