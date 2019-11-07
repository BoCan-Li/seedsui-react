import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Counter as Instance} from './instance.js';

export default class Counter extends Component {
  static propTypes = {
    duration: PropTypes.number,
    from: PropTypes.number,
    to: PropTypes.number,
    suffix: PropTypes.string, // 后缀
    autoplay: PropTypes.bool, // 是否自动播放
  }
  static defaultProps = {
    duration: 5000,
    from: 0,
    to: 10,
    autoplay: true
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    var instance = new Instance(this.$el);
    if (this.props.autoplay) {
      instance.play();
    }
    this.instance = instance;
  }
  play = () => {
    if (this.instance) {
      this.instance.play();
    }
  }
  render() {
    const {
      duration,
      from,
      to,
      suffix,
      autoplay,
      ...others
    } = this.props;
    return <span ref={el => {this.$el = el;}} {...others} className={`counter${others.className ? ' ' + others.className: ''}`} data-duration={duration} data-from={from} data-to={to} data-suffix={suffix}>1</span>;
  }
}
