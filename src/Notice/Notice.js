import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Notice extends Component {
  static propTypes = {
    wrapperParams: PropTypes.object,

    icon: PropTypes.node,

    caption: PropTypes.node,
    captionParams: PropTypes.object,
    sndcaption: PropTypes.node,
    sndcaptionParams: PropTypes.object,

    children: PropTypes.node
  }
  static defaultProps = {
    wrapperParams: {},
    caption: '暂无数据',
    captionParams: {},
    sndcaptionParams: {}
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      wrapperParams,
      icon,
      caption, captionParams,
      sndcaption, sndcaptionParams,
      children,
      ...others
    } = this.props;
    return (
      <div ref={el => {this.$el = el;}} {...others} className={`notice${others.className ? ' ' + others.className : ''}`}>
        <div {...wrapperParams} className={`notice-wrapper${wrapperParams.className ?  ' ' + wrapperParams.className : ''}`}>
          {icon ? icon : <i className="icon notice-icon notice-icon-nodata"></i>}
          {caption && <div {...captionParams} className={`notice-caption${captionParams.className ?  ' ' + captionParams.className : ''}`}>{caption}</div>}
          {sndcaption && <div {...sndcaptionParams} className={`notice-sndcaption${sndcaptionParams.className ?  ' ' + sndcaptionParams.className : ''}`}>{sndcaption}</div>}
          {children}
        </div>
      </div>
    );
  }
}
