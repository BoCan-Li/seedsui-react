import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SearchBarPointer extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,

    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object,
    placeholder: PropTypes.string,

    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      className, style,
      inputClassName, inputStyle, placeholder, onClick,
    } = this.props;
    return (
      <div className={`searchbar${className ? ' ' + className : ''}`} style={style}>
        <div className={`searchbar-form${inputClassName ? ' ' + inputClassName : ''}`} style={inputStyle} onClick={() => {onClick()}}>
          <i className="icon searchbar-icon-search"></i>
          <input type="search" className="searchbar-input" readOnly placeholder={placeholder}/>
        </div>
      </div>
    );
  }
}
