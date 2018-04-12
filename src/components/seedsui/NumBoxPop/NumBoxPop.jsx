import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from './../Alert/Alert.jsx';
import NumBox from './../NumBox/NumBox.jsx';
export default class NumBoxPop extends Component {
  static propTypes = {
    valueBindProp: PropTypes.bool, // 值是否绑定属性
    // 文本框
    value: PropTypes.string,
    // events
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func,
    show: PropTypes.bool,
    caption: PropTypes.string,
    // rule设置
    min: PropTypes.number,
    max: PropTypes.number,
    digits: PropTypes.number,
  }
  static defaultProps = {
    show: false,
    caption: '修改购买数量',
    min: 0,
    max: 99999,
    digits: 0,
    value: '0',
    args: null
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '1'
    }
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.show !== this.props.show) {
      this.setState({
        show: this.props.show
      });
      // 当此组件显示时,重新注入值
      if (this.props.show === true) {
        this.setState({
          value: this.props.value
        });
      }
    }
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
  onChange = (value) => {
    this.setState({
      value: value
    });
  }
  onClickSubmit = (e) => {
    e.hide();
    const {onClickSubmit} = this.props;
    if (onClickSubmit) onClickSubmit(this.state.value, this.getArgs(e));
  }
  onShowed = () => {
    this.$numbox.$input.focus();
    this.$numbox.$input.select();
  }
  onClickCancel = () => {
    this.$numbox.$input.value = this.props.value;
    if (this.props.onClickCancel) this.props.onClickCancel();
  }
  render() {
    const {valueBindProp, show, caption, min, max, digits} = this.props;
    return (
      <Alert duration={0} caption={caption} show={show} onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel} onShowed={this.onShowed}>
        <NumBox ref={(el) => {this.$numbox = el}} min={min} max={max} valueBindProp={valueBindProp} digits={digits} autoFocus={true} value={this.state.value} style={{display: '-webkit-box', margin: '0 auto'}} className="xl" onChange={this.onChange}/>
      </Alert>
    );
  }
}