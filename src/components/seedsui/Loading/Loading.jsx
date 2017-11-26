import React, { Component } from 'react';import PropTypes from 'prop-types';
export default class Loading extends Component {
  static propTypes = {
    type: PropTypes.string, // filling | floating
    img: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string
  }
  static defaultProps = {
    style: {}
  }
  render() {
    const { style, className, type, img, text } = this.props;
    let content = (<div className="loading-wrapper">
      {img && <img src={img} className="loading-icon"/>}
      {text && <p>{text}</p>}
    </div>);
    if (type === 'filling') { // 填料环
      content = (<div className="loading-filling active">
        <div className="loading-filling-wrapper"></div>
      </div>);
    } else if (type === 'floating') { // 流光
      content = (<div className="loading-floating animated">
        <div className="loading-floating-wrapper">
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
          <div className="loading-floating-blade"></div>
        </div>
        <div className="loading-floating-text">{{text}}</div>
      </div>);
    }
    return (
      <div className={'loading-mask mask active' + (className ? ' ' + className : '')} style={style}>
        {content}
      </div>
    );
  }
}
