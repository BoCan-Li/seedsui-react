import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Chat extends Component {
  static propTypes = {
    icon: PropTypes.node,

    contentParams: PropTypes.object,
    textParams: PropTypes.object,

    children: PropTypes.node
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      icon,
      contentParams = {},
      textParams = {},
      children,
      ...others
    } = this.props;
    return (
      <div ref={el => {this.$el = el;}} {...others} className={`chat${others.className ? ' ' + others.className : ''}`}> 
        {icon}
        <div {...contentParams} className={`chat-content${contentParams.className ?  ' ' + contentParams.className : ''}`}>
          <div {...textParams} className={`chat-content-text${textParams.className ? ' ' + textParams.className : ''}`}>
            {children}
          </div> 
        </div>
      </div>
    );
  }
}
