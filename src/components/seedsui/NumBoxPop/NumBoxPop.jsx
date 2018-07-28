import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from './../Alert';
import NumBox from './../NumBox';
export default class NumBoxPop extends Component {
  static propTypes = {
    args: PropTypes.any,
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
        }, () => {
          this.focusValue();
        });
      }
    }
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
  focusValue = () => {
    this.$numbox.$input.focus();
    setTimeout(() => {
      this.$numbox.onFocus();
      this.$numbox.$input.select();
    }, 100);
  }
  onClickCancel = () => {
    this.$numbox.$input.value = this.props.value;
    if (this.props.onClickCancel) this.props.onClickCancel();
  }
  render() {
    const {show, caption, min, max, digits} = this.props;
    return (
      <Alert ref={el => {this.$el = el;}} duration={0} caption={caption} show={show} onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel}>
        <NumBox ref={(el) => {this.$numbox = el}} min={min} max={max} digits={digits} changeFocus value={this.state.value} style={{display: '-webkit-box', margin: '0 auto'}} className="xl" onChange={this.onChange}/>
      </Alert>
    );
  }
}
