import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Article extends Component {
  static propTypes = {
    caption: PropTypes.node, // 标题
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.node,

    sndcaption: PropTypes.node, // 内容
    sndcaptionClassName: PropTypes.string,
    sndcaptionStyle: PropTypes.node,

    paragraphs: PropTypes.array, // 段落
    paragraphClassName: PropTypes.string,
    paragraphStyle: PropTypes.node,
    children: PropTypes.node
  };

  static defaultProps = {
  }

  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {
      caption, captionClassName, captionStyle,
      sndcaption, sndcaptionClassName, sndcaptionStyle,
      paragraphs, paragraphClassName, paragraphStyle,
      children
    } = this.props;
    return (
      <div className="article-box">
        {caption && <div className={`article-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{{caption}}</div>}
        {sndcaption && <div className={`article-sndcaption${sndcaptionClassName ? ' ' + sndcaptionClassName : ''}`} style={sndcaptionStyle}>{{sndcaption}}</div>}
        {paragraphs.map((paragraph) => {
          return <div className={`article-paragraph${paragraphClassName ? ' ' + paragraphClassName : ''}`} style={paragraphStyle}>{{paragraph}}</div>
        })}
        {children}
      </div>
    );
  }
}
