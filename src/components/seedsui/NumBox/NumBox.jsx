import React from 'react';
import InputBase from './InputBase.jsx';
export default class NumBox extends InputBase {
  static defaultProps = {
    min: 0,
    value: '0',
    args: [],
    readOnly: false
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.disableNum(this.props.value);
  }
  /* componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) {
      this.disableNum(this.props.value);
    }
    if (prevProps.disabled !== this.props.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  } */
  // Render
  render() {
    // const { onError, onChange, digits, max, min, value, style, args } = this.props;
    const {style, className, readOnly, onClick, value, min, max} = this.props;
    return (
      <div style={style} className={`numbox bordered ${this.state.disabled ? 'disabled' : ''} ${readOnly ? 'readonly' : ''} ${className ? className : ''}`} onClick={onClick}>
        <input type="button" className="numbox-button" disabled={this.state.minusDisabled} value="-" onClick={this.onClickMinus} />
        <input type="number" className="numbox-input" value={value} min={min} max={max} onBlur={this.onBlur} onClick={this.onClick} onChange={this.onInput} ref={(el) => {this.$number = el}}/>
        <input type="button" className="numbox-button" disabled={this.state.plusDisabled} value="+" onClick={this.onClickPlus} />
      </div>
    );
  }
}
