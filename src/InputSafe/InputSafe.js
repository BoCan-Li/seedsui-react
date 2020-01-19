// require PrototypeString.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputSafe extends Component {
  // 全局配置
  static contextTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object
  }
  static propTypes = {
    value: PropTypes.string
  }
  static defaultProps = {
    value: ''
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount () {
  }
  render() {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    const {
      value,
      ...others
    } = this.props;
    var lvl = value.safeLvl();
    return <ul {...others} className={`input-safe lvl${lvl}${others.className ? ' ' + others.className : ''}`}> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale['low'] || '弱'}</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale['medium'] || '中'}</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{locale['strong'] || '强'}</span>
      </li> 
    </ul>;
  }
}
