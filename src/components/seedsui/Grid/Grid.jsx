import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    space: PropTypes.number,
    wing: PropTypes.number,
    type: PropTypes.string,
    bordered: PropTypes.bool,
    showAdd: PropTypes.bool,
    col: PropTypes.string,
    colors: PropTypes.array,
    list: PropTypes.array,
    children: PropTypes.node
  }
  static defaultProps = {
    space: 0,
    wing: 0,
    type: 'square', // square | pure | album | layout
    bordered: false,
    showAdd: true,
    col: '3',
    colors: ['#4485fb', '#eda200', '#38ba35', '#41ce29', '#e55f5f', '#eecf3d'],
    list: [{
      icon: '',
      text: '',
      onClick: function() {},
      tip: '',
      badge: '',
      close: false,
      onClickClose: function() {}
    }],
  }
  constructor(props) {
    super(props);
  }
  getSpaceStyle = () => {
    if (this.props.bordered) {
      return {
        ulStyle: {
          padding: '0'
        },
        liStyle: {
          padding: `${this.props.space}px ${this.props.wing}px`
        }
      };
    }
    return {
      ulStyle: {
        padding: `${this.props.space / 2}px ${this.props.wing / 2}px`
      },
      liStyle: {
        padding: `${this.props.space / 2}px ${this.props.wing / 2}px`
      }
    };
  }
  getIconStyle = (index) => {
    if (this.props.type === 'square') {
      return {
        backgroundColor: ' + (this.colors[index] ? this.colors[index] : this.colors[0]) + ',
        color: 'white'
      };
    } else if (this.props.type === 'pure') {
      return {
        color: (this.props.colors[index] ? this.props.colors[index] : this.props.colors[0])
      };
    }
  }
  render() {
    const { className, style, bordered, col, type, showAdd, list, children } = this.props;
    let dom = null;
    if (type === 'layout') {
      dom = (<ul className={'grid' + (bordered ? ' grid-bordered' : '') + (className ? ' ' + className : '')} data-col={col} style={Object.assign(this.getSpaceStyle().ulStyle, style)}>
      {children.map((item, index) =>{
        return (<li key={index} style={this.getSpaceStyle().liStyle}>
          {item}
        </li>);
      })}
      </ul>);
    } else {
      dom = (<ul className={'grid ' + className + (bordered ? ' grid-bordered' : '')} data-col={col} style={Object.assign(this.getSpaceStyle().ulStyle, style)}>
        {list.map((item, index) =>{
          return (<li key={index} onClick={item.onClick} style={this.getSpaceStyle().liStyle}>
            <a className="grid-icon" style={this.getIconStyle(index)}>
              {type === 'album' && item.img && <img src={item.img} />}
              {(type === 'square' || type === 'pure') && item.icon && <Icon classsName="item.icon"/>}
              {item.tip && <span className="tip">{item.tip}</span>}
              {item.badge && <span className="badge">{item.badge}</span>}
              {item.close && (<span className="close" onClick={item.onClickClose}>
                <i className="icon icon-close"></i>
              </span>)}
            </a>
            {item.text && <label className="grid-label">{item.text}</label>}
          </li>);
        })}
        {type === 'album' && showAdd === true && <li style={this.getSpaceStyle().liStyle}>
          <a className="grid-icon grid-icon-add">
            <Icon classsName="icon-plus size50"/>
          </a>
        </li>}
      </ul>);
    }
    return dom;
  }
}
