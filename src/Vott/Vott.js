import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Vott extends Component {
  static propTypes = {
    data: PropTypes.array, // 渲染形状: [{polygon: [[x,y]], css: '', class: ''}]
    src: PropTypes.string,
    params: PropTypes.object
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
  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    if (this.instance) {
      if (prevProps.params !== this.props.params) {
        this.instance.setParams(this.props.params);
      }
      if (prevProps.src !== this.props.src) {
        this.instance.setParams({src: this.props.src});
        this.instance.update();
      }
    }
  }
  componentDidMount () {
    this.instance()
  }
  instance = () => {
    const {data, src, params, ...others} = this.props;
    const instance = new Instance(this.$el, {
      data: data,
      src: src,
      ...params
    });
    this.instance = instance;
  }
  render() {
    const {data, src, params, ...others} = this.props;
    return (
      <div className="vott-container" {...others} ref={(el) => {this.$el = el}}>
        <svg className="vott-svg" preserveAspectRatio="none"></svg>
        <div className={`vott-loading active`}>
          <div className={`vott-loading-icon`}></div>
        </div>
        <div className={`vott-error`}>
          <div className={`vott-error-icon`}></div>
          <div className={`vott-error-caption`}>{window._seeds_lang['hint_image_failed_to_load'] || '图片加载失败'}</div>
        </div>
      </div>
    );
  }
}
