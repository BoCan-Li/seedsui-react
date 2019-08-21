import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tabbar extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string, // tabbar-line | tabbar-rect | tabbar-lump | tabbar-dropdown | tabbar-footer

    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,

    sndCaptionClassName: PropTypes.string,
    sndCaptionStyle: PropTypes.object,

    list: PropTypes.array,

    tiled: PropTypes.bool, // 宽度等分, 默认宽度弹性伸缩
    disabled: PropTypes.bool,
    exceptOnClickActive: PropTypes.bool, // 排除点击选中的菜单
    onClick: PropTypes.func,
    activeIndex: PropTypes.number
  }
  static defaultProps = {
    list: [],
    // [
    //   {
    //     icon: node,
    //     iconActive: node,
    //     ricon: node,
    //     riconActive: node,

    //     name: string, // 与caption完全相同, 允许传入name或者caption
    //     caption: string,
    //     sndcaption: string,
    //     active: bool,

    //     attributes: object // tab属性
    //   }
    // ]
    exceptOnClickActive: true,
    className: 'tabbar-line tabbar-line-width70 border-b',
    activeIndex: 0
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  onClick = (e) => {
    const target = e.target;
    if (this.props.exceptOnClickActive && target.classList.contains('active')) return;
    const index = target.getAttribute('data-index');
    if (!index) return;
    if (this.props.onClick) {
      this.props.onClick(e, this.props.list[index], Number(index));
      e.stopPropagation();
    }
  }
  getTabbarStyle = () => {
    const {list, className, style} = this.props;
    var tabbarStyle = {};
    // 矩形tabbar应当有的总宽度
    if (className.hasClass('tabbar-rect')) {
      switch (list.length) {
        case 1 :
          tabbarStyle = {width: '30%'};
          break;
        case 2 :
          tabbarStyle = {width: '50%'};
          break;
        case 3 :
          tabbarStyle = {width: '50%'};
          break;
        default :
          tabbarStyle = {};
      }
    }
    return Object.assign({}, tabbarStyle, style);
  }
  getTabbarClassName = () => {
    const {className, tiled} = this.props;
    return 'tabbar animated' + (className ? ' ' + className : ' tabbar-line-width60') + (tiled ? ' tabbar-tiled' : '');
  }
  getIconDOM = (icon, iconActive, isActive) => {
    if (isActive) {
      return iconActive ? iconActive : icon;
    }
    return icon;
  }
  getTabsDOM = () => {
    const {list, activeIndex, captionClassName, captionStyle, sndCaptionClassName, sndCaptionStyle} = this.props;
    // tabStyle高度
    var tabStyle = {};
    if (this.props.style && this.props.style.height) {
      tabStyle = {
        height: this.props.style.height
      }
    }
    // 遍历
    return list.map((item, index) => {
      const {icon, iconActive, ricon, riconActive, name, caption, sndcaption, active, attributes = {}, style = {}} = item;
      let isActive = (active || activeIndex === index);
      let liconDOM = null;
      if (icon) {
        liconDOM = this.getIconDOM(icon, iconActive, isActive);
      }
      let riconDOM = null;
      if (ricon) {
        riconDOM = this.getIconDOM(ricon, riconActive, isActive);
      }
      return (<li className={`tab${isActive ? ' active' : ''}`} style={Object.assign(tabStyle, style || {})} data-index={index} key={index} {...attributes}>
        {liconDOM && liconDOM}
        <div className="tab-content">
          <div className={`tab-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{caption || name}</div>
          {sndcaption && <div className={`tab-sndcaption${sndCaptionClassName ? ' ' + sndCaptionClassName : ''}`} style={sndCaptionStyle}>{sndcaption}</div>}
        </div>
        {riconDOM && riconDOM}
      </li>);
    });
  }
  render() {
    const {disabled} = this.props;
    // 获取tabbar样式
    const tabbarStyle = this.getTabbarStyle();
    // 获取tabbar的ClassName
    const tabbarClassName = this.getTabbarClassName();
    // 获取tabs的DOM
    const tabsDOM = this.getTabsDOM();
    
    return (
      <ul ref={(el) => {this.$el = el}} className={tabbarClassName} disabled={disabled} style={tabbarStyle} onClick={this.onClick}>
        {tabsDOM}
      </ul>
    );
  }
}
