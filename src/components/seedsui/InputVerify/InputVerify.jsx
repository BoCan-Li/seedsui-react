import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon';
import Close from './../Close';

export default class InputValicode extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    // 容器
    // args: PropTypes.array,
    style: PropTypes.object,
    className: PropTypes.string,
    // 文本框
    value: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    maxLength: PropTypes.string,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onError: PropTypes.func,
    // 左右图标
    liconClassName: PropTypes.string,
    riconClassName: PropTypes.string,
    // 清除按键
    clearClassName: PropTypes.string,
    clearIconClassName: PropTypes.string,
    onClear: PropTypes.func,
    // 发送验证码
    sentDisabled: PropTypes.bool,
    sentCaption: PropTypes.string,
    second: PropTypes.number,
    onClickSent: PropTypes.func
  }
  static defaultProps = {
    args: null,
    value: '',
    readOnly: false,
    disabled: false,
    sentDisabled: false,
    sentCaption: '发送验证码',
    second: 10,
  }
  constructor(props) {
    super(props);
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event')) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onChange = (e) => {
    var target = e.target;
    var value = this.correct(target.value);
    // 赋值
    if (!this.props.valueBindProp) target.value = value;
    if (this.props.onChange) {
      this.props.onChange(value, this.getArgs(e));
    }
  }
  onBlur = (e) => {
    var target = e.target;
    var value = target.value;
    if (this.props.onBlur) {
      this.props.onBlur(value, this.getArgs(e));
    }
  }
  onClear = (e) => {
    this.$input.focus();
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = '';
    if (this.props.onClear) this.props.onClear(this.getArgs(e));
    if (this.props.onChange) this.props.onChange('', this.getArgs(e));
  }
  onClickSent = () => {
    if (this.props.onClickSent) this.props.onClickSent();
  }
  correct = (value) => {
    let val = value;
    // 如果输入的不是一个正整数，则转为正整数
    if (!/^[0-9]{1,}[0-9]*$/.test(value)) {
      const result = value.match(/[0-9]{1,}[0-9]*/);
      val = result ? result[0] : '';
      // callback onError
      if (this.props.onError) this.props.onError('必须要输入数字哦');
    }
    if (this.props.maxLength && val && val.length > this.props.maxLength) {
      val = val.slice(0, this.props.maxLength);
      // callback onError
      if (this.props.onError) this.props.onError('不能大于' + this.props.maxLength + '位');
    }
    return val;
  }
  getInputDOM = () => {
    const {
      valueBindProp,
      inputClassName, inputStyle, maxLength, value, placeholder, name, readOnly, disabled, onClick,
    } = this.props;
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return <input ref={(el) => {this.$input = el;}} type="number" value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onInput={this.onChange} onClick={onClick} onBlur={this.onBlur} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
    }
    return <input ref={(el) => {this.$input = el;}} type="number" defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} placeholder={placeholder} name={name} onInput={this.onChange} onClick={onClick} onBlur={this.onBlur} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
  }
  render() {
    const {
      style, className,
      value,
      liconClassName,
      riconClassName,
      clearClassName, clearIconClassName, onClear,
      sentCaption, sentDisabled
    } = this.props;

    return (<div className={`attribute${className ? ' ' + className : ''}`} style={style}>
      {liconClassName && <Icon className={`color-placeholder ${liconClassName}`}/>}
      {this.getInputDOM()}
      {onClear && <Close onClick={this.onClear} className={`${clearClassName ? clearClassName : ''} ${value.length === 0 ? 'hide' : ''}`} iconClassName={clearIconClassName}/>}
      {riconClassName && <Icon className={`color-placeholder ${riconClassName}`}/>}
      <span className="rsent-splitter">|</span><a onClick={this.onClickSent} disabled={sentDisabled} className="rsent-button">{sentCaption}</a>
    </div>);
  }
}
