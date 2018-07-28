import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Article extends Component {
  static propTypes = {
    caption: PropTypes.node, // 标题
    sndcaption: PropTypes.node, // 内容
    paragraphs: PropTypes.array, // 段落
    children: PropTypes.node
  };

  static defaultProps = {
  }

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }
  render() {
    const {
      caption, sndcaption, paragraphs,
      children
    } = this.props;
    return (
      <div className="article-box">
        {caption && <div className="article-caption">{{caption}}</div>}
        {sndcaption && <div className="article-sndcaption">{{sndcaption}}</div>}
        {paragraphs.map((paragraph) => {
          return <div className="article-paragraph">{{paragraph}}</div>
        })}
        {children}
      </div>
    );
  }
}
