import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Device from '../Device';
import FullScreen from '../FullScreen';

export default class Player extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,

    src: PropTypes.string
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
  onClick = (e) => {
    var target = e.currentTarget.querySelector('video');
    FullScreen.enter(target);
  }
  getType = () => {
    const {src} = this.props;
    if (src.substring(src.length - 4).toLowerCase() === '.mp4') {
      return 'video/mp4';
    }
    if (src.substring(src.length - 4).toLowerCase() === '.ogg') {
      return 'video/ogg';
    }
    return '';
  }
  render() {
    const {children, style, className, src, ...others} = this.props;
    // Andriod
    if (Device.os === 'andriod') {
      return (
        <div ref={(el) => {this.$el = el}} className={'player-thumbnail' + (className ? ' ' + className : '')} style={style} onClick={this.onClick}>
          <video ref={(el) => {this.$video = el}} {...others}>
            <source src={src} type={this.getType()} />
            您的浏览器不支持 video 标签。
          </video>
          {children}
        </div>
      )
    }
    // Ios
    return (
      <div ref={(el) => {this.$el = el}} className={'player-thumbnail' + (className ? ' ' + className : '')} style={style}>
        <video controls ref={(el) => {this.$video = el}} {...others}>
          <source src={src} type={this.getType()} />
          您的浏览器不支持 video 标签。
        </video>
        {children}
      </div>
    );
  }
}
