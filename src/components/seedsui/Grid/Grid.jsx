import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from './../Icon/Icon.jsx';
import Close from './../Close/Close.jsx';

export default class Page extends Component {
  static propTypes = {
    // args: PropTypes.array,
    lazyLoad: PropTypes.bool, // 图标是否懒人加载
    style: PropTypes.object,
    className: PropTypes.string, // grid-album | grid-bordered
    space: PropTypes.number, // 上下间距
    wing: PropTypes.number, // 左右间距
    col: PropTypes.string, // 一行列数
    showUpload: PropTypes.bool,
    list: PropTypes.array, // 单元格，见下方示例
    children: PropTypes.node, // 也可以直接放子元素，grid将自动排列

    cellClassName: PropTypes.string, // 单元格Class
    cellStyle: PropTypes.object, // 单元格Style

    caption: PropTypes.node,
    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,

    sndcaption: PropTypes.node,
    sndcaptionClassName: PropTypes.string,
    sndcaptionStyle: PropTypes.object,

    contentClassName: PropTypes.string, // 单元格内容Class
    contentStyle: PropTypes.object, // 单元格内容Style

    iconClassName: PropTypes.string,
    iconStyle: PropTypes.object,

    badgeClassName: PropTypes.string,

    onClick: PropTypes.func,
    onClickCell: PropTypes.func,
    onClickIcon: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickAdd: PropTypes.func
  }
  /* list: [{
    iconClassName: '',
    iconStyle: {},
    iconSrc: '',
    thumb: '',
    caption: '',
    onClick: function() {},
    iconBadgeCaption: '',
    showClose: false
  }] */
  static defaultProps = {
    list: [],
    args: null,
    iconStyle: {},
    space: 0,
    wing: 0,
    col: '3'
  }
  constructor(props) {
    super(props);
  }
  getSpaceStyle = () => {
    const {className, space, wing} = this.props;
    if (!space && !wing) return {
      ulStyle: {},
      cellStyle: {}
    };
    // 有边框的单元格
    if (className && className.hasClass('grid-bordered')) {
      return {
        ulStyle: {
          padding: '0'
        },
        cellStyle: {
          padding: `${space}px ${wing}px`
        }
      };
    }
    // 无边框的单元格
    if (className.hasClass('between')) { // between对齐模式
      return {
        ulStyle: {
          padding: `${space / 2}px 0px`
        },
        cellStyle: {
          padding: `${space / 2}px ${wing}px ${space / 2}px 0`
        }
      };
    }
    return { // around对齐模式
      ulStyle: {
        padding: `${space / 2}px ${wing / 2}px`
      },
      cellStyle: {
        padding: `${space / 2}px ${wing / 2}px`
      }
    };
  }
  getLiStyle = () => {
    return this.getSpaceStyle().cellStyle;
  }
  getUlStyle = () => {
    return this.getSpaceStyle().ulStyle;
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event')) {
        args[args.indexOf('$event')] = e;
      }
    } else {
      args = e;
    }
    return args;
  }
  onClickIcon = (e, item, index) => {
    if (this.props.onClickIcon) {
      this.props.onClickIcon(item, index, this.getArgs(e));
      e.stopPropagation();
    }
  }
  onClickCell = (e, item, index) => {
    if (this.props.onClickCell) {
      this.props.onClickCell(item, index, this.getArgs(e));
      e.stopPropagation();
    }
  }
  onClickDelete = (e, item, index) => {
    if (this.props.onClickDelete) {
      this.props.onClickDelete(item, index, this.getArgs(e));
      e.stopPropagation();
    }
  }
  onClickAdd = (e) => {
    if (this.props.onClickAdd) {
      this.props.onClickAdd(this.getArgs(e));
      e.stopPropagation();
    }
  }
  render() {
    const {
      className, style, col, list,
      cellClassName, cellStyle,
      contentClassName, contentStyle, onClickCell,
      iconClassName, iconStyle, lazyLoad, onClickIcon,
      iconBadgeClassName,
      closeClassName, onClickDelete,
      captionClassName, captionStyle,
      sndcaptionClassName, sndcaptionStyle,
      showUpload
    } = this.props;
    const children = React.Children.toArray(this.props.children);
    let dom = null;
    dom = (<ul className={`grid${className ? ' ' + className : ''}`} data-col={col} style={Object.assign(this.getUlStyle(), style)}>
      {list.length > 0 && list.map((item, index) =>{
        if (!item) return null;
        return (<li onClick={(e) => {this.onClickCell(e, item, index);}} key={index} className={`grid-cell${cellClassName ? ' ' + cellClassName : ''}`} style={Object.assign({}, this.getLiStyle(), cellStyle)}>
          <a className={`grid-content${contentClassName ? ' ' + contentClassName : ''}${item.className ? ' ' + item.className : ''}`} style={Object.assign(contentStyle ? contentStyle : {}, item.style ? item.style : {})}>
            {(item.iconSrc || item.iconClassName) && <Icon badgeClassName={iconBadgeClassName} badgeCaption={item.iconBadgeCaption} onClick={(e) => {this.onClickIcon(e, item, index);}} lazyLoad={lazyLoad} className={`grid-icon${(onClickCell && !onClickIcon) ? ' events-none' : ''}${iconClassName ? ' ' + iconClassName : ''}${item.iconClassName ? ' ' + item.iconClassName : ''}`} style={Object.assign(iconStyle, item.iconStyle ? item.iconStyle : {})} src={item.iconSrc ? item.iconSrc : ''}/>}
            {item.thumb && <img alt="" src={item.thumb} onClick={(e) => {this.onClickIcon(e, item, index);}}/>}
            {onClickDelete && <Close onClick={(e) => {this.onClickDelete(e, item, index);}} className={`grid-close${closeClassName ? ' ' + closeClassName : ''}`} iconClassName="close-icon-clear color-primary"/>}
          </a>
          {item.caption && <label className={`grid-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{item.caption}</label>}
          {item.sndcaption && <label className={`grid-sndcaption${sndcaptionClassName ? ' ' + sndcaptionClassName : ''}`} style={sndcaptionStyle}>{item.sndcaption}</label>}
        </li>);
      })}
      {showUpload === true && <li className={`grid-cell`} style={this.getLiStyle()}>
        <a onClick={(e) => {this.onClickAdd(e);}} className={`grid-content grid-content-add${contentClassName ? ' ' + contentClassName : ''}`} style={contentStyle}>
          <Icon className="grid-icon-add"/>
        </a>
      </li>}
      {/* 如果有子节点，则为自定义节点 */}
      {children.length > 0 && children.map((item, index) => {
        if (!item) return null;
        return (<li key={index} className={`grid-cell${cellClassName ? ' ' + cellClassName : ''}`} style={Object.assign({}, this.getLiStyle(), cellStyle)}>
          {item}
        </li>);
      })}
    </ul>);
    return dom;
  }
}
