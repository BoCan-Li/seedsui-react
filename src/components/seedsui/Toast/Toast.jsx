import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Toast extends Component {
  static propTypes = {
    position: PropTypes.string, // top | middle | bottom
    img: PropTypes.string,
    text: PropTypes.string,
    mask: PropTypes.bool,
    show: PropTypes.bool,
    style: PropTypes.object
  }
  static defaultProps = {
    position: 'bottom',
    text: '',
    mask: false,
    show: false,
    style: {}
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { text, img, mask, show, position, style } = this.props;
    return (
      <div className={'mask toast-mask' + (show ? ' active' : '') + (mask ? '' : ' toast-propagation') + ' ' + position}>
        <div style={style} className={'toast' + (show ? ' active' : '')}>
          <div className="toast-wrapper">
            { img && <span className="toast-icon" style={{backgroundImage: `url(${img})`}}></span>}
            <span className="toast-font">{text}</span>
          </div>
        </div>
      </div>
    );
  }
}
