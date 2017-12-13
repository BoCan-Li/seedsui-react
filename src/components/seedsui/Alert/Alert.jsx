import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    iconSrc: PropTypes.string,
    text: PropTypes.node,
    args: PropTypes.array,
    submitText: PropTypes.node,
    cancelText: PropTypes.node,
    onClickSubmit: PropTypes.func,
    onClickCancel: PropTypes.func
  }
  static defaultProps = {
    text: '',
    show: false,
    args: [],
    submitText: '确定',
    cancelText: '取消',
  }
  constructor(props) {
    super(props);
  }
  onClick = (event, type) => {
    const args = this.props.args;
    switch (type) {
      case 'cancel':
        if (this.props.onClickSubmit) this.props.onClickSubmit(event, ...args);
        break;
      default:
        this.props.onClickSubmit(event, ...args);
    }
  }
  render() {
    const {className, iconSrc, show, text, cancelText, submitText, onClickCancel} = this.props;
    return (
      <div className={'mask' + (className ? ' ' + className : '') + (show ? ' active' : '')}>
        <div className={'alert' + (show ? ' active' : '')}>
          <div className="alert-content">
            {iconSrc && <Icon className="size40" style={{display: 'block', margin: '10px auto 12px auto'}} src={iconSrc}/>}
            {text}
          </div>
          <div className="alert-handler">
            {onClickCancel && <a onClick={(e) => {this.onClick(e, 'cancel');}}>{cancelText}</a>}
            <a onClick={(e) => {this.onClick(e, 'cancel');}}>{submitText}</a>
          </div>
        </div>
      </div>
    );
  }
}
