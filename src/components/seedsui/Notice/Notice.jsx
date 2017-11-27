import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Notice extends Component {
  static propTypes = {
    img: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
    args: PropTypes.array
  }
  static defaultProps = {
    text: '',
    style: {}
  }
  onClick = (event) => {
    if (this.props.onClick) this.props.onClick(event, ...this.props.args);
  }
  render() {
    const { style, img, text } = this.props;
    return (
      <div className="notice" style={style}>
        <div className="notice-content" onClick={this.onClick}>
          <img alt="" className="notice-icon" src={img} />
          <p>{text}</p>
        </div>
      </div>
    );
  }
}
