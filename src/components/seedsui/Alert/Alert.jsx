import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';
const IconStyle = {display: 'block', margin: '10px auto 12px auto'};
export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    iconSrc: PropTypes.string,
    iconClassName: PropTypes.string,
    title: PropTypes.node,
    text: PropTypes.node,
    args: PropTypes.array,
    submitText: PropTypes.node,
    cancelText: PropTypes.node,
    onClickSubmit: PropTypes.func,
    onClickCancel: PropTypes.func,
    children: PropTypes.node
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
  onClickCancel = (e) => {
    const {args, onClickCancel} = this.props;
    if (onClickCancel) onClickCancel(e, ...args);
  }
  onClickSubmit = (e) => {
    const {args, onClickSubmit} = this.props;
    if (onClickSubmit) onClickSubmit(e, ...args);
  }
  componentDidMount = () => {
  }
  render() {
    const {className, show, children, iconSrc, iconClassName, title, text, cancelText, submitText, args, onClickCancel, onClickSubmit} = this.props;
    return (
      <div className={`mask ${(className ? className : '')} ${(show ? 'active' : '')}`}>
        <div className={`alert ${(show ? 'active' : '')}`}>
          {title && <h1>{title}</h1>}
          <div className="alert-content">
            {(iconSrc || iconClassName) && <Icon className={`size40 ${iconClassName ? iconClassName : ''}`} style={IconStyle} src={iconSrc}/>}
            {text}
            {/* 内容 */}
            {children}
          </div>
          <div className="alert-handler">
            {onClickCancel && <a className="alert-cancel" onClick={(e) => onClickCancel(e, ...args)}>{cancelText}</a>}
            {onClickSubmit && <a className="alert-submit" onClick={(e) => onClickSubmit(e, ...args)}>{submitText}</a>}
          </div>
        </div>
      </div>
    );
  }
}
