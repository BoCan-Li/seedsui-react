import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Toast extends Component {
  static propTypes = {
    portal: PropTypes.object,
    
    show: PropTypes.bool,

    maskAttribute: PropTypes.object,

    caption: PropTypes.node,
    captionAttribute: PropTypes.object,

    icon: PropTypes.node
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  render() {
    const {
      portal,
      show,
      maskAttribute = {},
      icon,
      caption,
      captionAttribute = {},
      ...others
    } = this.props;
    return createPortal(
      <div ref={(el) => {this.$el = el}} {...maskAttribute} className={`mask toast-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}${show ? ' active' : ''}`}>
        <div {...others} className={`toast${others.className ? ' ' + others.className : ''}${show ? ' active' : ''}`}>
          <div className="toast-wrapper">
            {icon}
            {caption && <span {...captionAttribute} className={`toast-caption${captionAttribute.className ? ' ' + captionAttribute.className : ''}`}>{caption}</span>}
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
