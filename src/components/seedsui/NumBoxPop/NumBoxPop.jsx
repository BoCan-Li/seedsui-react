import React from 'react';
import InputBase from './../NumBox/InputBase.jsx';
import Alert from './../Alert/Alert.jsx';
import {createPortal} from 'react-dom';
export default class NumBoxPop extends InputBase {
  static defaultProps = {
    min: 0,
    value: '0',
    args: []
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.disableNum(this.props.value);
  }
  // Render
  render() {
    // const { onError, onChange, digits, max, min, value, style, args } = this.props;
    const { style, show, title, onClickSubmit, onClickCancel } = this.props;
    return createPortal(
      <Alert title={title} show={show} onClickSubmit={onClickSubmit} onClickCancel={onClickCancel}>
        <div style={Object.assign({display: '-webkit-box', margin: '0 auto'}, style)} className={`numbox xl bordered ${this.state.disabled ? 'disabled' : ''}`}>
          <input type="button" className="numbox-button" disabled={this.state.minusDisabled} value="-" onClick={this.onClickMinus} />
          <input type="number" className="numbox-input" value={this.props.value} onBlur={this.onBlur} onClick={this.onClick} onChange={this.onInput} />
          <input type="button" className="numbox-button" disabled={this.state.plusDisabled} value="+" onClick={this.onClickPlus} />
        </div>
      </Alert>,
      document.body
    );
  }
}
