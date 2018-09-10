// require string.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <span className="input-safe-caption">弱</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">中</span>
      </li> 
      <li> 
        <div className="input-safe-progress"></div>
        <span className="input-safe-caption">强</span>
      </li> 
    </ul>;
  }
}
