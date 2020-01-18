import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Alert extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,
    animation: PropTypes.string,  // slideLeft | slideRight | slideUp | slideDown | zoom | fade
    duration: PropTypes.number,

    maskAttribute: PropTypes.object,

    caption: PropTypes.node,
    captionAttribute: PropTypes.object,

    icon: PropTypes.node,

    contentAttribute: PropTypes.object,

    submitCaption: PropTypes.node,
    submitAttribute: PropTypes.object,

    cancelCaption: PropTypes.node,
    cancelAttribute: PropTypes.object,

    children: PropTypes.node,
  }
  static defaultProps = {
    animation: 'zoom'
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
  }
  render() {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    const {
      portal,
      show,
      animation,
      duration,

      maskAttribute = {},

      caption,
      captionAttribute = {},

      icon,

      contentAttribute = {},

      submitCaption = locale['ok'] || '确定',
      submitAttribute = {},

      cancelCaption = locale['cancel'] || '取消',
      cancelAttribute = {},

      children,
      ...others
    } = this.props;
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
        className={`mask alert-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}
        style={Object.assign({}, durationStyle, maskAttribute.style || {})}
      >
        <div
          data-animation={animation}
          {...others}
          className={`alert${animationClassName ? ' ' + animationClassName : ''}${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}
          style={Object.assign({}, durationStyle, others.style || {})}
        >
          {caption && <h1 {...captionAttribute}>{caption}</h1>}
          <div {...contentAttribute} className={`alert-content${contentAttribute.className ? ' ' + contentAttribute.className : ''}`}>
            {icon}
            {/* 内容 */}
            {children}
          </div>
          <div className="alert-handler">
            {cancelAttribute.onClick && <a {...cancelAttribute} className={`alert-cancel button lg${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelCaption}</a>}
            {submitAttribute.onClick && <a {...submitAttribute} className={`alert-submit button lg${submitAttribute.className ? ' ' + submitAttribute.className : ''}`}>{submitCaption}</a>}
          </div>
        </div>
      </div>,
      portal || this.context.portal || document.getElementById('root') || document.body
    );
  }
}
