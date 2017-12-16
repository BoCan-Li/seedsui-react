import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Instance from './carrousel.js'
import defaultSrc from './images/default.jpg'

export default class Carrousel extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    loop: PropTypes.bool,
    activeIndex: PropTypes.number,
    pagination: PropTypes.bool,
    autoplay: PropTypes.number,
    slidesPerView: PropTypes.number,
    list: PropTypes.array,
    onChange: PropTypes.func
  }
  static defaultProps = {
    activeIndex: 0,
    page: 0,
    loop: false,
    pagination: false,
    autoplay: 0,
    slidesPerView: 1,
    list: []
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.state.instance.slideTo(this.props.activeIndex);
    }
  }
  componentDidMount = () => {
    if (this.state.instance) return
    setTimeout(() => {
      const instance = new Instance(this.$el, {
        pagination: '.carrousel-pagination',
        autoplay: this.props.autoplay,
        slidesPerView: this.props.slidesPerView,
        loop: this.props.loop,
        onSlideChangeEnd: this.props.onChange ? this.props.onChange : null
      })
      this.setState({
        instance
      })
    }, 100)
  }
  render() {
    const {list, pagination, className, style} = this.props;
    const children = React.Children.toArray(this.props.children);
    return (
      <div ref = {(container) => {this.$el = container}} className={'carrousel-container' + (className && ' ' + className)} style={style}>
      <div className="carrousel-wrapper">
        {/* 轮播图 */}
        {list.length > 0 && list.map((item, index) => {
        return <div className="carrousel-slide" key={index} onClick={item.onClick}>
          {item.img && <img className="slide-banner" alt="" src={defaultSrc} data-load-src={item.img}/>}
          {item.text && <div className="slide-title">
            {item.icon && <i className={'icon slide-title-icon' + (item.icon ? ' ' + item.icon : '')}></i>}
            <span className="nowrap slide-title-font" style={{marginRight: '20px'}}>
              {item.text}
            </span>
          </div>}
        </div>
        })}
        {/* 轮播页 */}
        {list.length === 0 && children && children.map((item, index) => {
          return <div className="carrousel-slide" key={index}>{item}</div>
        })}
      </div>
      {pagination && <div className="carrousel-pagination"></div>}
      </div>
    );
  }
}
