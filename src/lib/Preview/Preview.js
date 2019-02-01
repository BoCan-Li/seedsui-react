import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './instance.js';

export default class Preview extends Component {
  static propTypes = {
    portal: PropTypes.object,
    show: PropTypes.bool,
    
    src: PropTypes.string,
    layerHTML: PropTypes.string,

    onClickBack: PropTypes.func
  }
  static defaultProps = {
    show: false
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    if (!this.instance) return false;
    if (this.props.src !== prevProps.src || this.props.layerHTML !== prevProps.layerHTML) {
      this.instance.setSrc(this.props.src)
      this.instance.setLayerHTML(this.props.layerHTML)
      this.instance.update()
    }
    if (this.props.show !== prevProps.show) {
      if (this.props.show) this.instance.show()
      else this.instance.hide()
    }
  }
  componentDidMount () {
    if (this.instance) return;
    var instance = new Instance({
      mask: this.$el,
      src: this.props.src,
      layerHTML: this.props.layerHTML,
      onClickBack: this.props.onClickBack
    });
    this.instance = instance;
  }
  render() {
    const {
      portal,
      show,
      src, layerHTML,
      onClickBack,
      ...others
    } = this.props;
    if (!src) {
      return null;
    }
    return createPortal(
      <div ref={(el) => {this.$el = el}} className={`preview-mask`} {...others}>
        <div className={`preview-header`}>
          <div className={`preview-header-back`}></div>
        </div>
        <div className={`preview-container`}></div>
      </div>,
      portal || document.getElementById('root')
    );
  }
}
