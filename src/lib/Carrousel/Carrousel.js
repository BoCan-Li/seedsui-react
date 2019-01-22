import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Carrousel extends Component {
  static propTypes = {
    style: PropTypes.object, // 设置容器Style
    className: PropTypes.string, // 设置容器className

    slideParams: PropTypes.object,

    pagination: PropTypes.oneOfType([  // 是否显示小点点
      PropTypes.bool,
      PropTypes.node
    ]),
    paginationParams: PropTypes.object,

    prevParams: PropTypes.object,
    nextParams: PropTypes.object,

    stopPropagation: PropTypes.bool, // 是否阻止点击事件的传播, 设置为false解决与FastClick插件touch事件冲突的问题
    activeIndex: PropTypes.number, // 默认选中第几块

    loop: PropTypes.bool, // 是否循环显示
    autoplay: PropTypes.number, // 是否自动播放
    slidesPerView: PropTypes.number, // 一屏显示几块,默认1块
    defaultSrc: PropTypes.string, // 默认图片
    list: PropTypes.array, // [{bg: 'xx', img: 'xx', iconParams: {}, caption: 'xx'}]
    enableOnChange: PropTypes.bool, // 手动调用slideTo方法是否触发onChange事件回调
    speed: PropTypes.number, // 动画过渡的速度
    onClick: PropTypes.func, // func(s, e)
    onChange: PropTypes.func,
    delay: PropTypes.number, // 延迟初始化秒数

    children: PropTypes.node, // 轮播页,例<Carrousel><div>第1页</div></Carrousel>
  }
  static defaultProps = {
    slideParams: {},
    paginationParams: {},
    prevParams: {},
    nextParams: {},
    stopPropagation: false, // 设置为false解决与Fastclick插件touch事件冲突的问题
    activeIndex: 0,
    page: 0,
    loop: false,
    pagination: false,
    autoplay: 0,
    slidesPerView: 1,
    list: [],
    defaultSrc: '//res.waiqin365.com/d/seedsui/carrousel/default.png',
    enableOnChange: true,
    speed: 300,
    delay: 500,
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate = (prevProps) => {
    if (this.instance && this.instance.activeIndex !== this.props.activeIndex) {
      this.instance.slideTo(this.props.activeIndex, this.props.speed, this.props.enableOnChange);
    }
    if (this.props.stopPropagation !== prevProps.stopPropagation) {
      this.instance.setParams({stopPropagation: this.props.stopPropagation});
    }
    if (!this.props.list.equals(prevProps.list)) {
      this.update();
    }
  }
  componentDidMount = () => {
    this.instance();
    // 轮播图片, 自适应的情况下, 高度需要计算
    if (!(this.props.style && this.props.style.height) && this.props.list.length && this.props.delay) {
      setTimeout(() => {
        this.instance.updateContainerSize();
      }, this.props.delay);
    }
  }
  instance = () => {
    const instance = new Instance(this.$el, {
      height: this.props.style && this.props.style.height ? this.props.style.height : null,
      width: this.props.style && this.props.style.width ? this.props.style.width : null,
      stopPropagation: this.props.stopPropagation,
      autoplay: this.props.autoplay,
      slidesPerView: this.props.slidesPerView,
      loop: this.props.loop,
      onClick: this.onClick,
      onSlideChangeEnd: this.props.onChange ? this.props.onChange : null
    });
    this.instance = instance;
  }
  onClick = (s, e) => {
    const index = s.activeIndex;
    if (this.props.onClick) this.props.onClick(this.props.list[index], index, s, e);
  }
  getCarrouselClassName = () => {
    const {className, list} = this.props;
    if (className) {
      if (className.indexOf('carrousel-container') !== -1 || className.indexOf('carrousel-page') !== -1) {
        return className;
      }
    }
    return (list.length > 0 ? 'carrousel-container' : 'carrousel-page') + (className ? ' ' + className : '');
  }
  getSlideStyle = (item) => {
    const {slideParams} = this.props;
    if (item.bg) {
      return Object.assign({backgroundImage: `url(${this.props.defaultSrc})`}, slideParams.style);
    }
    return slideParams.style;
  }
  update = () => {
    // 更新为默认图片
    const imgs = this.$el.querySelectorAll('.carrousel-lazy');
    for (var i = 0; i < imgs.length; i++) {
      var imgTarget = imgs[i];
      if (!imgTarget) continue;
      if (imgTarget.tagName === 'IMG') {
        imgTarget.src = this.props.defaultSrc;
      } else {
        imgTarget.style.backgroundImage = 'url(' + this.props.defaultSrc + ')';
      }
    }
    // 更新Carrousel
    if (this.instance) this.instance.update();
  }
  render() {
    const {
      className, style,
      slideParams,
      pagination, paginationParams,
      prevParams, nextParams,
      stopPropagation,
      activeIndex,

      loop,
      autoplay,
      slidesPerView,
      defaultSrc,
      list,
      enableOnChange,
      speed,
      onClick,
      onChange,
      delay,

      children,
      ...others
    } = this.props;
    const childrenArr = React.Children.toArray(children);
    return (
      <div ref={el => {this.$el = el}} className={this.getCarrouselClassName()} style={style} {...others}>
      <div className="carrousel-wrapper">
        {/* 轮播图 */}
        {list.length > 0 && list.map((item, index) => {
          return <div className={`carrousel-slide${slideParams.className ? ' ' + slideParams.className : ''}${item.bg ? ' carrousel-lazy' : ''}`} style={this.getSlideStyle(item)} key={index} data-load-src={item.bg}>
            {item.img && <img className="carrousel-slide-img carrousel-lazy" alt="" src={defaultSrc} data-load-src={item.img}/>}
            {item.caption && <div className="carrousel-summary">
              {item.iconParams && item.iconParams.className && <i {...item.iconParams} className={`icon carrousel-summary-icon${item.iconParams.className ? ' ' + item.iconParams.className : ''}`}></i>}
              <span className="nowrap carrousel-summary-caption" style={{marginRight: '20px'}}>
                {item.caption}
              </span>
            </div>}
          </div>
          })}
        {/* 轮播页 */}
        {list.length === 0 && childrenArr && childrenArr.map((item, index) => {
          return <div className="carrousel-slide" key={index}>{item}</div>
        })}
      </div>
      {pagination === true && <div {...paginationParams} className={`carrousel-pagination${paginationParams.className ? ' ' + paginationParams.className : ''}`}></div>}
      {pagination && pagination !== true && pagination}
      {list.length > 1 && <div {...prevParams} className={`carrousel-prev${prevParams.className ? ' ' + prevParams.className : ''}`}></div>}
      {list.length > 1 && <div {...nextParams} className={`carrousel-next${nextParams.className ? ' ' + nextParams.className : ''}`}></div>}
      </div>
    );
  }
}
