import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';
import Bridge from './../Bridge';
import BridgeBrowser from './../Bridge/bridgeBrowser';

export default class ImgMark extends Component {
  static propTypes = {
    // 数据源
    data: PropTypes.array,
    src: PropTypes.string,
    isDrawSrc: PropTypes.bool, // 是否绘制背景
    watermark: PropTypes.string,
    // canvas样式
    strokeStyle: PropTypes.string,
    lineWidth: PropTypes.number,
    quality: PropTypes.number,
    // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
    width: PropTypes.number, // 宽度
    height: PropTypes.number, // 高度
    style: PropTypes.object,
    className: PropTypes.string,

    onClick: PropTypes.func,

    preview: PropTypes.bool, // 是否预览

    children: PropTypes.node
  }
  static defaultProps = {
    isDrawSrc: false,
    strokeStyle: '#00ff00',
    lineWidth: 3,
    quality: 0.92,
    height: 300,
    preview: true
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    if (this.instance) {
      if (prevProps.isDrawSrc !== this.props.isDrawSrc) {
        this.instance.setDrawBg(this.props.isDrawSrc);
        this.instance.update();
      }
      if (prevProps.strokeStyle !== this.props.strokeStyle) {
        this.instance.setStrokeStyle(this.props.strokeStyle);
        this.instance.update();
      }
      if (prevProps.lineWidth !== this.props.lineWidth) {
        this.instance.setLineWidth(this.props.lineWidth);
        this.instance.update();
      }
      if (prevProps.quality !== this.props.quality) {
        this.instance.setQuality(this.props.quality);
        this.instance.update();
      }
      if (prevProps.data !== this.props.data) {
        this.instance.setData(this.props.data);
        this.instance.update();
      }
    }
  }
  componentDidMount () {
    if (this.instance) return;
    var instance = new Instance(this.$el, {
      src: this.props.src,
      data: this.props.data,
      isDrawSrc: this.props.isDrawSrc,
      height: this.props.height,
      strokeStyle: this.props.strokeStyle,
      lineWidth: this.props.lineWidth,
      quality: this.props.quality
    });
    this.instance = instance;
  }
  onClick = () => {
    if (this.props.preview) {
      var layer = ''
      if (this.props.isDrawSrc) { // 如果绘制背景, 则可以调用客户端自带的预览
        layer = this.instance.save();
        if (layer) {
          Bridge.previewImage({urls: [layer], index: 0});
        }
      } else { // 非绘制背景, 则需要弹出框来显示
        layer = this.instance.save();
        var previewHTML = `<div class="preview-layer" style="background-image:url(${layer})"></div>`;
        if (this.props.watermark) { // 水印
          previewHTML += `<div class="preview-layer" style="background-image:url(${this.props.watermark});background-repeat: repeat; background-size:auto;"></div>`;
        }
        BridgeBrowser.previewImage({urls: [this.props.src], layerHTML: previewHTML});
      }
    }
    if (this.props.onClick) this.props.onClick(layer)
  }
  render() {
    const {
      data, src, isDrawSrc, watermark,
      strokeStyle, lineWidth, quality,
      width, height, style, className,
      onClick,
      preview,
      children,
      ...others
    } = this.props;
    let isDrawSrcStyle = {};
    if (!isDrawSrc) {
      isDrawSrcStyle = {backgroundImage: `url(${src})`};
    }
    return (
      <div className={`imgmark${className ? ' ' + className : ''}`} style={Object({width: width, height: height}, style)} onClick={this.onClick} {...others}>
        <div className={`imgmark-loading active`}>
          <div className={`imgmark-loading-icon`}></div>
        </div>
        <canvas ref={el => {this.$el = el;}} className={`imgmark-wrapper`} style={isDrawSrcStyle}>
          Canvas画板
        </canvas>
        <div className={`imgmark-error`}>
          <div className={`imgmark-error-icon`}></div>
          <div className={`imgmark-error-caption`}>图片加载失败</div>
        </div>
        {/* 内容 */}
        {children}
      </div>
    );
  }
}
