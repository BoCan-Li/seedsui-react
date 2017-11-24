import React, { Component, PropTypes } from 'react';

export default class Mark extends Component {
  static propTypes = {
    type: PropTypes.string, // info/success/cancel/warn/disable/primary
    style: PropTypes.object,
    text: PropTypes.string,
    onClick: PropTypes.func
  }
  static defaultProps = {
    type: 'info',
    show: true
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { type, style, text, onClick } = this.props;
    return (
      <span className={'mark-' + type} style={style} onClick={onClick}>{text}</span>
    );
  }
}
