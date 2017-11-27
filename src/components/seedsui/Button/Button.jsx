import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string,
    tipText: PropTypes.string,
    badgeText: PropTypes.string,
    args: PropTypes.array,
    disabled: PropTypes.bool
  }
  static defaultProps = {
    style: {},
    onClick: function() {},
    text: '',
    tipText: '',
    badgeText: '',
    args: []
  }
  onClick = (event) => {
    if (this.props.onClick) this.props.onClick(event, ...this.props.args);
  }
  render() {
    const { style, className, text, tipText, badgeText, disabled } = this.props;
    let textDOM = text;
    if (tipText || badgeText) textDOM = <span>{text}</span>;
    return (
      <a className={'button' + (className ? ' ' + className : '')} disabled={disabled} style={style} onClick={this.onClick}>
        {textDOM}
        {tipText && <span className="tip">{tipText}</span>}
        {badgeText && <span className="badge">{badgeText}</span>}
      </a>
    );
  }
}
