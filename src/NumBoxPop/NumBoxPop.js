import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from './../Alert';
import NumBox from './../NumBox';

export default class NumBoxPop extends Component {
  static propTypes = {
    args: PropTypes.any,
    // 容器
    caption: PropTypes.string,
    // 文本框
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    // events
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func,
  }
  static defaultProps = {
    caption: '修改购买数量'
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
  onClickSubmit = (args) => {
    if (this.props.onClickSubmit) this.props.onClickSubmit(this.state.value, args);
  }
  onClickCancel = (args) => {
    const {value} = this.props;
    this.setState({
      value: value
    });
    if (this.props.onClickCancel) this.props.onClickCancel(value, args);
  }
  render() {
    const {
      args,
      caption,
      value,
      onClickCancel, onClickSubmit,
      ...others
    } = this.props;
    return (
      <Alert args={args} ref={el => {this.$el = el;}} duration={0} caption={caption} show onClickSubmit={this.onClickSubmit} onClickCancel={this.onClickCancel}>
        <NumBox
          ref={(el) => {this.$numbox = el}}
          value={this.state.value}
          style={{margin: '0 auto'}}
          className="flex xl"
          onChange={this.onChange}
          autoFocus
          autoSelect
          {...others}
        />
      </Alert>
    );
  }
}
