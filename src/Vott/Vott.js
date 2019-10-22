import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Vott extends Component {
  static propTypes = {
    src: PropTypes.string,
    onChange: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  instance = () => {
    const instance = new Instance(this.$el, {
      src: this.props.src,
      onChange: this.props.onChange
    });
    this.instance = instance;
  }
  componentDidMount () {
    this.instance()
  }
  render() {
    const {
      src,
      onChange,
      ...others
    } = this.props;
    return (
      <div className="vott-container" {...others} ref={(el) => {this.$el = el}}>
        <svg className="vott-svg" preserveAspectRatio="none"></svg>
        <div className={`vott-loading active`}>
          <div className={`vott-loading-icon`}></div>
        </div>
        <div className={`vott-error`}>
          <div className={`vott-error-icon`}></div>
          <div className={`vott-error-caption`}>{window._seeds_lang['hint_image_failed_to_load'] || '图片加载失败'}</div>
        </div>
      </div>
    );
  }
}
