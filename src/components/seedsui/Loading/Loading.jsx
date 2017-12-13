import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Loading extends Component {
  static propTypes = {
    type: PropTypes.string, // filling | floating
    maskBefore: PropTypes.node,
    img: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    loadingStyle: PropTypes.object
  }
  static defaultProps = {
    style: {}
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { style, className, type, img, text, loadingStyle, maskBefore } = this.props;
    let content = (<div className="loading-wrapper" style={loadingStyle}>
      {img && <img src={img} className="loading-icon"/>}
      {text && <p>{text}</p>}
    </div>);
    if (type === 'filling') { // 填料环
      content = (<div className="loading-filling active" style={loadingStyle}>
        <div className="loading-filling-wrapper"></div>
      </div>);
    } else if (type === 'floating') { // 流光
      content = (<div className="loading-floating animated" style={loadingStyle}>
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
        {maskBefore}
        {content}
      </div>
    );
  }
}
