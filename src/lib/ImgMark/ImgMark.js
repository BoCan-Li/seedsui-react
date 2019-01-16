import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class ImgMark extends Component {
  static propTypes = {
    // 数据源
    src: PropTypes.string,
    data: PropTypes.array,
    drawBg: PropTypes.bool, // 是否绘制背景
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
    drawBg: true,
    strokeStyle: '#00ff00',
    lineWidth: 3,
    quality: 0.92,
    height: 300
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  componentDidUpdate (prevProps) {
    if (this.state.instance) {
      if (prevProps.drawBg !== this.props.drawBg) {
        this.state.instance.setDrawBg(this.props.drawBg);
        this.state.instance.update();
      }
      if (prevProps.strokeStyle !== this.props.strokeStyle) {
        this.state.instance.setStrokeStyle(this.props.strokeStyle);
        this.state.instance.update();
      }
      if (prevProps.lineWidth !== this.props.lineWidth) {
        this.state.instance.setLineWidth(this.props.lineWidth);
        this.state.instance.update();
      }
      if (prevProps.quality !== this.props.quality) {
        this.state.instance.setQuality(this.props.quality);
        this.state.instance.update();
      }
      if (prevProps.data !== this.props.data) {
        this.state.instance.setData(this.props.data);
        this.state.instance.update();
      }
    }
  }
  componentDidMount () {
    if (this.state.instance) return;
    var instance = new Instance(this.$el, {
      src: this.props.src,
      data: this.props.data,
      drawBg: this.props.drawBg,
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
      src, data, drawBg,
      strokeStyle, lineWidth, quality,
      width, height, style, className,
      ...others
    } = this.props;
    let drawBgStyle = {};
    if (!drawBg) {
      drawBgStyle = {backgroundImage: `url(${src})`};
    }
    return (
      <div className={`imgmark${className ? ' ' + className : ''}`} style={Object({width: width, height: height}, style)} {...others}>
        <div className={`imgmark-loading active`}>
          <div className={`imgmark-loading-icon`}></div>
        </div>
        <canvas ref={el => {this.$el = el;}} className={`imgmark-wrapper`} style={drawBgStyle}>
          Canvas画板
        </canvas>
        <div className={`imgmark-error`}>
          <div className={`imgmark-error-icon`}></div>
          <div className={`imgmark-error-caption`}>图片加载失败</div>
        </div>
      </div>
    );
  }
}
