import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { closeWindow, goHome } from 'utils/WqJsBridge';

export default class Page extends Component {
  static propTypes = {
    theme: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    lBtn: PropTypes.array,
    rBtn: PropTypes.array,
    back: PropTypes.bool,
    children: PropTypes.node,
    isFromApp: PropTypes.string,
  }
  static defaultProps = {
    back: true,
    lBtn: []
  }
  constructor(props) {
    super(props);
  }
  onDefaultBack = () => {
    if (this.props.isFromApp === '1') {
      try {
        closeWindow();
      } catch (error) {
        console.log(error);
      }
    } else if (this.props.isFromApp === '2') {
      try {
        goHome();
      } catch (error) {
        console.log(error);
      }
    } else {
      history.go(-1);
    }
  }
  render() {
    const { title, back, lBtn, rBtn, theme, onClick, children } = this.props;
    let lBtnDOM = null;
    if (lBtn.length > 0) {
      lBtnDOM = lBtn.map((item, index) => {
        return (
          <a key={index} onClick={item.onClick} className={`titlebar-button ${item.className}`} style={item.style}>
            {item.icon && <i className={`icon ${item.icon}`}></i>}
            {item.text && <span >{item.text}</span>}
          </a>
        );
      });
    } else if (back) {
      lBtnDOM = (
        <a onClick={this.onDefaultBack} className="titlebar-button">
          <i className="shape-arrow-left"></i>
        </a>
      );
    }
    let rBtnDOM = null;
    if (rBtn) {
      rBtnDOM = rBtn.map((item, index) => {
        return (
          <a key={index} onClick={item.onClick} className={'titlebar-button' + (item.className ? ' ' + item.className : '')} style={item.style}>
            {item.icon && item.icon}
            {item.text && <span >{item.text}</span>}
          </a>
        );
      });
    }
    const titleDOM = children ? children : (<h1 className="titlebar-title nowrap text-center" onClick={onClick}>{title}</h1>);
    return (
      <div className={'titlebar' + (theme === 'reverse' ? ' reverse' : '')}>
        <div className="titlebar-left">
          {lBtnDOM}
        </div>
        {titleDOM}
        <div className="titlebar-right">
          {rBtnDOM}
        </div>
      </div>
    );
  }
}
