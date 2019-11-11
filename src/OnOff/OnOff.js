import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class OnOff extends Component {
  static propTypes = {
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onAttribute: PropTypes.object,
    offAttribute: PropTypes.object,
    onClick: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      checked,
      onAttribute = {},
      offAttribute = {},
      readOnly,
      disabled,
      onClick,
      ...others
    } = this.props;
    return (
      <div {...others} className={`onoff${others.className ? ' ' + others.className : ''}${onAttribute.caption && offAttribute.caption ? '' : ' notext'}${checked ? ' active' : ''}`} data-on={onAttribute.caption || ''} data-off={offAttribute.caption || ''} data-readonly={readOnly} data-disabled={disabled} onClick={(e) => onClick(e, checked)}>
        <div className="onoff-handle"></div>
      </div>
    );
  }
}
