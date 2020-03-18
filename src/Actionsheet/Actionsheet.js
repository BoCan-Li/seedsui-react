import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Context from '../../src/Context/instance.js';

export default class Actionsheet extends Component {
  static contextType = Context;
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,
    animation: PropTypes.string,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
    duration: PropTypes.number,

    list: PropTypes.array, // [{caption: string, onClick: func}]

    maskAttribute: PropTypes.object,
    groupAttribute: PropTypes.object,
    optionAttribute: PropTypes.object,

    cancelCaption: PropTypes.node,
    cancelAttribute: PropTypes.object,

    onClick: PropTypes.func
  }
  static defaultProps = {
    animation: 'slideUp'
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
  }
  onClick = (e) => {
    const {
      onClick = {},
      maskAttribute = {},
      groupAttribute = {},
      optionAttribute = {},
      cancelAttribute = {}
    } = this.props;
    var target = e.target;
    // 获取值
    var item = null;
    var index = null;
    if (target.classList.contains('actionsheet-option')) {
      index = target.getAttribute('data-index');
      index = Number(index);
      item = this.props.list[index] || null;
    }
    // 区分点击事件
    e.stopPropagation()
    if (target.classList.contains('actionsheet-option') && optionAttribute.onClick) {
      optionAttribute.onClick(e, item, index);
      return;
    }
    if (target.classList.contains('actionsheet-group') && groupAttribute.onClick) {
      groupAttribute.onClick(e, item, index);
      return;
    }
    if (target.classList.contains('actionsheet-mask') && maskAttribute.onClick) {
      maskAttribute.onClick(e, item, index);
      return;
    }
    if (target.classList.contains('actionsheet-cancel') && cancelAttribute.onClick) {
      cancelAttribute.onClick(e, item, index);
      return;
    }
    if (onClick) onClick(e, item, index);
  }
  // 过滤已经回调的属性
  filterProps = (props) => {
    if (!props) return props;
    var propsed = {}
    for (let n in props) {
      if (n !== 'onClick') {
        propsed[n] = props[n]
      }
    }
    return propsed;
  }
  render() {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    let {
      portal,
      show,
      animation,
      duration,

      list,

      maskAttribute = {},
      groupAttribute = {},
      optionAttribute = {},
      
      cancelCaption = locale['cancel'] || '取消',
      cancelAttribute = {},

      onClick,
      ...others
    } = this.props;

    // 剔除掉onClick事件, 因为在容器onClick已经回调了
    var showCancel = cancelAttribute.onClick;
    maskAttribute = this.filterProps(maskAttribute)
    groupAttribute = this.filterProps(groupAttribute)
    optionAttribute = this.filterProps(optionAttribute)
    cancelAttribute = this.filterProps(cancelAttribute)

    // 构建动画
    let animationClassName = '';
    switch (animation) {
      case 'slideLeft':
        animationClassName = 'popup-animation right-middle';
        break;
      case 'slideRight':
        animationClassName = 'popup-animation left-middle';
        break;
      case 'slideUp':
        animationClassName = 'popup-animation bottom-center';
        break;
      case 'slideDown':
        animationClassName = 'popup-animation top-center';
        break;
      case 'zoom':
        animationClassName = 'popup-animation middle';
        break;
      case 'fade':
        animationClassName = 'popup-animation middle';
        break;
      case 'none':
        animationClassName = '';
        break;
      default:
        animationClassName = 'popup-animation middle';
    }

    // 动画时长
    let durationStyle = {};
    if (typeof duration === 'number') {
      durationStyle = {
        WebkitTransitionDuration: duration + 'ms'
      }
    }

    return createPortal(
      <div
        ref={(el) => {this.$el = el}}
        {...maskAttribute}
        className={`mask actionsheet-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}
        style={Object.assign({}, durationStyle, maskAttribute.style || {})}
        onClick={this.onClick}
      >
        <div
          data-animation={animation}
          {...others}
          className={`actionsheet${animationClassName ? ' ' + animationClassName : ''}${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}
          style={Object.assign({}, durationStyle, others.style || {})}
        >
          <div {...groupAttribute} className={`actionsheet-group${groupAttribute.className ? ' ' + groupAttribute.className : ''}`}>
            {list && list.map((item, index) => {
              return <a {...optionAttribute} className={`actionsheet-option${optionAttribute.className ? ' ' + optionAttribute.className : ' border-b'}`} key={index} data-index={index}>{item.caption}</a>
            })}
          </div>
          {showCancel && <a {...cancelAttribute} className={`actionsheet-cancel${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelCaption}</a>}
        </div>
      </div>,
      portal || this.context.portal || document.getElementById('root') || document.body
    );
  }
}
