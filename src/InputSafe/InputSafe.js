// require PrototypeString.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class InputSafe extends Component {
  static propTypes = {
    value: PropTypes.string
  }
  static defaultProps = {
    value: ''
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }
  render() {
    const {
      value,
      ...others
    } = this.props;
    var lvl = value.safeLvl();
    return <ul {...others} className={`input-safe lvl${lvl}${others.className ? ' ' + others.className : ''}`}> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{window._seeds_lang['low'] || '弱'}</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{window._seeds_lang['medium'] || '中'}</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{window._seeds_lang['strong'] || '强'}</span>
      </li> 
    </ul>;
  }
}
