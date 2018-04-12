import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';
export default class Close extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    iconClassName: PropTypes.string,
    iconStyle: PropTypes.object,
    onClick: PropTypes.func
  }
  static defaultProps = {
    iconClassName: 'close-icon close-icon-clear size18'
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {className, style, iconClassName, iconStyle, onClick} = this.props;
    return (
      <span className={`close${className ? ' ' + className : ''}`} style={style} onClick={(e) => {onClick && onClick(e)}}>
        <Icon className={iconClassName} style={iconStyle}/>
      </span>
    );
  }
}