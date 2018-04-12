import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';

export default class Sliver extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    
    caption: PropTypes.node,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,

    rcaption: PropTypes.node,
    rcaptionClassName: PropTypes.string,
    rcaptionStyle: PropTypes.object,

    onClickContainer: PropTypes.func,
    onClickRcaption: PropTypes.func,

    licon: PropTypes.node,
    liconSrc: PropTypes.string,
    liconStyle: PropTypes.object,
    liconClassName: PropTypes.string,
    onClickLicon: PropTypes.func,

    ricon: PropTypes.node,
    riconSrc: PropTypes.string,
    riconClassName: PropTypes.string,
    riconStyle: PropTypes.object,
    onClickRicon: PropTypes.func,
  }
  constructor(props) {
    super(props);
  }
  onClick = (e) => {
    const {args, onClick, onClickLicon, onClickRicon} = this.props;
    if (e.target.classList.contains('licon') && onClickLicon) {
      onClickLicon(args);
    } else if (e.target.classList.contains('ricon') && onClickRicon) {
      onClickRicon(args);
    } else {
      if (onClick) onClick(args);
    }
  }
  render() {
    const {
      className, style, onClickContainer, onClickRcaption,
      licon, liconSrc, liconStyle, liconClassName,
      ricon, riconSrc, riconClassName, riconStyle,
      caption, captionClassName, captionStyle,
      rcaption, rcaptionClassName, rcaptionStyle,
    } = this.props;
    return (
      <div className={`sliver${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}>
        {(liconSrc || liconClassName) && <Icon className={`licon${liconClassName ? ' ' + liconClassName : ''}`} src={liconSrc ? liconSrc : ''} style={liconStyle}/>}
        {licon}
        {caption && <div onClick={onClickContainer} className={`sliver-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{caption}</div>}
        {rcaption && <div onClick={onClickRcaption} className={`sliver-rcaption${rcaptionClassName ? ' ' + rcaptionClassName : ''}`} style={rcaptionStyle}>{rcaption}</div>}
        {(riconSrc || riconClassName) && <Icon className={`ricon size16${riconClassName ? ' ' + riconClassName : ''}`} src={riconSrc ? riconSrc : ''} style={riconStyle}/>}
        {ricon}
      </div>
    );
  }
}
