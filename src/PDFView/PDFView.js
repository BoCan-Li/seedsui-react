import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';
import BScroll from 'better-scroll';

export default class PDFView extends Component {
  static propTypes = {
    pictures: PropTypes.array, // 图片地址
    src: PropTypes.string, // pdf地址或data:application/pdf;base64,开头的base64pdf流文件
    cMapUrl: PropTypes.string, // 设置cMapUrl, 解决中文不显示的问题
    params: PropTypes.object, // 设置实例化参数
    zoom: PropTypes.bool, // 是否允许放大缩小
    // params: {
    //   rows: 5, // 分页, 一页的条数
    //   errorHTML: '文件加载失败', // 加载错误时显示的信息
    //   loadHTML: '加载中', // 加载时显示的信息
    //   nodataHTML: '暂无数据', // 暂无数据
    //   pdfLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.js', // pdf.js库
    //   pdfWorkLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.worker.js' // pdf.work.js库
    // }
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  instance = () => {
    const {
      pictures,
      src,
      cMapUrl,
      zoom,
      params = {}
    } = this.props;
    if (!src && !pictures) return
    this.instance = new Instance(this.$el, {
      pictures,
      src,
      cMapUrl,
      ...params,
      onLoad: (s) => {
        console.log('全部加载完成')
        if (params.onLoad) params.onLoad(s)
        if (zoom) { // 若允许放大, 使用better-scroll
          if (this.bscroll) {
            console.log('加载完成, bscroll刷新');
            this.bscroll.finishPullUp();
            this.bscroll.refresh();
            return;
          }
          this.bscroll = new BScroll('.pdf-container', {
            scrollX: true,
            zoom: {
              start: 1,
              min: 1,
              max: 4
            },
            probeType: 2,
            pullUpLoad: {
              threshold: 10
            }
          });
          // 上拉到底部刷新
          this.bscroll.on('pullingUp', () => {
            this.instance.addPages();
          });
        } else { // 不允许放大, 则使用原生滚动条
          // 上拉到底部
          if (!s.container.getAttribute('data-scroll')) {
            s.container.addEventListener('scroll', this.onScroll, false);
            s.container.setAttribute('data-scroll', '1');
          }
        }
      }
    });
  }
  // 当不允许放大缩小使用原生滚动时, 滚动到底部加载下一页
  onScroll = (e) => {
    var target = e.target
    var clientHeight = target.clientHeight
    var scrollHeight = target.scrollHeight
    var scrollTop = target === document.body ? document.documentElement.scrollTop : target.scrollTop
    if (scrollTop + clientHeight >= scrollHeight - 2) {
      // 刷新
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.instance.addPages();
      }, 500);
    }
  }
  componentDidUpdate (prevProps) {
    const {
      pictures,
      src,
      cMapUrl,
      params = {}
    } = this.props;
    if ((src && src !== prevProps.src) || (pictures && pictures !== prevProps.pictures)) {
      if (!this.instance) {
        this.instance()
      } else {
        this.instance.update({
          pictures,
          src,
          cMapUrl,
          ...params,
        })
      }
    }
  }
  componentDidMount () {
    this.instance()
  }
  render() {
    const {
      pictures,
      src,
      cMapUrl,
      params = {},
      zoom,
      ...others
    } = this.props;
    if (!src && !pictures) {
      return null;
    }
    return (
      <div {...others} className={`pdf-container${others.className ? ' ' + others.className : ''}${zoom ? '' : ' scroll'}`} ref={(el) => {this.$el = el}}>
        <div className="pdf-wrapper"></div>
      </div>
    );
  }
}
