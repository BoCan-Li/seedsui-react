import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';
import BScroll from 'better-scroll';

export default class PDFView extends Component {
  static propTypes = {
    pictures: PropTypes.array, // 图片地址
    src: PropTypes.string, // pdf地址或data:application/pdf;base64,开头的base64pdf流文件
    errorHTML: PropTypes.string, // 加载错误时显示的信息
    loadHTML: PropTypes.string, // 加载时显示的信息
    // options: PropTypes.object // getDocument选项: cMapUrl: '/demo/cmaps/', cMapPacked: true(废弃)
    cMapUrl: PropTypes.string,
    pdfLib: PropTypes.string, // pdf.js库
    pdfWorkLib: PropTypes.string // pdf.work.js库
  }
  static defaultProps = {
    loadHTML: '加载中',
    errorHTML: '文件加载失败'
  }
  constructor(props) {
    super(props);
  }
  instance = () => {
    const {
      src,
      pictures,
      errorHTML,
      loadHTML,
      // options(废弃)
      cMapUrl,
      pdfLib,
      pdfWorkLib
    } = this.props;
    if (!src && !pictures) return
    let bscroll = null;
    const instance = new Instance(this.$el, {
      src,
      pictures,
      errorHTML,
      loadHTML,
      // options, // (废弃)
      cMapUrl,
      pdfLib,
      pdfWorkLib,
      onLoad: () => {
        bscroll = new BScroll('.pdf-container', {
          scrollX: true,
          zoom: {
            start: 1,
            min: 1,
            max: 4
           }
        });
      }
    });
    this.bscroll = bscroll;
    this.instance = instance;
  }
  componentDidUpdate (prevProps) {
    const {
      src,
      pictures,
      errorHTML,
      loadHTML,
      // options // (废弃)
      cMapUrl
    } = this.props;
    if ((src && src !== prevProps.src) || (pictures && pictures !== prevProps.pictures)) {
      if (!this.instance) {
        this.instance()
      } else {
        this.instance.update({
          src,
          pictures,
          errorHTML,
          loadHTML,
          // options // (废弃)
          cMapUrl
        })
      }
    }
  }
  componentDidMount () {
    this.instance()
  }
  render() {
    const {
      src,
      pictures,
      errorHTML,
      loadHTML,
      // options, // (废弃)
      cMapUrl,
      pdfLib,
      pdfWorkLib,
      ...others
    } = this.props;
    if (!src && !pictures) {
      return null;
    }
    return (
      <div className="pdf-container" {...others} ref={(el) => {this.$el = el}}>
        <div className="pdf-wrapper"></div>
      </div>
    );
  }
}
