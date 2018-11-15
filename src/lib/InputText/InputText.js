import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon';
import Close from './../Close';

export default class InputText extends Component {
  static propTypes = {
    type: PropTypes.string, // 类型: text, password
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    pre: PropTypes.bool, // 自动扩充功能
    // 容器
    args: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    // 文本框
    autoFocus: PropTypes.bool,
    name: PropTypes.string,
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
      PropTypes.number
    ]),
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,

    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onClickInput: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
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
    // 右侧内容
    rcaption: PropTypes.node
  }
  static defaultProps = {
    type: 'text',
    value: '',
    readOnly: false,
    disabled: false,
    digits: false,
    clearClassName: 'ricon close-icon-clear size18'
  }
  constructor(props) {
    super(props);
    this.state = {
      clearUpdate: props.value && props.clear // 小叉叉DOM更新, !valueBindProp状态时不会更新DOM, 所以用state变态的方法触发更新DOM
    }
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  // 点击容器
  onClick = (e) => {
    e.stopPropagation();
    const {onClick, onClickInput, onClickLicon, onClickRicon} = this.props;
    if (this.props.disabled) return;
    var target = e.target;
    if (target.classList.contains('clearicon')) {
      this.onClear(e);
    } else if (target.classList.contains('licon')) {
      if (onClickLicon) onClickLicon(this.$input.value, this.getArgs(e));
    } else if (target.classList.contains('ricon')) {
      if (onClickRicon) onClickLicon(this.$input.value, this.getArgs(e));
    } else if (target.classList.contains('input-text')) {
      if (onClick) onClick(this.$input.value, this.getArgs(e));
      if (onClickInput) onClickInput(this.$input.value, this.getArgs(e));
    } else {
      if (onClick) onClick(this.$input.value, this.getArgs(e));
    }
  }
  // 手机号码纠正
  correctPhone = (value) => {
    let val = value;
    // 如果输入的不是一个正整数，则转为正整数
    if (isNaN(value)) {
      const result = value.match(/[0-9]{1,}/);
      if (result) val = result[0];
      else val = '';
      // callback onError
      if (this.props.onError) this.props.onError({msg: '必须要输入数字哦'});
    }
    return val;
  }
  // 数字框纠正
  correctNumber = (value) => {
    if (value === '') return '';
    var num = Number(value);
    if (isNaN(num)) return '';
    // 判断是否超出限制
    const {max, min, digits} = this.props;
    if (!isNaN(max) && num > max) {
      // callback onError
      if (this.props.onError) this.props.onError({msg: '最大不能超过' + max});
      return '' + max;
    }
    if (!isNaN(min) && num < min) {
      // callback onError
      if (this.props.onError) this.props.onError({msg: '最小不能小于' + min});
      return '' + min;
    }
    var val = value;
    // 截取小数位数
    if (!isNaN(digits)) {
      if (String(num).indexOf('.') >= 0) {
        var numStr = String(num);
        val = numStr.substring(0, numStr.indexOf('.') + (Number(digits) === 0 ? 0 : digits + 1));
      }
    }
    // 最大长度限制
    if (this.props.maxLength && val && val.length > this.props.maxLength) {
      val = val.slice(0, this.props.maxLength);
    }
    return '' + val;
  };
  // 自动扩充功能
  preAutoSize = () => {
    this.$input.style.height = this.$pre.clientHeight + 'px';
  }
  // 文本框事件
  onChange = (e) => {
    var target = e.target;
    var value = target.value;
    const {valueBindProp, type, onChange} = this.props;
    // 自动扩充功能
    if (this.props.pre) {
      this.$pre.children[0].innerText = value;
      this.preAutoSize();
    }
    // 手机组件
    if (type === 'phone') {
      value = this.correctPhone(value);
    // 数字组件
    } else if (type === 'number') {
      // target.validity.badInput
      value = this.correctNumber(value.toString());
    }
    // onChange
    if (!valueBindProp) target.value = value;
    if (onChange) onChange(value, this.getArgs(e));
    // 是否显示小叉叉
    if (this.props.clear && !this.props.valueBindProp) {
      this.setState({
        clearUpdate: false
      });
    }
  }
  onBlur = (e) => {
    var target = e.target;
    var value = target.value;
    if (this.props.onBlur) {
      this.props.onBlur(value, this.getArgs(e));
    }
  }
  onFocus = (e) => {
    var target = e.target;
    var value = target.value;
    if (this.props.onFocus) {
      this.props.onFocus(value, this.getArgs(e));
      e.stopPropagation();
    }
    if (this.props.readOnly) {
      target.blur();
    }
  }
  // 点击清除
  onClear = (e) => {
    this.$input.focus();
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = '';
    if (this.props.clear && typeof this.props.clear !== 'boolean') this.props.clear();
    if (this.props.onChange) {
      this.props.onChange('', this.getArgs(e));
    }
    // 自动扩充功能
    if (this.props.pre) {
      this.preAutoSize();
    }
    // 是否显示小叉叉
    if (this.props.clear && !this.props.valueBindProp) {
      this.setState({
        clearUpdate: false
      });
    }
    e.stopPropagation();
  }
  getInputDOM = () => {
    const {
      args, style, className, onClick, max, min, digits, onChange, onClickInput, onBlur, onFocus,
      licon, liconSrc, liconClassName, liconStyle, onClickLicon, liconLazyLoad,
      ricon, riconSrc, riconClassName, riconStyle, onClickRicon, riconLazyLoad,
      clear, clearClassName, clearStyle,
      rcaption, // 为others不多属性
      pre, // 自动伸缩文本框
      type,
      valueBindProp,
      autoFocus, inputClassName, inputStyle, maxLength, value, placeholder, name, readOnly, disabled,
      ...others
    } = this.props;
    // pre类型
    if (pre) {
      // pre的左右padding
      let preLeft = 0;
      let preRight = 0;
      if (inputStyle) {
        if (inputStyle.padding) {
          const paddingValues = inputStyle.padding.split(' ');
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
        } else if (inputStyle.paddingLeft || inputStyle.paddingRight) {
          preLeft = inputStyle.paddingLeft || '0';
          preRight = inputStyle.paddingRight || '0';
        }
      }
      return (<div className={`input-pre-box${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}>
        {valueBindProp && <textarea autoFocus={autoFocus} ref={(el) => {this.$input = el;}} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} name={name} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} {...others}></textarea>}
        {!valueBindProp && <textarea autoFocus={autoFocus} ref={(el) => {this.$input = el;}} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} name={name} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} {...others}></textarea>}
        <pre ref={(el) => {this.$pre = el;}} style={{left: preLeft, right: preRight}}><span>{value}</span></pre>
      </div>);
    }
    // textarea类型
    if (type === 'textarea') {
      // 如果值绑定属性,则只有通过父组件的prop来改变值
      if (valueBindProp) {
        return <textarea autoFocus={autoFocus} ref={(el) => {this.$input = el;}} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-area${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} {...others}></textarea>;
      }
      return <textarea autoFocus={autoFocus} ref={(el) => {this.$input = el;}} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onInput={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-area${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} {...others}></textarea>;
    }
    // 其它类型
    let inputType = type;
    switch (type) {
      case 'phone':
        inputType = 'tel';
        break;
      default:
        inputType = type;
    }
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return <input autoFocus={autoFocus} ref={(el) => {this.$input = el;}} type={inputType} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} {...others}/>;
    }
    return <input autoFocus={autoFocus} ref={(el) => {this.$input = el;}} type={inputType} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onInput={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} {...others}/>;
  }
  render() {
    const {
      value,
      className, style,
      licon, liconSrc, liconClassName, liconStyle, liconLazyLoad,
      ricon, riconSrc, riconClassName, riconStyle, riconLazyLoad,
      clear, clearClassName, clearStyle,
      rcaption
    } = this.props;
    let isShowClear = this.state.clearUpdate;
    if (!this.props.valueBindProp) {
      if (this.$input) {
        if (this.$input.value.length && clear) isShowClear = true;
      }
    } else {
      if (value && clear) isShowClear = true;
    }
    return (<div className={`input-text-box${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}>
        {(liconSrc || liconClassName) && <Icon lazyLoad={liconLazyLoad} className={`licon${liconClassName ? ' ' + liconClassName : ''}`} src={liconSrc} style={liconStyle}/>}
        {licon && licon}
        {this.getInputDOM()}
        {clear && <Close className={`clearicon ${isShowClear ? '' : 'hide'}${clearClassName ? ' ' + clearClassName : ''}`} style={clearStyle}/>}
        {(riconSrc || riconClassName) && <Icon lazyLoad={riconLazyLoad} className={`ricon size16${riconClassName ? ' ' + riconClassName : ''}`} src={riconSrc} style={riconStyle}/>}
        {ricon && ricon}
        {rcaption && rcaption}
      </div>);
  }
}
