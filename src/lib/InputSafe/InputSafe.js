// require PrototypeString.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const _ = window._seedsLang || {} // 国际化数据

export default class InputSafe extends Component {
  static propTypes = {
    value: PropTypes.string,

    style: PropTypes.object,
    className: PropTypes.string
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
    const {value, style, className} = this.props;
    var lvl = value.safeLvl();
    return <ul className={`input-safe lvl${lvl}${className ? ' ' + className : ''}`} style={style}> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{_['low'] || '弱'}</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{_['medium'] || '中'}</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">{_['strong'] || '强'}</span>
      </li> 
    </ul>;
  }
}
