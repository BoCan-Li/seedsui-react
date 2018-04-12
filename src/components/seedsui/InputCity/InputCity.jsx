import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickerCity from './../Picker/PickerCity.jsx';
import Icon from './../Icon/Icon.jsx';
import Close from './../Close/Close.jsx';

export default class InputCity extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool, // 值是否绑定属性
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
    // 左右图标
    liconClassName: PropTypes.string,
    riconClassName: PropTypes.string,
    // 清除按键
    clearClassName: PropTypes.string,
    clearIconClassName: PropTypes.string,
    onClear: PropTypes.func,
    // 阈值控制
    type: PropTypes.string, // area | city
    onChange: PropTypes.func
  }
  static defaultProps = {
    type: 'area',
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
  onClick = () => {
    this.setState({
      show: !this.state.show
    });
  }
  onClickSubmit = (e) => {
    let text = e.activeText;
    let options = e.activeOptions;
    
    // 赋值
    if (!this.props.valueBindProp) this.$input.value = text;
    this.setState({
      show: !this.state.show
    });
    if (this.props.onChange) {
      this.props.onChange(text, options, this.getArgs(e));
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
    this.$input.focus();
    if (!this.props.valueBindProp) this.$input.value = '';
    if (this.props.onClear) this.props.onClear();
    if (this.props.onChange) {
      this.props.onChange('', this.getArgs(e));
    }
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
      className, style,
      liconClassName,
      value,
      riconClassName,
      clearClassName, clearIconClassName, onClear,
      type
    } = this.props;
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
    return [DOM, <PickerCity key="pickercity" value={value} show={this.state.show} onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onClickMask={this.onClickMask} type={type}/>];
  }
}
