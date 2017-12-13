import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';

export default class List extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    args: PropTypes.array,
    onClick: PropTypes.func,

    licon: PropTypes.node,
    ricon: PropTypes.node,

    liconSrc: PropTypes.string,
    riconSrc: PropTypes.string,

    thumbnail: PropTypes.bool,
    thumbnailStyle: PropTypes.object,
    thumbnailSrc: PropTypes.string,
    thumbnailAfter: PropTypes.node,
    onClickThumbnail: PropTypes.func,

    avatar: PropTypes.bool,
    avatarStyle: PropTypes.object,
    avatarSrc: PropTypes.string,
    avatarAfter: PropTypes.node,
    onClickAvatar: PropTypes.func,

    caption: PropTypes.node,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,

    sndcaption: PropTypes.node,

    containerStyle: PropTypes.object,
    containerAfter: PropTypes.node,
  }
  static defaultProps = {
    args: []
  }
  constructor(props) {
    super(props);
  }
  onClick = (e) => {
    const {args, onClick} = this.props;
    onClick(e, ...args);
  }
  render() {
    const { style, className,
      licon, ricon,
      liconSrc, riconSrc,
      thumbnail, thumbnailSrc, thumbnailStyle, thumbnailAfter, onClickThumbnail,
      avatar, avatarSrc, avatarStyle, avatarAfter, onClickAvatar,
      caption, captionClassName, captionStyle,
      sndcaption,
      containerStyle, containerAfter} = this.props;
    return (
      <div className={`list-li ${className}`} style={style} onClick={this.onClick}>
        {liconSrc && <Icon src={liconSrc}/>}
        {licon}
        {thumbnail && <div className="list-thumbnail" style={thumbnailStyle} onClick={onClickThumbnail}>
          {thumbnailSrc && <span className="list-thumbnail-img" style={{backgroundImage: `url(${thumbnailSrc})`}}></span>}
          {thumbnailAfter}
          {/* <div className="sticker sticker-icon top left">
            <span className="size12 icon-fav-fill"></span>
          </div> */}
        </div>}
        {avatar && <div className="list-avatar" style={avatarStyle} onClick={onClickAvatar}>
          {avatarSrc && <span className="list-avatar-img" style={{backgroundImage: `url(${avatarSrc})`}}></span>}
          {avatarAfter}
        </div>}
        <div className="list-container" style={containerStyle}>
          {caption && <div className={`list-title ${captionClassName}`} style={captionStyle}>
            {caption}
          </div>}
          {sndcaption && <small>{sndcaption}</small>}
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
        {ricon}
        {riconSrc && <Icon className="size16" src={riconSrc}/>}
      </div>
    );
  }
}
