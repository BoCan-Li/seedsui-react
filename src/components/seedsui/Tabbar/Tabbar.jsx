import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon';

export default class Tabbar extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string, // tabbar-line | tabbar-rect | tabbar-lump | tabbar-dropdown | tabbar-footer
    iconBadgeStyle: PropTypes.object,
    iconBadgeClassName: PropTypes.string,
    riconBadgeStyle: PropTypes.object,
    riconBadgeClassName: PropTypes.string,
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
    //     iconStyle: object,
    //     iconClassName: string,
    //     iconActiveStyle: object,
    //     iconActiveClassName: string,

    //     iconBadgeClassName: string,
    //     iconBadgeStyle: object,
    //     iconBadgeCaption: string,

    //     riconStyle: object,
    //     riconClassName: string,
    //     riconActiveStyle: object,
    //     riconActiveClassName: string,

    //     riconBadgeClassName: string,
    //     riconBadgeStyle: object,
    //     riconBadgeCaption: string,

    //     caption: string,
    //     sndcaption: string,
    //     active: bool,
    //     id: string
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
    if (this.props.onClick) this.props.onClick(this.props.list[index], Number(index));
  }
  getLIconDOM = (item, isActive) => {
    // iconStyle | iconClassName
    let iconStyle = {};
    let iconClassName = '';
    if (isActive && (item.iconActiveClassName || item.iconActiveStyle)) {
      if (item.iconActiveClassName) iconClassName = `tab-icon ${item.iconActiveClassName}`;
      if (item.iconActiveStyle) iconStyle = item.iconActiveStyle;
    } else {
      if (item.iconClassName) iconClassName = `tab-icon ${item.iconClassName}`;
      if (item.iconStyle) iconStyle = item.iconStyle;
    }
    // iconBadgeStyle | iconBadgeClassName | iconBadgeCaption
    let iconBadgeStyle = this.props.iconBadgeStyle;
    if (item.iconBadgeStyle) {
      iconBadgeStyle = item.iconBadgeStyle;
    }
    let iconBadgeClassName =  this.props.iconBadgeClassName;
    if (item.iconBadgeClassName) {
      iconBadgeClassName = item.iconBadgeClassName;
    }
    let iconBadgeCaption = '';
    if (item.iconBadgeCaption) {
      iconBadgeCaption = item.iconBadgeCaption;
    }
    // DOM
    return <Icon className={iconClassName} style={iconStyle} badgeCaption={iconBadgeCaption} badgeClassName={iconBadgeClassName} badgeStyle={iconBadgeStyle}/>
  }
  getRIconDOM = (item, isActive) => {
    // riconStyle | riconClassName
    let riconStyle = {};
    let riconClassName = '';
    if (isActive && (item.iconActiveClassName || item.iconActiveStyle)) {
      if (item.iconActiveClassName) riconClassName = `tab-icon ${item.iconActiveClassName}`;
      if (item.iconActiveStyle) riconStyle = item.iconActiveStyle;
    } else {
      if (item.riconClassName) riconClassName = `tab-icon ${item.riconClassName}`;
      if (item.riconStyle) riconStyle = item.riconStyle;
    }
    // riconBadgeStyle | riconBadgeClassName | riconBadgeCaption
    let riconBadgeStyle = this.props.riconBadgeStyle;
    if (item.riconBadgeStyle) {
      riconBadgeStyle = item.riconBadgeStyle;
    }
    let riconBadgeClassName =  this.props.riconBadgeClassName;
    if (item.riconBadgeClassName) {
      riconBadgeClassName = item.riconBadgeClassName;
    }
    let riconBadgeCaption = '';
    if (item.riconBadgeCaption) {
      riconBadgeCaption = item.riconBadgeCaption;
    }
    // DOM
    return <Icon className={riconClassName} style={riconStyle} badgeCaption={riconBadgeCaption} badgeClassName={riconBadgeClassName} badgeStyle={riconBadgeStyle}/>
  }
  getTabsDOM = () => {
    const {list, style, activeIndex} = this.props;
    // tabStyle高度
    var tabStyle = {};
    if (style && style.height) {
      tabStyle = {
        height: style.height
      }
    }
    // 遍历
    return list.map((item, index) => {
      let isActive = (item.active || activeIndex === index);
      let liconDOM = null;
      if (item.iconClassName) {
        liconDOM = this.getLIconDOM(item, isActive);
      }
      let riconDOM = null;
      if (item.riconClassName) {
        riconDOM = this.getRIconDOM(item, isActive);
      }
      return (<li id={item.id} data-index={index} className={`tab${isActive ? ' active' : ''}`} style={Object.assign(tabStyle, item.style || {})} key={index}>
        {liconDOM && liconDOM}
        <div className="tab-content">
          <div className="tab-caption">{item.caption}</div>
          {item.sndcaption && <div className="tab-sndcaption">{item.sndcaption}</div>}
        </div>
        {riconDOM && riconDOM}
      </li>);
    });
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
  render() {
    const {disabled} = this.props;
    // 获取tabbar样式
    const tabbarStyle = this.getTabbarStyle();
    // 获取tabs的DOM
    const tabsDOM = this.getTabsDOM();
    // 获取tabbar的ClassName
    const tabbarClassName = this.getTabbarClassName();
    return (
      <ul ref={(el) => {this.$el = el}} className={tabbarClassName} disabled={disabled} style={tabbarStyle} onClick={this.onClick}>
        {tabsDOM}
      </ul>
    );
  }
}
