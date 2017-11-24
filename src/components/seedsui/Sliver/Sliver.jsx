import React, { Component, PropTypes } from 'react';

export default class Sliver extends Component {
  static propTypes = {
    title: PropTypes.node,
    licon: PropTypes.node,
    ricon: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    tag: PropTypes.string,
    onClick: PropTypes.func
  }
  static defaultProps = {
    tag: 'div'
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { title, className, style, licon, ricon, onClick } = this.props;
    /* const { tag, title, className, style } = this.props;
    let sliverDOM = null;
    if (tag === 'div') {
      sliverDOM = (<div className={'sliver' + (className ? ' ' + className : '')} style={style}>{title}</div>);
    } else if (tag === 'li') {
      sliverDOM = (<li className={'sliver' + (className ? ' ' + className : '')} style={style}>{title}</li>);
    }
    console.log(sliverDOM); */
    return (
      <div className={'sliver' + (className ? ' ' + className : '')} style={style} onClick={onClick}>
        {licon}
        <div className="sliver-title">{title}</div>
        {ricon}
      </div>
    );
  }
}
