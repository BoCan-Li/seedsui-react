// require PrototypeMath.js, 用于解决加减法精度丢失的问题
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NumBox extends Component {
  static propTypes = {
    // 容器
    disabled: PropTypes.bool,
    // 加减号
    plusAttribute: PropTypes.object,
    minusAttribute: PropTypes.object,
    // 文本框
    inputAttribute: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    digits: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]),
    max: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    min: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
    maxLength: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool, // 设置非空时, 会自动补一个合法值
    // 自动获取焦点
    autoFocus: PropTypes.bool, // 渲染时自动获取焦点
    autoSelect: PropTypes.bool, // 渲染时自动选中
    // 左右图标
    licon: PropTypes.node,
    liconAttribute: PropTypes.object,
    ricon: PropTypes.node,
    riconAttribute: PropTypes.object,
    // 清除按键
    clear: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    clearAttribute: PropTypes.object,
    // events
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    fail: PropTypes.func
  }
  static defaultProps = {
    maxLength: '16'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    if (this.props.autoFocus) {
      this.autoFocus();
    }
  }
  // 失去焦点
  onBlur = (e) => {
    const {
      readOnly,
      disabled,
      required,
      value,
      min,
      onChange,
      onBlur
    } = this.props;
    if (readOnly || disabled) {
      return;
    }
    // 如果value和框内值不等, 设置为相等
    if (this.$input && this.$input.value !== value) {
      this.$input.value = value;
    }
    // 失去焦点时只校验非空、最小值
    const val = Math.Calc.correctNumber(value, {required, min});
    if (onChange && '' + val !== '' + value) onChange(e, val);
    if (onBlur) onBlur(e, val);
  };
  // 获取焦点
  onFocus = (e) => {
    const {readOnly, disabled, onFocus} = this.props;
    if (readOnly || disabled) {
      e.target.blur();
      return;
    }
    if (onFocus) onFocus(e, this.props.value);
  };
  // 点击加减号清除时获取焦点
  autoFocus = () => {
    if (this.props.disabled || this.props.readOnly || !this.$input) return;
    this.$input.focus();
    if (this.props.autoSelect) this.$input.select();
    // 修复兼容ios12的bug, 与全局的回弹并不冲突, 这里主要解决点击加减号时获取焦点, 不回弹的问题
    var iosExp = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
    if (iosExp && iosExp[1] && iosExp[1] > '12') {
      // 兼容输入法把页面顶上去, 不回弹的问题
      if (window.inputToggleTimeout) {
        window.clearTimeout(window.inputToggleTimeout);
      }
      if (!this.$input.getAttribute('ios-bug-blur')) {
        this.$input.setAttribute('ios-bug-blur', '1');
        this.$input.addEventListener('blur', () => {
          window.inputToggleTimeout = window.setTimeout(() => {
            document.getElementById('root').scrollIntoView();
          }, 100);
        }, false);
      }
    }
  }
  // 修改值
  onChange = (e) => {
    if (e.target.validity.badInput) {
      e.target.value = '';
    }
    // 输入时只校验最大值、小数点、最大长度、返回错误
    const {max, digits, maxLength, fail} = this.props;
    var value = Math.Calc.correctNumber(e.target.value, {max, digits, maxLength, fail});
    if (this.props.onChange) this.props.onChange(e, value);
  };
  // 点击文本框, 逢0清空
  onClickInput = (e) => {
    const {
      inputAttribute = {}
    } = this.props;
    var value = e.target.value;
    if (value - 0 === 0) {
      e.target.value = '';
    }
    if (inputAttribute.onClick) inputAttribute.onClick(e, value);
  }
  // 点击减
  onClickMinus = (e) => {
    const {
      onChange,
      minusAttribute = {}
    } = this.props;
    let value = Math.Calc.correctNumber(Math.Calc.subtract(this.$input.value, 1), this.props);
    // Callback
    if (onChange) onChange(e, value);
    if (minusAttribute.onClick) minusAttribute.onClick(e, value);
    this.autoFocus();
  };
  // 点击加
  onClickPlus = (e) => {
    const {
      onChange,
      plusAttribute = {}
    } = this.props;
    let value = Math.Calc.correctNumber(Math.Calc.add(this.$input.value, 1), this.props);
    // Callback
    if (onChange) onChange(e, value);
    if (plusAttribute.onClick) plusAttribute.onClick(e, value);
    this.autoFocus();
  };
  // 点击容器
  onClick = (e) => {
    e.stopPropagation();
    const {
      clear, onClick, liconAttribute = {}, riconAttribute = {}
    } = this.props;
    if (this.props.disabled) return;
    var target = e.target;
    if (clear && target.classList.contains('clearicon')) {
      this.onClear(e);
    }
    if (liconAttribute.onClick && target.classList.contains('licon')) {
      liconAttribute.onClick(e, this.$input.value);
      return;
    }
    if (riconAttribute.onClick && target.classList.contains('ricon')) {
      riconAttribute.onClick(e, this.$input.value);
      return;
    }
    if (target.classList.contains('numbox-input')) {
      this.onClickInput(e);
      return;
    }
    if (target.classList.contains('numbox-button-plus')) {
      this.onClickPlus(e);
      return;
    }
    if (target.classList.contains('numbox-button-minus')) {
      this.onClickMinus(e);
      return;
    }
    if (onClick) onClick(e, this.$input.value);
  }
  // 点击清除
  onClear = (e) => {
    this.autoFocus();
    // 赋值
    if (this.props.clear && typeof this.props.clear === 'function') this.props.clear(e, '');
    if (this.props.onChange) {
      this.props.onChange(e, '');
    }
    e.stopPropagation();
  }
  // render
  getInputDOM = () => {
    const {
      disabled,
      readOnly,
      inputAttribute = {},
      value,
      placeholder,
      max,
      min
    } = this.props;
    return <input
      ref={(el) => {this.$input = el;}}
      type="number"
      {...inputAttribute}
      className={`numbox-input${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}
      value={value}
      min={min}
      max={max}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={this.onChange}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
    />;
  }
  // 过滤已经回调的属性
  filterProps = (props) => {
    if (!props) return props;
    var propsed = {}
    for (let n in props) {
      if (n !== 'onClick') {
        propsed[n] = props[n]
      }
    }
    return propsed;
  }
  render() {
    let {
      // 容器
      disabled,
      // 加减号
      plusAttribute = {},
      minusAttribute = {},
      // 文本框
      inputAttribute,
      value,
      digits,
      max,
      min,
      placeholder,
      maxLength,
      readOnly,
      required, // 设置非空时, 会自动补一个合法值
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
      // events
      onClick,
      onChange,
      onBlur,
      onFocus,
      fail,
      ...others
    } = this.props;
    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    liconAttribute = this.filterProps(liconAttribute)
    riconAttribute = this.filterProps(riconAttribute)
    clearAttribute = this.filterProps(clearAttribute)
    return (
      <div ref={el => {this.$el = el;}} {...others} disabled={(min >= max) || disabled} className={`numbox${others.className ? ' ' + others.className : ''}`} onClick={this.onClick}>
        <input
          ref={(el) => {this.$minus = el;}}
          value="-"
          disabled={!isNaN(min) ? min - value >= 0 : false}
          {...plusAttribute}
          type="button"
          className={`numbox-button numbox-button-minus${plusAttribute.className ? ' ' + plusAttribute.className : ''}`}
        />
        {licon && licon}
        {liconAttribute && <i {...liconAttribute} className={`licon icon${liconAttribute.className ? ' ' + liconAttribute.className : ''}`}></i>}
        {this.getInputDOM()}
        {/* clearicon仅用于点击区分, 没有实际的样式用途 */}
        {clear && value && !readOnly && !disabled && <i {...clearAttribute} className={`icon clearicon${clearAttribute.className ? ' ' + clearAttribute.className : 'ricon close-icon-clear size18'}`}></i>}
        {riconAttribute && <i {...riconAttribute} className={`ricon icon${riconAttribute.className ? ' ' + riconAttribute.className : ''}`}></i>}
        {ricon && ricon}
        <input
          ref={(el) => {this.$plus = el;}}
          value="+"
          disabled={!isNaN(max) ? max - value <= 0 : false}
          {...minusAttribute}
          type="button"
          className={`numbox-button numbox-button-plus${minusAttribute.className ? ' ' + minusAttribute.className : ''}`}
        />
      </div>
    );
  }
}
