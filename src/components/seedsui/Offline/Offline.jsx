import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notice from './../Notice';
import Device from './../utils/device';
export default class NoNetwork extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.setState({
      onLine: true
    });
  }
  componentDidMount = () => {
    Device.onLine((bool) => {
      if (bool) {
        this.setState({
          onLine: true
        });
      } else {
        this.setState({
          onLine: false
        });
      }
    })
  }
  render() {
    const { iconSrc, caption, className, style, onClick, args } = this.props;
    return (
      this.state.onLine && <Notice caption="无网络，请先连网" className={className} style={style} onClick={click} args={args} iconClassName="notice-icon-nonetwork"/>
    );
  }
}
