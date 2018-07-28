import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon';
import Close from './../Close';

export default class InputPre extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    // 容器
    args: PropTypes.any,
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
    onBlur: PropTypes.func,
    // 左右图标
    liconClassName: PropTypes.string,
    riconClassName: PropTypes.string,
    // 清除按键
    clearClassName: PropTypes.string,
    clearIconClassName: PropTypes.string,
    onClear: PropTypes.func,
  }
  static defaultProps = {
    args: null,
    value: '',
    readOnly: false,
    disabled: false
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount = () => {
    // this.$pre.style.width = this.$input.clientWidth + 'px';
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args) {
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
  onChange = (e) => {
    var target = e.target;
    var value = target.value;
    // 设置pre的文字
    this.$pre.children[0].innerText = value;
    // 设置尺寸大小
    this.calcSize();
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
    this.calcSize();
    if (this.props.onClear) this.props.onClear(this.getArgs(e));
    if (this.props.onChange) this.props.onChange('', this.getArgs(e));
  }
  calcSize = () => {
    this.$input.style.height = this.$pre.clientHeight + 'px';
  }
  getInputDOM = () => {
    const {
      valueBindProp,
      inputClassName, inputStyle, maxLength, value, placeholder, name, readOnly, disabled,
    } = this.props;
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return (<div className={`input-pre-space${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}>
        <textarea ref={(el) => {this.$input = el;}} value={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} name={name} onChange={this.onChange} onBlur={this.onBlur}></textarea>
        <pre ref={(el) => {this.$pre = el;}}><span>{value}</span></pre>
      </div>);
    }
    return (<div className={`input-pre-space${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}>
      <textarea ref={(el) => {this.$input = el;}} defaultValue={value} maxLength={maxLength} readOnly={readOnly} disabled={disabled} className={`input-pre`} placeholder={placeholder} name={name} onChange={this.onChange} onBlur={this.onBlur}></textarea>
      <pre ref={(el) => {this.$pre = el;}}><span>{value}</span></pre>
    </div>);
  }
  render() {
    const {
      className, style,
      value,
      liconClassName,
      riconClassName,
      clearClassName, clearIconClassName, onClear
    } = this.props;
    let DOM = null;
    if (!liconClassName && !riconClassName && !onClear) {
      DOM = this.getInputDOM();
    } else {
      DOM = (<div className={`attribute${className ? ' ' + className : ''}`} style={style}>
        {liconClassName && <Icon className={`color-placeholder ${liconClassName}`}/>}
        {this.getInputDOM()}
        {onClear && <Close onClick={this.onClear} className={`${clearClassName ? clearClassName : ''} ${value.length === 0 ? 'hide' : ''}`} iconClassName={clearIconClassName}/>}
        {riconClassName && <Icon className={`color-placeholder ${riconClassName}`}/>}
      </div>);
    }
    return DOM;
  }
}
