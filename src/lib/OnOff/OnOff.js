import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OnOff extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    readOnly: PropTypes.bool,
    checked: PropTypes.bool,
    onCaption: PropTypes.string,
    offCaption: PropTypes.string,
    onClick: PropTypes.func
  }
  static defaultProps = {
    onCaption: '',
    offCaption: ''
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  onClick = () => {
    const {readOnly, checked, onClick} = this.props;
    if (readOnly) return;
    if (onClick) {
      if (checked) onClick(true);
      else onClick(false);
    }
  }
  render() {
    const {
      className, style, checked, onCaption, offCaption,
      readOnly, onClick, ...others
    } = this.props;
    return (
      <div className={`onoff${className ? ' ' + className : ''}${onCaption && offCaption ? '' : ' notext'}${checked ? ' active' : ''}`} style={style} data-on={onCaption} data-off={offCaption} onClick={this.onClick} {...others}>
        <div className="onoff-handle"></div>
      </div>
    );
  }
}
