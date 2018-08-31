import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon';

export default class List extends Component {
  static propTypes = {
    args: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,

    onClickContainer: PropTypes.func,

    licon: PropTypes.node,
    liconSrc: PropTypes.string,
    liconClassName: PropTypes.string,
    liconStyle: PropTypes.object,
    onClickLicon: PropTypes.func,

    ricon: PropTypes.node,
    riconSrc: PropTypes.string,
    riconClassName: PropTypes.string,
    riconStyle: PropTypes.object,
    onClickRicon: PropTypes.func,

    showThumbnail: PropTypes.bool,
    thumbnailStyle: PropTypes.object,
    thumbnailSrc: PropTypes.string,
    thumbnailAfter: PropTypes.node,
    onClickThumbnail: PropTypes.func,

    showAvatar: PropTypes.bool,
    avatar: PropTypes.bool,
    avatarStyle: PropTypes.object,
    avatarSrc: PropTypes.string,
    avatarAfter: PropTypes.node,
    onClickAvatar: PropTypes.func,

    caption: PropTypes.node,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,

    rcaption: PropTypes.node,
    rcaptionClassName: PropTypes.string,
    rcaptionStyle: PropTypes.object,
    onClickRcaption: PropTypes.func,

    sndcaption: PropTypes.node,
    sndcaptionClassName: PropTypes.string,
    sndcaptionStyle: PropTypes.object,

    containerClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    containerAfter: PropTypes.node,
  }
  static defaultProps = {
    args: null
  }
  constructor(props) {
    super(props);
    this.state = {}
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
  onClick = (e) => {
    const {onClick, onClickLicon, onClickRicon, onClickRcaption} = this.props;
    const classList = e.target.classList;
    if (classList.contains('licon') && onClickLicon) {
      onClickLicon(this.getArgs(e));
    } else if (classList.contains('ricon') && onClickRicon) {
      onClickRicon(this.getArgs(e));
    } else if (classList.contains('list-rcaption') && onClickRcaption) {
      onClickRcaption(this.getArgs(e));
    } else {
      if (onClick) onClick(this.getArgs(e));
    }
    e.stopPropagation();
  }
  onClickContainer = (e) => {
    if (this.props.onClickContainer) {
      this.props.onClickContainer(this.getArgs(e));
      e.stopPropagation();
    }
  }
  onClickThumbnail = (e) => {
    if (this.props.onClickThumbnail) {
      this.props.onClickThumbnail(this.getArgs(e));
      e.stopPropagation();
    }
  }
  onClickAvatar = (e) => {
    if (this.props.onClickAvatar) {
      this.props.onClickAvatar(this.getArgs(e));
      e.stopPropagation();
    }
  }
  render() {
    const { style, className,
      licon, liconSrc, liconClassName, liconStyle,
      ricon, riconSrc, riconClassName, riconStyle,
      showThumbnail, thumbnailSrc, thumbnailClassName, thumbnailStyle, thumbnailAfter,
      showAvatar, avatarSrc, avatarStyle, avatarAfter,
      caption, captionClassName, captionStyle,
      rcaption, rcaptionClassName, rcaptionStyle,
      sndcaption, sndcaptionClassName, sndcaptionStyle,
      containerClassName, containerStyle, containerAfter} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={`list-li${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}>
        {(liconSrc || liconClassName) && <Icon className={`licon${liconClassName ? ' ' + liconClassName : ''}`} src={liconSrc} style={liconStyle}/>}
        {licon && licon}
        {showThumbnail && <div className={`list-thumbnail${thumbnailClassName ? ' ' + thumbnailClassName : ''}`} style={thumbnailStyle} onClick={this.onClickThumbnail}>
          {thumbnailSrc && <span className="list-thumbnail-img" style={{backgroundImage: `url(${thumbnailSrc})`}}></span>}
          {thumbnailAfter}
          {/* <div className="sticker sticker-icon top left">
            <span className="size12 icon-fav-fill"></span>
          </div> */}
        </div>}
        {showAvatar && <div className="list-avatar" style={avatarStyle} onClick={this.onClickAvatar}>
          {avatarSrc && <span className="list-avatar-img" style={{backgroundImage: `url(${avatarSrc})`}}></span>}
          {avatarAfter}
        </div>}
        <div className={`list-container${containerClassName ? ' ' + containerClassName : ''}`} style={containerStyle} onClick={this.onClickContainer}>
          {caption && <div className={`list-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{caption}</div>}
          {sndcaption && <div className={`list-sndcaption${sndcaptionClassName ? ' ' + sndcaptionClassName : ''}`} style={sndcaptionStyle}>{sndcaption}</div>}
          {containerAfter}
          {/* <div className="row-flex box-middle">
            <i className="list-icon icon-person color-primary"></i>
            <p className="list-font">
              最多可容纳100人
            </p>
          </div>
          <div className="row-flex box-middle">
            <i className="list-icon icon-computer color-primary"></i>
            <p className="list-font">音箱，大屏，投影仪，WIFI，麦克风</p>
          </div> */}
        </div>
        {rcaption && <div className={`list-rcaption${rcaptionClassName ? ' ' + rcaptionClassName : ''}`} style={rcaptionStyle}>{rcaption}</div>}
        {(riconSrc || riconClassName) && <Icon className={`ricon size16${riconClassName ? ' ' + riconClassName : ''}`} src={riconSrc} style={riconStyle}/>}
        {ricon && ricon}
      </div>
    );
  }
}
