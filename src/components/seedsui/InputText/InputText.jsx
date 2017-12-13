import React from 'react';
import InputBase from 'components/seedsui/NumBox/InputBase.jsx';

export default class InputBox extends InputBase {
  constructor(props) {
    super(props);
  }
  render() {
    const { type, max, min, style, className, placeholder, name, onChange } = this.props;
    let dom = null;
    if (type === 'number') {
      dom = <input type="number" max={max} min={min} className={'input-text' + (className ? ' ' + className : '')} placeholder={placeholder} value={this.props.value} onBlur={this.onBlur} onClick={this.onClick} onChange={this.onInput} />;
    } else {
      dom = <input type={type} className={'input-text' + (className ? ' ' + className : '')} placeholder={placeholder} style={style} name={name} onChange={onChange} />;
    }
    return dom;
  }
}
