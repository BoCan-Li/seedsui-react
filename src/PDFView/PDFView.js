import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';
import BScroll from 'better-scroll';

export default class PDFView extends Component {
  static propTypes = {
    src: PropTypes.string
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  instance = () => {
    if (!this.props.src) return
    let bscroll = null;
    const instance = new Instance(this.$el, {
      source: this.props.src,
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
    if (!this.instance) return false;
    if (this.props.src && this.props.src !== prevProps.src) {
      this.instance.update()
    }
  }
  componentDidMount () {
    this.instance()
  }
  render() {
    const {
      src,
      ...others
    } = this.props;
    if (!src) {
      return null;
    }
    return (
      <div className="pdf-container" {...others} ref={(el) => {this.$el = el}}>
        <div className="pdf-wrapper"></div>
      </div>
    );
  }
}
