import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './instance.js';

export default class Preview extends Component {
  static propTypes = {
    portal: PropTypes.object,
    
    src: PropTypes.string,
    layerHTML: PropTypes.string,
    show: PropTypes.bool
  }
  static defaultProps = {
    show: false
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    if (!this.instance) return false;
    if (this.props.src !== prevProps.src) {
      this.instance.setSrc(this.props.src)
      this.instance.update()
    }
    if (this.props.layerHTML !== prevProps.layerHTML) {
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
      layerHTML: this.props.layerHTML
    });
    this.instance = instance;
  }
  render() {
    const {
      portal,
      src, layerHTML,
      show,
      ...others
    } = this.props;
    if (!src) {
      return null;
    }
    return createPortal(
      <div ref={(el) => {this.$el = el}} className={`preview-mask needsclick`} {...others}>
        <div className={`preview-header`}>
          <div className={`preview-header-left`}></div>
        </div>
        <div className={`preview-container`}></div>
      </div>,
      portal || document.getElementById('root')
    );
  }
}
