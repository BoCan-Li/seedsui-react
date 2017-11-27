import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,

    licon: PropTypes.node,

    thumbnail: PropTypes.string,
    thumbnailStyle: PropTypes.object,
    thumbnailInner: PropTypes.node,
    onClickThumbnail: PropTypes.func,

    avatar: PropTypes.string,
    avatarInner: PropTypes.node,

    caption: PropTypes.node,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,

    sndcaption: PropTypes.node,

    containerStyle: PropTypes.object,
    containerInner: PropTypes.node,

    ricon: PropTypes.node,
  }
  static defaultProps = {
  }

  render() {
    const { style, className, onClick,
      licon,
      thumbnail, thumbnailStyle, thumbnailInner, onClickThumbnail,
      avatar, avatarInner,
      caption, captionClassName, captionStyle,
      sndcaption,
      containerStyle, containerInner,
      ricon } = this.props;
    return (
      <div className={`list-li ${className}`} style={style} onClick={onClick}>
        {licon}
        {thumbnail && <div className="list-thumbnail" style={thumbnailStyle} onClick={onClickThumbnail}>
          <span className="list-thumbnail-img" style={{backgroundImage: `url(${thumbnail})`}}></span>
          {thumbnailInner}
          {/* <div className="sticker sticker-icon top left">
            <span className="size12 icon-fav-fill"></span>
          </div> */}
        </div>}
        {avatar && <div className="list-avatar">
          <span className="list-avatar-img" style={{backgroundImage: `url(${avatar})`}}></span>
          {avatarInner}
        </div>}
        <div className="list-container" style={containerStyle}>
          {caption && <div className={`list-title ${captionClassName}`} style={captionStyle}>
            {caption}
          </div>}
          {sndcaption && <small>{sndcaption}</small>}
          {containerInner}
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
      </div>
    );
  }
}
