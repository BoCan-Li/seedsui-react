import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Device from '../Device';
import FullScreen from '../FullScreen';
import MediaUtil from '../MediaUtil';

export default class Player extends Component {
  static propTypes = {
    args: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,

    src: PropTypes.string,
    onClick: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
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
    if (this.props.onClick) {
      this.props.onClick(this.getArgs(e));
    } else {
      var target = e.currentTarget.querySelector('video');
      FullScreen.enter(target);

      setTimeout(() => {
        target.play();
      }, 500);
    }
    e.stopPropagation();
  }
  getType = () => {
    const {src} = this.props;
    return MediaUtil.sourceType(src);
  }
  render() {
    const {args, children, style, className, src, onClick, ...others} = this.props;
    // Andriod
    if (Device.os === 'andriod' || onClick) {
      return (
        <div ref={(el) => {this.$el = el}} className={'player-thumbnail' + (className ? ' ' + className : '')} style={style} onClick={this.onClick}>
          {!onClick && <video ref={(el) => {this.$video = el}} {...others}>
            <source src={src} type={this.getType()} />
            您的浏览器不支持 video 标签。
          </video>}
          {this.props.poster && <div style={{backgroundImage: `url(${this.props.poster})`}} className="player-thumbnail-poster"/>}
          <div className="player-thumbnail-button"></div>
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
