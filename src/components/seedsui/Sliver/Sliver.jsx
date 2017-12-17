import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';

export default class Sliver extends Component {
  static propTypes = {
    caption: PropTypes.node,
    sndcaption: PropTypes.node,
    licon: PropTypes.node,
    ricon: PropTypes.node,
    liconSrc: PropTypes.string,
    liconStyle: PropTypes.object,
    liconClassName: PropTypes.string,
    riconSrc: PropTypes.string,
    riconClassName: PropTypes.string,
    riconStyle: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { caption, sndcaption, className, style, licon, ricon, liconSrc, liconStyle, liconClassName, riconSrc, riconClassName, riconStyle, onClick } = this.props;
    return (
      <div className={'sliver' + (className ? ' ' + className : '')} style={style} onClick={onClick}>
        {liconSrc && <Icon className={liconClassName} src={liconSrc} style={Object.assign({marginRight: '4px', display: 'block'}, liconStyle)}/>}
        {licon}
        <div className="sliver-caption">{caption}</div>
        <div className="sliver-sndcaption">{sndcaption}</div>
        {ricon}
        {riconSrc && <Icon className={'size16' + (riconClassName ? ' ' + riconClassName : '')} src={riconSrc} style={Object.assign({marginLeft: '4px', display: 'block'}, riconStyle)}/>}
      </div>
    );
  }
}
