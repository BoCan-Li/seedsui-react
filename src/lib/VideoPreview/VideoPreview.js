import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class VideoPreview extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,
    src: PropTypes.string,
    controls: PropTypes.string,
    className: PropTypes.string
  }
  static defaultProps = {
    controls: 'controls',
    show: false
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  render() {
    const {show, src, controls, className, ...others} = this.props;
    if (!src || !show) return null
    return createPortal(
      <video
        ref={(el) => {this.$el = el;}}
        className={`player-full-screen${className ? ' ' + className : ''}`}
        webkit-playsinline="" playsInline x5-playsinline="" x-webkit-airplay="allow" // 解决ios会自动全屏
        preload="auto" // 页面加载后,预加载视频
        src={src}
        controls={controls}
        {...others}
      ></video>,
      this.props.portal || document.getElementById('root')
    );
  }
}
