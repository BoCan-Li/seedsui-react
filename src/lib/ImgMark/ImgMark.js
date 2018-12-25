import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class ImgMark extends Component {
  static propTypes = {
    // 数据源
    src: PropTypes.string,
    data: PropTypes.array,
    // canvas样式
    strokeStyle: PropTypes.string,
    lineWidth: PropTypes.number,
    quality: PropTypes.number,
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    width: PropTypes.number, // 宽度
    height: PropTypes.number, // 高度
    style: PropTypes.object,
    className: PropTypes.string
  }
  static defaultProps = {
    strokeStyle: '#00ff00',
    lineWidth: 3,
    quality: 0.92
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  componentDidUpdate (prevProps) {
    if (this.state.instance) {
      if (prevProps.strokeStyle !== this.props.strokeStyle) {
        this.state.instance.setStrokeStyle(this.props.strokeStyle);
      }
      if (prevProps.lineWidth !== this.props.lineWidth) {
        this.state.instance.setLineWidth(this.props.lineWidth);
      }
      if (prevProps.quality !== this.props.quality) {
        this.state.instance.setQuality(this.props.quality);
      }
    }
  }
  componentDidMount () {
    if (this.state.instance) return;
    var instance = new Instance(this.$el, {
      src: this.props.src,
      data: this.props.data,
      height: this.props.height,
      strokeStyle: this.props.strokeStyle,
      lineWidth: this.props.lineWidth,
      quality: this.props.quality
    });
    this.setState({
      instance
    });
  }
  render() {
    const {
      src, data,
      strokeStyle, lineWidth, quality,
      width, height, style, className,
      ...others
    } = this.props;
    return (
      <div className={`imgmark${className ? ' ' + className : ''}`} style={Object({width: width, height: height},style)} {...others}>
        <canvas className={`imgmark-wrapper`} ref={el => {this.$el = el;}}>Canvas画板</canvas>
      </div>
    );
  }
}
