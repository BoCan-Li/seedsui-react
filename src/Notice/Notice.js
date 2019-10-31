import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Notice extends Component {
  static propTypes = {
    wrapperAttribute: PropTypes.object,

    icon: PropTypes.node,

    caption: PropTypes.node,
    captionAttribute: PropTypes.object,
    sndcaption: PropTypes.node,
    sndcaptionAttribute: PropTypes.object,

    content: PropTypes.node,
    contentHTML: PropTypes.string
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      wrapperAttribute = {},
      icon,
      caption = '暂无数据', captionAttribute = {},
      sndcaption, sndcaptionAttribute = {},
      content,
      contentHTML,
      ...others
    } = this.props;
    return (
      <div ref={el => {this.$el = el;}} {...others} className={`notice${others.className ? ' ' + others.className : ''}`}>
        <div {...wrapperAttribute} className={`notice-wrapper${wrapperAttribute.className ?  ' ' + wrapperAttribute.className : ''}`}>
          {icon ? icon : <i className="icon notice-icon notice-icon-nodata"></i>}
          {caption && <div {...captionAttribute} className={`notice-caption${captionAttribute.className ?  ' ' + captionAttribute.className : ''}`}>{caption}</div>}
          {sndcaption && <div {...sndcaptionAttribute} className={`notice-sndcaption${sndcaptionAttribute.className ?  ' ' + sndcaptionAttribute.className : ''}`}>{sndcaption}</div>}
          {content}
          {contentHTML && <div dangerouslySetInnerHTML={{__html: contentHTML}}></div>}
        </div>
      </div>
    );
  }
}
