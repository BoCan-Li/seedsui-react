import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './handsign.js';

export default class Handsign extends Component {
  static propTypes = {
    width: PropTypes.string, // 宽度
    height: PropTypes.string, // 高度
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    style: PropTypes.object,
    className: PropTypes.string,
    img: PropTypes.object,
    text: PropTypes.object
  }
  static defaultProps = {
    width: '300',
    height: '300'
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  componentDidMount () {
    if (this.state.instance) return
    var instance = new Instance(this.$el);
    this.setState({
      instance
    });
  }
  render() {
    const {style, className, ...others} = this.props;
    return (
      <canvas ref={el => {this.$el = el;}} className={className} style={style} {...others}>Canvas画板</canvas>
    );
  }
}
