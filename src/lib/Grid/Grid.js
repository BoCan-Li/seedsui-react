import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon';
import Bridge from './../Bridge';

export default class Grid extends Component {
  static propTypes = {
    args: PropTypes.any,
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

    iconBoxClassName: PropTypes.string, // 图标容器Class
    iconBoxStyle: PropTypes.object, // 图标容器Style

    iconClassName: PropTypes.string,
    iconStyle: PropTypes.object,
    iconDefaultImgClassName: PropTypes.string,
    iconDefaultImgStyle: PropTypes.object,

    iconBadgeClassName: PropTypes.string,

    onClickCell: PropTypes.func,
    onClickIconBox: PropTypes.func,
    onClickIcon: PropTypes.func,

    closeClassName: PropTypes.string,
    onClickDelete: PropTypes.func,

    onClickAdd: PropTypes.func
  }
  /* list: [{
    iconClassName: '',
    iconStyle: {},
    iconSrc: '',
    preview: true | false, // 是否支持预览,默认true
    thumb: '', // 缩略图
    src: '', // 预览地址
    caption: '',
    onClick: function() {},
    iconBadgeCaption: ''
  }] */
  static defaultProps = {
    iconBadgeClassName: 'top right',
    list: [],
    args: null,
    iconStyle: {},
    space: 0,
    wing: 0,
    col: '3'
  }
  constructor(props) {
    super(props);
    this.state = {}
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
    if (className && className.hasClass('between')) { // between对齐模式
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
    if (args !== undefined) {
      if (typeof args === 'string' && args === '$event') {
        args = e;
      } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
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
  onClickIconBox = (e, item, index) => {
    if (this.props.onClickIconBox) {
      this.props.onClickIconBox(item, index, this.getArgs(e));
      e.stopPropagation();
    }
  }
  onClickCell = (e, item, index) => {
    // 如果有src,说明需要预览
    if (item.src && item.preview !== false && this.props.list) {
      var imgs = this.props.list.map(n => {
        return n.src;
      });
      if (!imgs) return;
      Bridge.previewImage({
        urls: imgs,
        current: imgs[index] || imgs[0],
        index: index || 0
      })
      e.stopPropagation();
    }
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
      iconBoxClassName, iconBoxStyle,
      iconClassName, iconStyle, iconDefaultImgClassName, iconDefaultImgStyle, lazyLoad,
      iconBadgeClassName,
      closeClassName, onClickDelete,
      captionClassName, captionStyle,
      sndcaptionClassName, sndcaptionStyle,
      showUpload
    } = this.props;
    const children = React.Children.toArray(this.props.children);
    let dom = null;
    dom = (<ul ref={el => {this.$el = el;}} className={`grid${className ? ' ' + className : ''}`} data-col={col} style={Object.assign(this.getUlStyle(), style)}>
      {list.length > 0 && list.map((item, index) =>{
        if (!item) return null;
        return (<li onClick={(e) => {this.onClickCell(e, item, index);}} key={index} className={`grid-cell${cellClassName ? ' ' + cellClassName : ''}`} style={Object.assign({}, this.getLiStyle(), cellStyle)}>
          <a onClick={(e) => {this.onClickIconBox(e, item, index);}} className={`grid-iconbox${iconBoxClassName ? ' ' + iconBoxClassName : ''}${item.className ? ' ' + item.className : ''}`} style={Object.assign(iconBoxStyle ? iconBoxStyle : {}, item.style ? item.style : {})}>
            {(item.iconSrc || item.iconClassName || item.thumb) &&
            <Icon
              base={item.thumb ? 'img' : 'icon'}
              src={item.iconSrc ? item.iconSrc : item.thumb ? item.thumb : ''}
              lazyLoad={lazyLoad}
              onClick={(e) => {this.onClickIcon(e, item, index);}}
              className={`${iconClassName || ''}${item.iconClassName ? ' ' + item.iconClassName : ''}`}
              style={Object.assign(iconStyle, item.iconStyle ? item.iconStyle : {})}
              defaultImgClassName={iconDefaultImgClassName}
              defaultImgStyle={iconDefaultImgStyle}
              badgeClassName={iconBadgeClassName}
              badgeCaption={item.iconBadgeCaption}
              closeClassName={`grid-close close-icon-clear color-cancel${closeClassName ? ' ' + closeClassName : ''}`}
              onClickClose={onClickDelete ? (e) => {this.onClickDelete(e, item, index);} : null}
            />}
          </a>
          {item.caption && <label className={`grid-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}>{item.caption}</label>}
          {item.sndcaption && <label className={`grid-sndcaption${sndcaptionClassName ? ' ' + sndcaptionClassName : ''}`} style={sndcaptionStyle}>{item.sndcaption}</label>}
        </li>);
      })}
      {showUpload === true && <li className={`grid-cell`} style={this.getLiStyle()}>
        <a onClick={(e) => {this.onClickAdd(e);}} className={`grid-iconbox grid-iconbox-add${iconBoxClassName ? ' ' + iconBoxClassName : ''}`} style={iconBoxStyle}>
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
