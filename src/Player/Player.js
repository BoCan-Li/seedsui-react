import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerDialog from './PlayerDialog';

export default class Player extends Component {
  // 全局配置
  static contextTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object
  }
  static propTypes = {
    portal: PropTypes.object,
    src: PropTypes.string,
    maskAttribute: PropTypes.object,
    videoAttribute: PropTypes.object,
    poster: PropTypes.string,
    children: PropTypes.node
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  state = {
    videoShow: false
  }
  componentDidMount () {
    this.$ComponentPlayerDialog = this.refs.$ComponentPlayerDialog;
    this.$video = this.refs.$ComponentPlayerDialog.$el;
  }
  // 显隐视频弹窗
  play = (e, show) => {
    this.setState({
      videoShow: show
    });
    e.stopPropagation();
  }
  render() {
    const {
      portal,
      src,
      maskAttribute = {},
      videoAttribute = {},
      poster,
      children,
      ...others
    } = this.props;
    return (
      <div ref={(el) => {this.$el = el}} {...others} className={'player-thumbnail' + (others.className ? ' ' + others.className : '')} onClick={others.onClick ? others.onClick : (e) => this.play(e, true)}>
        {poster && <div style={{backgroundImage: `url(${poster})`}} className="player-thumbnail-poster"/>}
        <div className="player-thumbnail-button"></div>
        {children}
        <PlayerDialog
          ref="$ComponentPlayerDialog"
          show={this.state.videoShow}
          portal={portal}
          src={src}
          maskAttribute={maskAttribute}
          videoAttribute={videoAttribute}
          onHide={(e) => this.play(e, false)}
        />
      </div>
    );
  }
}
