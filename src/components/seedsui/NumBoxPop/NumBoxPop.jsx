import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from './../Alert/Alert.jsx';
import NumBox from './../NumBox/NumBox.jsx';
import {createPortal} from 'react-dom';
export default class NumBoxPop extends Component {
  static propTypes = {
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func,
    title: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    digits: PropTypes.number,
    value: PropTypes.string,
    args: PropTypes.array
  }
  static defaultProps = {
    title: '修改购买数量',
    min: 0,
    max: 99999,
    digits: 0,
    value: '0',
    args: []
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '1'
    }
  }
  onChange = (value) => {
    this.setState({
      value: value
    });
  }
  onClickSubmit = () => {
    const {onClickSubmit, args} = this.props;
    if (onClickSubmit) onClickSubmit(this.state.value, ...args);
  }
  onShowed = () => {
    setTimeout(() => {
      this.$numbox.$number.focus();
      this.$numbox.$number.select();
    }, 400);
  }
  onHid = () => {
    // console.log('隐藏');
  }
  // Render
  render() {
    const {show, title, onClickCancel, min, max, digits} = this.props;
    return createPortal(
      <Alert title={title} show={show} onClickSubmit={this.onClickSubmit} onClickCancel={onClickCancel} onShowed={this.onShowed} onHid={this.onHid}>
        <NumBox ref={(el) => {this.$numbox = el}} min={min} max={max} digits={digits} autoFocus={true} value={this.state.value} style={{display: '-webkit-box', margin: '0 auto'}} className="xl" onChange={this.onChange}/>
      </Alert>,
      document.body
    );
  }
}
