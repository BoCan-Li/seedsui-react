import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';
import BScroll from 'better-scroll';

export default class PDFView extends Component {
  static propTypes = {
    pictures: PropTypes.array, // 图片地址
    src: PropTypes.string, // pdf地址
    stream: PropTypes.string, // pdf流
    errorHTML: PropTypes.string, // 加载错误时显示的信息
    loadHTML: PropTypes.string // 加载时显示的信息
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  instance = () => {
    const {
      src,
      stream,
      pictures,
      errorHTML,
      loadHTML
    } = this.props;
    if (!src && !stream && !pictures) return
    let bscroll = null;
    const instance = new Instance(this.$el, {
      src,
      stream,
      pictures,
      errorHTML,
      loadHTML,
      onLoad: () => {
        bscroll = new BScroll('.pdf-container', {
          scrollX: true,
          zoom: {
            start: 1,
            min: 1,
            max: 4
           }
        });
      }
    });
    this.bscroll = bscroll;
    this.instance = instance;
  }
  componentDidUpdate (prevProps) {
    const {
      src,
      stream,
      pictures,
      errorHTML,
      loadHTML
    } = this.props;
    if ((src && src !== prevProps.src) || (stream && stream !== prevProps.stream) || (pictures && pictures !== prevProps.pictures)) {
      if (!this.instance) {
        this.instance()
      } else {
        this.instance.update({
          src,
          stream,
          pictures,
          errorHTML,
          loadHTML
        })
      }
    }
  }
  componentDidMount () {
    this.instance()
  }
  render() {
    const {
      src,
      stream,
      pictures,
      errorHTML,
      loadHTML,
      ...others
    } = this.props;
    if (!src && !stream && !pictures) {
      return null;
    }
    return (
      <div className="pdf-container" {...others} ref={(el) => {this.$el = el}}>
        <div className="pdf-wrapper"></div>
      </div>
    );
  }
}
