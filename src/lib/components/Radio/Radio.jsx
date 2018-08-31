import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Radio extends Component {
  static propTypes = {
    args: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,

    name: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,

    caption: PropTypes.string,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object
  }
  static defaultProps = {
    args: null,
    value: '',
    checked: false
  }
  constructor(props) {
    super(props);
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onClick = (e) => {
    if (this.props.disabled) return;
    if (this.props.onClick) {
      this.props.onClick(this.$input.checked, this.getArgs(e));
    }
  }
  render() {
    const {style, className,
      name, value, checked,
      caption, captionClassName, captionStyle} = this.props;
    return (<div className={`radio-box${className ? ' ' + className : ''}`} onClick={this.onClick} style={style}>
      <input readOnly={true} checked={checked} type="radio" className="radio events-none" name={name} value={value} ref={(el) => {this.$input = el}}/>
      {caption && <span className={`radio-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{caption}</span>}
    </div>);
  }
}