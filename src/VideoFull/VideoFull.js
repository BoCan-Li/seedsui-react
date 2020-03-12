import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class VideoFull extends Component {
  static propTypes = {
    poster: PropTypes.string,
    m3u8: PropTypes.string,
    flv: PropTypes.string,
    mp4: PropTypes.string,
    autoPlay: PropTypes.bool,
    libSrc: PropTypes.string
  };
  componentWillMount() {
  }
  loadTcPlayer = () => {
    return new Promise((resolve) => {
      var script = document.getElementById('_typlayer_lib_');
      if (script) {
        resolve(true);
        return;
      }
      script = document.createElement('script')
      script.id = '_typlayer_lib_'
      script.type = 'text/javascript'
      script.charset = 'utf-8'
      script.src = this.props.libSrc || '//imgcache.qq.com/open/qcloud/video/vcplayer/TcPlayer-2.3.2.js'
      document.body.appendChild(script)
      script.onload = function () {
        resolve(true)
      }
      script.onerror = function () {
        resolve(false)
      }
    });
  }
  async componentDidMount() {
    const {
      poster,
      m3u8,
      flv,
      mp4,
      autoPlay
    } = this.props;
    const width = this.$el.clientWidth;
    const height = this.$el.clientHeight;
    if (!await this.loadTcPlayer()) {
      console.error('加载TcPlayer出错, 请稍后再试')
      return
    }
    // 构建参数
    let params = {
      autoplay: autoPlay || false, // iOS 下 safari 浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
      poster: {
        style: 'stretch',
        src: poster
      },
      width: width, // 视频的显示宽度，请尽量使用视频分辨率宽度
      height: height // 视频的显示高度，请尽量使用视频分辨率高度
    };
    if (m3u8) params.m3u8 = m3u8;
    if (flv) params.flv = flv; // 增加了一个 flv 的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
    if (mp4) params.mp4 = mp4;
    if (!m3u8 && !flv && !mp4) {
      console.warn('请传入视频源');
      return;
    }
    // eslint-disable-next-line
    this.instance = new TcPlayer('_id_tcplayer_video_container_', params);
  }
  render() {
    return (
      <div className="videofull-page" ref={(el) => {this.$el = el}}>
        <div id="_id_tcplayer_video_container_"></div>
      </div>
    );
  }
}
