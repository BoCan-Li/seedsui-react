import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';
import BridgeBrowser from './../Bridge/browser';
import Context from '../../src/Context/instance.js';

export default class Vott extends Component {
  static contextType = Context;
  static propTypes = {
    data: PropTypes.array, // 渲染形状: [{polygon: [[x,y]], css: '', class: ''}]
    readOnly: PropTypes.bool, // 是否只读
    src: PropTypes.string,
    params: PropTypes.object, // 设置实例化参数
    preview: PropTypes.bool // 是否支持单击预览, readOnly为true时才生效
  }
  // data = {
  //   polygon: [ // 逆时针
  //     [x2, y1], // 右上
  //     [x1, y1], // 左上
  //     [x1, y2], // 左下
  //     [x2, y2], // 右下
  //   ],
  //   style: '',
  //   className: '',
  //   id: '',
  //   ...
  // }
  // params = {
  //   shapeAttributes: '形状属性'
  // }
  static defaultProps = {
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidUpdate (prevProps) {
    if (this.instance) {
      if (prevProps.params !== this.props.params) {
        this.instance.updateParams(this.props.params);
      }
      if (prevProps.readOnly !== this.props.readOnly) {
        this.instance.setReadOnly(this.props.readOnly);
      }
      if (prevProps.src !== this.props.src) {
        this.instance.updateParams({src: this.props.src});
        this.load = 0
        this.instance.update();
      }
      if (prevProps.data !== this.props.data) {
        this.instance.updateParams({data: this.props.data});
        this.load = 0
        this.instance.update();
      }
    }
  }
  componentDidMount () {
    this.instance()
  }
  instance = () => {
    const {
      data,
      readOnly,
      src,
      params = {}
    } = this.props;
    this.instance = new Instance(this.$el, {
      readOnly: readOnly,
      data: data,
      src: src,
      success: this.onLoad,
      ...params
    });
  }
  onLoad = () => {
    this.load = 1
  }
  onClick = () => {
    this.preview()
  }
  preview = () => {
    if (!this.props.readOnly || !this.props.preview || !this.load) return
    var svg = this.instance.svg;
    var previewHTML = `<div class="preview-layer">${svg.outerHTML}</div>`;
    BridgeBrowser.previewImage({urls: [this.props.src], layerHTML: previewHTML, success: (s) => {
      var layer = s.container.querySelector('.preview-layer');
      svg = s.container.querySelector('.vott-svg');
      svg.style.backgroundImage = 'initial';
      var width = svg.style.width.replace('px', '');
      var height = svg.style.height.replace('px', '');
      // 计算宽高
      var scale = 1
      if (width > height) { // 宽图计算
        scale = layer.clientWidth / width;
      } else { // 长图计算
        scale = layer.clientHeight / height;
      }
      svg.style.WebkitTransform = `scale(${scale}) translate(-50%,-50%)`
      svg.style.WebkitTransformOrigin = `0 0`
    }});
  }
  render() {
    // 全局配置
    let {
      locale = {}
    } = this.context;
    if (!locale) locale = {}
    const {
      data,
      readOnly,
      src,
      params = {},
      preview,
      ...others
    } = this.props;
    return (
      <div className="vott-container" {...others} ref={(el) => {this.$el = el}}>
        <svg className="vott-svg" preserveAspectRatio="none" onClick={this.onClick}></svg>
        <div className={`vott-loading active`}>
          <div className={`vott-loading-icon`}></div>
        </div>
        <div className={`vott-error`}>
          <div className={`vott-error-icon`}></div>
          <div className={`vott-error-caption`}>{locale['hint_image_failed_to_load'] || '图片加载失败'}</div>
        </div>
      </div>
    );
  }
}
