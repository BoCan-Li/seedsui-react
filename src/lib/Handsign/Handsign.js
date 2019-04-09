import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Handsign extends Component {
  static propTypes = {
    strokeStyle: PropTypes.string,
    lineWidth: PropTypes.number,
    quality: PropTypes.number,
    suffix: PropTypes.string,
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    width: PropTypes.number, // 宽度
    height: PropTypes.number, // 高度
    style: PropTypes.object,
    className: PropTypes.string
  }
  static defaultProps = {
    strokeStyle: '#000',
    lineWidth: 3,
    quality: 0.92,
    width: 300,
    height: 300
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    if (this.instance) {
      if (prevProps.strokeStyle !== this.props.strokeStyle) {
        this.instance.setStrokeStyle(this.props.strokeStyle);
      }
      if (prevProps.lineWidth !== this.props.lineWidth) {
        this.instance.setLineWidth(this.props.lineWidth);
      }
      if (prevProps.quality !== this.props.quality) {
        this.instance.setQuality(this.props.quality);
      }
      if (prevProps.suffix !== this.props.suffix) {
        this.instance.setSuffix(this.props.suffix);
      }
    }
  }
  componentDidMount () {
    if (this.instance) return;
    var instance = new Instance(this.$el, {
      strokeStyle: this.props.strokeStyle,
      lineWidth: this.props.lineWidth,
      quality: this.props.quality,
      suffix: this.props.suffix
    });
    this.instance = instance;
  }
  render() {
    const {
      strokeStyle, lineWidth, quality,
      width, height, style, className,
      ...others
    } = this.props;
    return (
      <canvas ref={el => {this.$el = el;}} className={className} style={style} width={width} height={height} {...others}>Canvas画板</canvas>
    );
  }
}
