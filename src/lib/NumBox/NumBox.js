// require PrototypeMath.js, 用于解决加减法精度丢失的问题
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon';
import Close from './../Close';

export default class NumBox extends Component {
  static propTypes = {
    args: PropTypes.any,
    // 容器
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    // 加减号
    plusStyle: PropTypes.object,
    plusClassName: PropTypes.string,
    minusStyle: PropTypes.object,
    minusClassName: PropTypes.string,
    // 文本框
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    digits: PropTypes.oneOfType([
      PropTypes.bool,
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
    name: PropTypes.string,
    maxLength: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    // 左右图标
    licon: PropTypes.node,
    liconSrc: PropTypes.string,
    liconClassName: PropTypes.string,
    liconStyle: PropTypes.object,
    onClickLicon: PropTypes.func,
    liconLazyLoad: PropTypes.bool,

    ricon: PropTypes.node,
    riconSrc: PropTypes.string,
    riconClassName: PropTypes.string,
    riconStyle: PropTypes.object,
    onClickRicon: PropTypes.func,
    riconLazyLoad: PropTypes.bool,
    // 清除按键
    clear: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func
    ]),
    clearClassName: PropTypes.string,
    clearStyle: PropTypes.object,
    // events
    onClick: PropTypes.func,
    onClickMinus: PropTypes.func,
    onClickPlus: PropTypes.func,
    onClickInput: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onError: PropTypes.func,
  }
  static defaultProps = {
    required: true,
    maxLength: '16',
    readOnly: false,
    clearClassName: 'ricon close-icon-clear size18'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    // const {required} = this.props;
    // var value = this.props.value;
    // if (required) { // 必填项,必须有值
    //   if (value === '') value = this.props.min || '0';
    // }
    // value = Math.Calc.correctNumber(value, this.props);
    // if (this.props.value - value !== 0 && this.props.onChange) this.props.onChange(value);
  }
  // 失去焦点
  onBlur = (e) => {
    const {required, min, onChange, onBlur} = this.props;
    const value = Math.Calc.correctNumberBlur(this.props.value, {required, min});
    if (onChange && '' + value !== '' + this.props.value) onChange(value, Object.getArgs(e, this.props.args));
    if (onBlur) onBlur(value, Object.getArgs(e, this.props.args));
  };
  // 获取焦点
  onFocus = (e) => {
    const {onFocus} = this.props;
    if (onFocus) onFocus(this.props.value, Object.getArgs(e, this.props.args));
  };
  // 点击文本框, 逢0清空
  onClickInput = (e) => {
    var value = e.target.value;
    if (value - 0 === 0) {
      e.target.value = '';
    }
    if (this.props.onClickInput) this.props.onClickInput(value, Object.getArgs(e, this.props.args));
  }
  // Methods
  onChange = (e) => {
    if (e.target.validity.badInput) {
      e.target.value = '';
    }
    var value = Math.Calc.correctNumber(e.target.value, this.props);
    if (this.props.onChange) this.props.onChange(value, Object.getArgs(e, this.props.args));
  };
  // 点击减
  onClickMinus = (e) => {
    let value = Math.Calc.correctNumber(Math.Calc.subtract(this.$input.value, 1), this.props);
    // Callback
    if (this.props.onChange) this.props.onChange(value, Object.getArgs(e, this.props.args));
    if (this.props.onClickMinus) this.props.onClickMinus(value, Object.getArgs(e, this.props.args));
    this.$input.focus();
  };
  // 点击加
  onClickPlus = (e) => {
    let value = Math.Calc.correctNumber(Math.Calc.add(this.$input.value, 1), this.props);
    // Callback
    if (this.props.onChange) this.props.onChange(value, Object.getArgs(e, this.props.args));
    if (this.props.onClickPlus) this.props.onClickPlus(value, Object.getArgs(e, this.props.args));
    this.$input.focus();
  };
  // 点击容器
  onClick = (e) => {
    e.stopPropagation();
    const {
      clear, onClick, onClickLicon, onClickRicon,
      // onClickInput, onClickPlus, onClickMinus
    } = this.props;
    if (this.props.disabled) return;
    var target = e.target;
    if (clear && target.classList.contains('clearicon')) {
      this.onClear(e);
    }
    if (onClickLicon && target.classList.contains('licon')) {
      onClickLicon(this.$input.value, Object.getArgs(e, this.props.args));
      return;
    }
    if (onClickRicon && target.classList.contains('ricon')) {
      onClickLicon(this.$input.value, Object.getArgs(e, this.props.args));
      return;
    }
    if (target.classList.contains('numbox-input')) {
      this.onClickInput(e);
      return;
    }
    if (target.classList.contains('numbox-button-plus-flag')) {
      this.onClickPlus(e);
      return;
    }
    if (target.classList.contains('numbox-button-minus-flag')) {
      this.onClickMinus(e);
      return;
    }
    if (onClick) onClick(this.$input.value, Object.getArgs(e, this.props.args));
  }
  // 点击清除
  onClear = (e) => {
    this.$input.focus();
    // 赋值
    if (this.props.clear && typeof this.props.clear === 'function') this.props.clear('', Object.getArgs(e, this.props.args));
    if (this.props.onChange) {
      this.props.onChange('', Object.getArgs(e, this.props.args));
    }
    e.stopPropagation();
  }
  // render
  getInputDOM = () => {
    const {
      args,
      style, className, disabled, onClick,
      plusStyle, plusClassName, minusStyle, minusClassName, onClickMinus, onClickPlus,
      licon, liconSrc, liconClassName, liconStyle, onClickLicon, liconLazyLoad,
      ricon, riconSrc, riconClassName, riconStyle, onClickRicon, riconLazyLoad,
      clear, clearClassName, clearStyle,
      inputStyle, inputClassName, value, placeholder, maxLength, readOnly, onClickInput, onChange, onError, onBlur, onFocus,
      digits, max, min,
      ...others
    } = this.props;
    return <input
      ref={(el) => {this.$input = el;}}
      type="number"
      value={value}
      min={min}
      max={max}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={this.onChange}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
      // onClick={this.onClickInput}
      className={`numbox-input${inputClassName ? ' ' + inputClassName : ''}`}
      style={inputStyle}
      {...others}
    />;
  }
  render() {
    const {
      min, max, value, style, className, disabled,
      plusStyle, plusClassName, minusStyle, minusClassName,
      licon, liconSrc, liconClassName, liconStyle, liconLazyLoad,
      ricon, riconSrc, riconClassName, riconStyle, riconLazyLoad,
      clear, clearClassName, clearStyle,
    } = this.props;
    return (
      <div ref={el => {this.$el = el;}} disabled={(min >= max) || disabled} style={style} className={`numbox${className ? ' ' + className : ''}`} onClick={this.onClick}>
        <input
          ref={(el) => {this.$minus = el;}}
          type="button"
          className={`numbox-button numbox-button-minus-flag${plusClassName ? ' ' + plusClassName : ''}`}
          style={plusStyle}
          value="-"
          // onClick={this.onClickMinus}
          disabled={!isNaN(min) ? min - value >= 0 : false}
        />
        {(liconSrc || liconClassName) && <Icon lazyLoad={liconLazyLoad} className={`licon${liconClassName ? ' ' + liconClassName : ''}`} src={liconSrc} style={liconStyle}/>}
        {licon && licon}
        {this.getInputDOM()}
        {clear && value && <Close className={`clearicon${clearClassName ? ' ' + clearClassName : ''}`} style={clearStyle} onClick={this.onClear}/>}
        {(riconSrc || riconClassName) && <Icon lazyLoad={riconLazyLoad} className={`ricon size16${riconClassName ? ' ' + riconClassName : ''}`} src={riconSrc} style={riconStyle}/>}
        {ricon && ricon}
        <input
          ref={(el) => {this.$plus = el;}}
          type="button"
          className={`numbox-button numbox-button-plus-flag${minusClassName ? ' ' + minusClassName : ''}`}
          style={minusStyle} value="+"
          // onClick={this.onClickPlus}
          disabled={!isNaN(max) ? max - value <= 0 : false}
        />
      </div>
    );
  }
}
