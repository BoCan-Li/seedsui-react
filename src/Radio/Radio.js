import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Radio extends Component {
  static propTypes = {
    value: PropTypes.string,
    checked: PropTypes.bool,

    inputAttribute: PropTypes.object,

    caption: PropTypes.string,
    captionAttribute: PropTypes.object,
    onClick: PropTypes.func
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
      onClick,
      ...others
    } = this.props;
    return (<div ref={(el) => {this.$el = el}} {...others} onClick={(e) => {if (onClick) onClick(e, e.target.getAttribute('data-checked') === 'true')}} data-checked={checked} data-name={value} className={`radio${others.className ? ' ' + others.className : ''}`}>
      <span {...inputAttribute} className={`radio-input${inputAttribute.className ? ' ' + inputAttribute.className : ''}`}/>
      {caption && <span {...captionAttribute} className={`radio-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{caption}</span>}
    </div>);
  }
}
