import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectPicker from './../SelectPicker';
import Icon from './../Icon';
import Close from './../Close';

export default class InputPicker extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    multiple: PropTypes.bool, // 是否允许多选
    // 容器
    // args: PropTypes.array,
    style: PropTypes.object,
    className: PropTypes.string,
    // 文本框
    inputStyle: PropTypes.object,
    inputClassName: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    // 选择框
    pickerStyle: PropTypes.object,
    pickerClassName: PropTypes.string,
    // 左右图标
    liconClassName: PropTypes.string,
    riconClassName: PropTypes.string,
    // 清除按键
    clearClassName: PropTypes.string,
    clearIconClassName: PropTypes.string,
    onClear: PropTypes.func,
    // 数据与事件
    list: PropTypes.array, // [key: '', value: '']
    onChange: PropTypes.func
  }
  static defaultProps = {
    multiple: false,
    args: null,
    value: '',
    readOnly: false,
    disabled: false
  }
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
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
  // 点击文本框
  onClick = () => {
    this.setState({
      show: !this.state.show
    });
  }
  onClickSubmit = (e) => {
    const value = this.getValueByOptions(e.activeOptions);
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = value;
    this.setState({
      show: !this.state.show
    });
    if (this.props.onChange) {
      this.props.onChange(e, this.getArgs(e));
    }
  }
  onClickCancel = () => {
    this.setState({
      show: !this.state.show
    });
  }
  onClickMask = () => {
    this.setState({
      show: !this.state.show
    });
  }
  onClear = (e) => {
    if (!this.props.valueBindProp) this.$input.value = '';
    if (this.props.onClear) this.props.onClear(this.getArgs(e));
    if (this.props.onChange) this.props.onChange('', this.getArgs(e));
  }
  getValueByOptions = (options) => {
    const value = options.map((item) => {
      return item.value;
    });
    return value.join(',');
  }
  getInputDOM = () => {
    const {
      valueBindProp,
      inputClassName, inputStyle, value, placeholder, name, disabled
    } = this.props;
    // 如果值绑定属性,则只有通过父组件的prop来改变值
    if (valueBindProp) {
      return <input key="input" ref={(el) => {this.$input = el;}} type="text" value={value}  disabled={disabled} readOnly placeholder={placeholder} name={name} onClick={this.onClick} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
    }
    return <input key="input" ref={(el) => {this.$input = el;}} type="text" defaultValue={value} disabled={disabled} readOnly placeholder={placeholder} name={name} onClick={this.onClick} className={`input-text${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle}/>;
  }
  render() {
    const {
      multiple,
      className, style,
      liconClassName,
      riconClassName,
      clearClassName, clearIconClassName, onClear,
      list,
      pickerStyle, pickerClassName
    } = this.props;
    let value = this.props.value;
    if (this.$input) {
      value = this.$input.value;
    }
    let DOM = null;
    if (!liconClassName && !riconClassName && !onClear) {
      DOM = this.getInputDOM();
    } else {
      DOM = (<div key="inputbox" className={`attribute${className ? ' ' + className : ''}`} style={style}>
        {liconClassName && <Icon className={`color-placeholder ${liconClassName}`}/>}
        {this.getInputDOM()}
        {onClear && <Close onClick={this.onClear} className={`${clearClassName ? clearClassName : ''} ${value.length === 0 ? 'hide' : ''}`} iconClassName={clearIconClassName}/>}
        {riconClassName && <Icon className={`color-placeholder ${riconClassName}`}/>}
      </div>);
    }
    return [DOM, <SelectPicker style={pickerStyle} className={pickerClassName} multiple={multiple} key="picker" show={this.state.show} onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask} list={list} value={value}/>];
  }
}
