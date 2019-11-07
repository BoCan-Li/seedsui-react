import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Radio extends Component {
  static propTypes = {
    value: PropTypes.string,
    checked: PropTypes.bool,

    inputAttribute: PropTypes.object,

    caption: PropTypes.string,
    captionAttribute: PropTypes.object
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      value,
      checked,
      inputAttribute = {},
      caption,
      captionAttribute = {},
      ...others
    } = this.props;
    return (<div ref={(el) => {this.$el = el}} {...others} data-checked={checked} data-value={value} className={`radio${others.className ? ' ' + others.className : ''}`}>
      <span {...inputAttribute} className={`radio-input${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}/>
      {caption && <span {...captionAttribute} className={`radio-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{caption}</span>}
    </div>);
  }
}
