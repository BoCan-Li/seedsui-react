import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Alert extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,

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
    submitCaption: window._seeds_lang['ok'] || '确定',
    cancelCaption: window._seeds_lang['cancel'] || '取消',
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  render() {
    const {
      portal,
      show,

      maskAttribute = {},

      caption,
      captionAttribute = {},

      icon,

      contentAttribute = {},

      submitCaption,
      submitAttribute = {},

      cancelCaption,
      cancelAttribute = {},

      children,
      ...others
    } = this.props;
    return createPortal(
      <div ref={(el) => {this.$el = el}} {...maskAttribute} className={`mask alert-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}>
        <div data-animation="zoom" {...others} className={`alert${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}>
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
      this.props.portal || document.getElementById('root')
    );
  }
}
