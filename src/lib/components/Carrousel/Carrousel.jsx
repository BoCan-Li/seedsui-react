import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './carrousel.js';
import defaultImg from './images/default.png';

export default class Carrousel extends Component {
  static propTypes = {
    style: PropTypes.object, // 设置容器Style
    className: PropTypes.string, // 设置容器className
    slideStyle: PropTypes.object, // 设置块style
    slideClassName: PropTypes.string, // 设置块className
    children: PropTypes.node, // 轮播页,例<Carrousel><div>第1页</div></Carrousel>
    loop: PropTypes.bool, // 是否循环显示
    activeIndex: PropTypes.number, // 默认选中第几块
    pagination: PropTypes.bool, // 是否显示小点点
    autoplay: PropTypes.number, // 是否自动播放
    slidesPerView: PropTypes.number, // 一屏显示几块,默认1块
    defaultSrc: PropTypes.string, // 默认图片
    list: PropTypes.array, // [{bg: 'xx', img: 'xx', iconClassName: 'xx', caption: 'xx'}]
    enableOnChange: PropTypes.bool, // 启用改变事件回调
    speed: PropTypes.number, // 动画过渡的速度
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
  static defaultProps = {
    activeIndex: 0,
    page: 0,
    loop: false,
    pagination: false,
    autoplay: 0,
    slidesPerView: 1,
    list: [],
    defaultSrc: defaultImg,
    enableOnChange: true,
    speed: 300
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidUpdate = (prevProps) => {
    if (this.state.instance && this.state.instance.activeIndex !== this.props.activeIndex) {
      this.state.instance.slideTo(this.props.activeIndex, this.props.speed, this.props.enableOnChange);
    }
    if (!this.props.list.equals(prevProps.list)) {
      this.update();
    }
  }
  componentDidMount = () => {
    if (this.state.instance || (this.props.list.length === 0 && !this.props.children)) return;
    setTimeout(() => {
      const instance = new Instance(this.$el, {
        height: this.props.style && this.props.style.height ? this.props.style.height : null,
        pagination: '.carrousel-pagination',
        autoplay: this.props.autoplay,
        slidesPerView: this.props.slidesPerView,
        loop: this.props.loop,
        onClick: this.onClick,
        onSlideChangeEnd: this.props.onChange ? this.props.onChange : null
      });
      this.setState({
        instance
      });
    }, 300);
  }
  onClick = (e) => {
    const index = e.activeIndex;
    if (this.props.onClick) this.props.onClick(this.props.list[index], index);
  }
  getCarrouselClassName = () => {
    const {className, list} = this.props;
    if (className) {
      if (className.hasClass('carrousel-container') || className.hasClass('carrousel-page')) {
        return className;
      }
    }
    return (list.length > 0 ? 'carrousel-container' : 'carrousel-page') + (className ? ' ' + className : '');
  }
  getSlideStyle = () => {
    return Object.assign({backgroundImage: `url(${this.props.defaultSrc})`}, this.props.slideStyle);
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
    if (this.state.instance) this.state.instance.update();
  }
  render() {
    const {
      style,
      slideClassName,
      defaultSrc, list, pagination
    } = this.props;
    const children = React.Children.toArray(this.props.children);
    return (
      <div ref={el => {this.$el = el}} className={this.getCarrouselClassName()} style={style}>
      <div className="carrousel-wrapper">
        {/* 轮播图 */}
        {list.length > 0 && list.map((item, index) => {
        return <div className={`carrousel-slide${slideClassName ? ' ' + slideClassName : '' + item.bg ? ' carrousel-lazy' : ''}`} style={this.getSlideStyle()} key={index} data-load-src={item.bg}>
          {item.img && <img className="carrousel-slide-img carrousel-lazy" alt="" src={defaultSrc} data-load-src={item.img}/>}
          {item.caption && <div className="carrousel-summary">
            {item.iconClassName && <i className={'icon carrousel-summary-icon' + (item.iconClassName ? ' ' + item.iconClassName : '')}></i>}
            <span className="nowrap carrousel-summary-font" style={{marginRight: '20px'}}>
              {item.caption}
            </span>
          </div>}
        </div>
        })}
        {/* 轮播页 */}
        {list.length === 0 && children && children.map((item, index) => {
          return <div className="carrousel-slide" key={index}>{item}</div>
        })}
      </div>
      {list.length > 1 && pagination && <div className="carrousel-pagination"></div>}
      {list.length > 1 && <div className="carrousel-prev"></div>}
      {list.length > 1 && <div className="carrousel-next"></div>}
      </div>
    );
  }
}
