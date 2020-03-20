import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';
import BScroll from 'better-scroll';
import Context from '../Context/instance.js';

export default class PDFView extends Component {
  static contextType = Context;
  static propTypes = {
    insertPageElements: PropTypes.array, // 插入页面元素, 有此属性时将不分页
    pictures: PropTypes.array, // 图片地址
    src: PropTypes.string, // pdf地址或data:application/pdf;base64,开头的base64pdf流文件
    cMapUrl: PropTypes.string, // 设置cMapUrl, 解决中文不显示的问题
    params: PropTypes.object, // 设置实例化参数
    // params: {
    //   rows: 5, // 分页, 一页的条数
    //   errorHTML: '文件加载失败', // 加载错误时显示的信息
    //   loadHTML: '加载中', // 加载时显示的信息
    //   nodataHTML: '暂无数据', // 暂无数据
    //   pdfLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.js', // pdf.js库
    //   pdfWorkLib: '//res.waiqin365.com/d/seedsui/pdfview/pdf.worker.js' // pdf.work.js库
    // }
    zoom: PropTypes.bool, // 是否允许放大缩小
    wrapperAttribute: PropTypes.object,
  }
  // insertPageElements = [{
  //   page: 1,
  //   element: <input/>
  // }]
  static defaultProps = {
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      total: 0
    };
  }
  componentDidUpdate (prevProps) {
    const {
      pictures,
      src,
      cMapUrl,
      params = {}
    } = this.props;
    // 修改PDF原文件, 刷新整个页面, 从第1页开始重新渲染
    if ((src && src !== prevProps.src) || (pictures && pictures !== prevProps.pictures)) {
      if (!this.instance) {
        this.init()
      } else {
        if (this.instance.update) {
          this.instance.update({
            ...params,
            pictures,
            src,
            cMapUrl
          })
        }
      }
    }
    // 如果修改参数的话, 只需要更新参数即可
    if (JSON.stringify(params) !== JSON.stringify(prevProps.params)) {
      if (!this.instance) {
        this.init()
      } else {
        this.instance.updateParams(params)
      }
    }
  }
  componentDidMount () {
    this.init()
  }
  // 一页加载完成后回调
  onLoad = (s) => {
    const {
      zoom,
      params = {}
    } = this.props;
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
  init = () => {
    const {
      pictures,
      src,
      insertPageElements
    } = this.props;
    if (!src && !pictures) {
      console.warn('SeedsUI: PDFView请传入src或者pictures');
      return;
    }
    // 如果设置了插入元素, 则需要通过react Node渲染完成后, 再实例化
    if (insertPageElements && insertPageElements.length && src) {
      new Instance().getPDF(src, {
        success: (pdf) => {
          this.setState({
            total: pdf.total
          }, () => {
            this.updateInstance(this.state.total);
          });
        }
      });
    } else if (insertPageElements && insertPageElements.length && pictures) {
        this.setState({
          total: pictures.length
        }, () => {
          this.updateInstance(this.state.total);
        });
    } else {
      this.updateInstance();
    }
  }
  // 实例化
  updateInstance = (rows) => {
    // 全局配置
    let {
      locale = {}
    } = this.context;
    if (!locale) locale = {}
    const {
      pictures,
      src,
      cMapUrl,
      params = {}
    } = this.props;
    this.instance = new Instance(this.$el, {
      loadHTML: locale['in_loading'] || '加载中',
      errorHTML: locale['hint_file_failed_to_load'] || '文件加载失败',
      nodataHTML: locale['no_data'] || '暂无数据',
      ...params,
      pictures,
      src,
      cMapUrl,
      rows: rows || params.rows,
      onLoad: (s) => {
        this.onLoad(s)
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
  // 滚动到页数
  scrollToPage = (pageIndex) => {
    if (!pageIndex || isNaN(pageIndex) || Number(pageIndex) < 1) return;
    const pages = this.$el.querySelectorAll('.pdf-page');
    const page = pages[Number(pageIndex) - 1];
    if (!page) return;
    if (this.bscroll) {
      this.bscroll.scrollToElement(page);
    } else {
      this.$el.scrollTop = page.offsetTop;
    }
  }
  // 设置total则不分页
  getTotalDOM = (total, insertPageElements = [], pageFeatureClass) => {
    // 全局配置
    let {
      locale = {}
    } = this.context;
    if (!locale) locale = {}
    const {
      params = {},
    } = this.props;
    if (!total) return null;
    const DOM = [];
    for (let i = 1; i <= total; i++) {
      let insertDOM = [];
      for (let pageEl of insertPageElements) {
        if (pageEl && pageEl.page && Number(pageEl.page) === i && pageEl.element) insertDOM.push(pageEl.element);
      }
      DOM.push(<div key={i} className={`pdf-page${pageFeatureClass ? ' ' + pageFeatureClass : ''}`}>
        <div className="pdf-page-draw">
          <canvas className="pdf-page-canvas"></canvas>
          <img className="pdf-page-img" alt=""/>
          <div className="pdf-page-elements">
            {insertDOM}
          </div>
        </div>
        <img alt="" className="pdf-page-img hide"/>
        <div className="pdf-page-load">{params.loadHTML !== undefined ? params.loadHTML : (locale['in_loading'] || '加载中')}</div>
        <div className="pdf-page-error hide">{params.errorHTML !== undefined ? params.errorHTML : (locale['hint_file_failed_to_load'] || '文件加载失败')}</div>
        <div className="pdf-page-nodata hide">{params.nodataHTML !== undefined ? params.nodataHTML : (locale['no_date'] || '暂无数据')}</div>
      </div>);
    }
    return DOM;
  }
  render() {
    const {
      insertPageElements, // Page中插入元素
      pictures,
      src,
      cMapUrl,
      params = {},
      zoom,
      wrapperAttribute = {},
      ...others
    } = this.props;
    if (!src && !pictures) {
      return null;
    }
    return (
      <div ref={(el) => {this.$el = el}} {...others} className={`pdf-container${others.className ? ' ' + others.className : ''}${zoom ? '' : ' scroll'}`}>
        <div {...wrapperAttribute} className={`pdf-wrapper${wrapperAttribute.className ? ' ' + wrapperAttribute.className : ''}`}>
          {this.getTotalDOM(this.state.total, insertPageElements, params.pageFeatureClass)}
        </div>
      </div>
    );
  }
}
