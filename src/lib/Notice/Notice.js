import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon';
export default class Notice extends Component {
  static propTypes = {
    show: PropTypes.bool,
    
    className: PropTypes.string,
    style: PropTypes.object,

    wrapperParams: PropTypes.object,

    icon: PropTypes.node,
    iconParams: PropTypes.object,

    caption: PropTypes.node,
    captionParams: PropTypes.object,
    sndcaption: PropTypes.node,
    sndcaptionParams: PropTypes.object,

    children: PropTypes.node
  }
  static defaultProps = {
    show: true,
    wrapperParams: {},
    iconParams: {
      className: 'notice-icon-nodata'
    },
    caption: '暂无数据',
    captionParams: {},
    sndcaptionParams: {}
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      show,
      className, style,
      wrapperParams,
      icon, iconParams,
      caption, captionParams,
      sndcaption, sndcaptionParams,
      children,
      ...others
    } = this.props;
    return (
      show ? <div ref={el => {this.$el = el;}} className={`notice${className ? ' ' + className : ''}`} style={style} {...others}>
        <div {...wrapperParams} className={`notice-wrapper${wrapperParams.className ?  ' ' + wrapperParams.className : ''}`}>
          {(iconParams.src || iconParams.className) && <Icon {...iconParams} className={`notice-icon${iconParams.className ? ' ' + iconParams.className : ''}`}/>}
          {icon}
          {caption && <div {...captionParams} className={`notice-caption${captionParams.className ?  ' ' + captionParams.className : ''}`}>{caption}</div>}
          {sndcaption && <div {...sndcaptionParams} className={`notice-sndcaption${sndcaptionParams.className ?  ' ' + sndcaptionParams.className : ''}`}>{sndcaption}</div>}
          {children}
        </div>
      </div> : null
    );
  }
}
