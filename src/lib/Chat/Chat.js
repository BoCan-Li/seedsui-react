import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Chat extends Component {
  static propTypes = {
    args: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,

    showAvatar: PropTypes.bool,
    avatarClassName: PropTypes.string,
    avatarStyle: PropTypes.object,
    avatarSrc: PropTypes.string,
    avatarAfter: PropTypes.node,
    onClickAvatar: PropTypes.func,

    author: PropTypes.string,
    authorClassName: PropTypes.string,
    authorStyle: PropTypes.object,

    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    onClickContent: PropTypes.func,

    children: PropTypes.node
  }
  static defaultProps = {
    args: null
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onClick = (e) => {
    const {onClick} = this.props;
    if (onClick){
      onClick(this.getArgs(e));
      e.stopPropagation();
    }
  }
  onClickContent = (e) => {
    if (this.props.onClickContent) {
      this.props.onClickContent(this.getArgs(e));
      e.stopPropagation();
    }
  }
  onClickAvatar = (e) => {
    if (this.props.onClickAvatar) {
      this.props.onClickAvatar(this.getArgs(e));
      e.stopPropagation();
    }
  }
  render() {
    const {
      style, className,
      showAvatar, avatarSrc, avatarClassName, avatarStyle, avatarAfter,
      author, authorClassName, authorStyle,
      contentClassName, contentStyle, children
    } = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={`chat${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}> 
        {showAvatar && <div className={`chat-photo`} onClick={this.onClickAvatar}> 
          <div className={`chat-avatar${avatarClassName ? ' ' + avatarClassName : ''}`} style={Object.assign(avatarSrc ? {backgroundImage: `url(${avatarSrc})`} : {}, avatarStyle)}>{avatarAfter}</div>
          {author && <div className={`chat-author${authorClassName ? ' ' + authorClassName : ''}`} style={authorStyle}>{author}</div>}
        </div>}
        <div className="chat-content-box">
          <div onClick={this.onClickContent} className={`chat-content${contentClassName ? ' ' + contentClassName : ''}`} style={contentStyle}>
            {children}
          </div> 
        </div>
      </div>
    );
  }
}
