import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Counter as Instance} from './counter.js';

export default class Counter extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,

    duration: PropTypes.number,
    from: PropTypes.number,
    to: PropTypes.number,
    suffix: PropTypes.string, // 后缀
  }
  static defaultProps = {
    from: 0
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.init();
  }
  init = () => {
    var instance = new Instance(this.$el);
    instance.play();
    this.setState({
      instance
    });
  }
  render() {
    const {
      style, className,
      duration, from, to, suffix
    } = this.props;
    return <span ref={(el) => {this.$el = el;}} className={`counter${className ? ' ' + className: ''}`} style={style} data-duration={duration} data-from={from} data-to={to} data-suffix={suffix}>1</span>;
  }
}
