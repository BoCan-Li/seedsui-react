import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Chat extends Component {
  static propTypes = {
    icon: PropTypes.node,

    contentAttribute: PropTypes.object,
    textAttribute: PropTypes.object,

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
      contentAttribute = {},
      textAttribute = {},
      children,
      ...others
    } = this.props;
    return (
      <div ref={el => {this.$el = el;}} {...others} className={`chat${others.className ? ' ' + others.className : ''}`}> 
        {icon}
        <div {...contentAttribute} className={`chat-content${contentAttribute.className ?  ' ' + contentAttribute.className : ''}`}>
          <div {...textAttribute} className={`chat-content-text${textAttribute.className ? ' ' + textAttribute.className : ''}`}>
            {children}
          </div> 
        </div>
      </div>
    );
  }
}
