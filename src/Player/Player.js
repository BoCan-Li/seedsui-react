import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Device from '../Device';
import FullScreen from '../FullScreen';
import MediaUtil from '../MediaUtil';

export default class Player extends Component {
  static propTypes = {
    src: PropTypes.string,
    poster: PropTypes.string,
    videoAttribute: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.node
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var video = this.$video;
    FullScreen.addHandler(video, (e) => {
      if (FullScreen.isFull(video)) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
  // 默认点击预览
  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
      return;
    }
    var target = e.currentTarget.querySelector('video');
    FullScreen.enter(target);

    setTimeout(() => {
      target.play();
    }, 500);
    e.stopPropagation();
  }
  // 获取媒体类型
  getType = () => {
    const {src} = this.props;
    return MediaUtil.sourceType(src);
  }
  render() {
    const {
      src,
      poster,
      videoAttribute = {},
      onClick,
      children,
      ...others
    } = this.props;
    // Andriod
    if (Device.os === 'andriod' || onClick) {
      return (
        <div ref={(el) => {this.$el = el}} {...others} className={'player-thumbnail' + (others.className ? ' ' + others.className : '')} onClick={this.onClick}>
          <video ref={(el) => {this.$video = el}} {...videoAttribute} className={'player-thumbnail-video' + (others.videoAttribute ? ' ' + others.videoAttribute : '')}>
            <source src={src} type={this.getType()} />
            您的浏览器不支持 video 标签。
          </video>
          {poster && <div style={{backgroundImage: `url(${poster})`}} className="player-thumbnail-poster"/>}
          <div className="player-thumbnail-button"></div>
          {children}
        </div>
      )
    }
    // Ios
    return (
      <div ref={(el) => {this.$el = el}} {...others} className={'player-thumbnail' + (others.className ? ' ' + others.className : '')}>
        <video controls ref={(el) => {this.$video = el}} {...videoAttribute} className={'player-thumbnail-video' + (others.videoAttribute ? ' ' + others.videoAttribute : '')}>
          <source src={src} type={this.getType()} />
          您的浏览器不支持 video 标签。
        </video>
        {children}
      </div>
    );
  }
}
