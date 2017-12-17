import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'components/seedsui/Button/Button.jsx';
import Price from 'components/seedsui/Price/Price.jsx';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class Attributes extends Component {
  static propTypes = {
    showValidValue: PropTypes.bool,
    showValidName: PropTypes.bool,
    col: PropTypes.string,
    layout: PropTypes.string,
    list: PropTypes.array,
    className: PropTypes.string,
    rowClassName: PropTypes.string,
    nameClassName: PropTypes.string,
    valueClassName: PropTypes.string,
    style: PropTypes.object,
    rowStyle: PropTypes.object,
    colStyle: PropTypes.object,
    nameStyle: PropTypes.object,
    valueStyle: PropTypes.object,
    children: PropTypes.node,
    copy: PropTypes.bool,
    tel: PropTypes.bool,
    onCopy: PropTypes.func,
    onClick: PropTypes.func
  };

  static defaultProps = {
    col: '2',
    list: [],
    style: {},
    rowStyle: {},
    colStyle: {},
    nameStyle: {},
    valueStyle: {},
  }

  constructor(props, context) {
    super(props, context);
  }
  onCopyToClipboard = (text, result) => {
    if (this.props.onCopy) this.props.onCopy(text, result);
  }
  getCol4Value = (item) => {
    let dom = null;
    if (item.name) {
      if (item.price) {
        dom = <Price className={typeof item.price === 'string' ? item.price : 'normal'} price={item.value}/>;
      }
      dom = item.value;
    }
    /* 操作 */
    if (dom && item.copy) {
      dom.push(<CopyToClipboard text={item.value}
        onCopy={this.onCopyToClipboard}>
        <Button text="复制" className="button-small"/>
      </CopyToClipboard>);
    }
    if (dom && item.tel) {
      dom.push(<a href={`tel:${item.value}`}>
        <i className="icon icon-tel"/>
      </a>);
    }
  }
  getCol2NameClassName = () => {
    const {layout, nameClassName} = this.props;
    let baseClass = 'col-3';
    if (layout === 'flex') baseClass = '';
    if (layout === 'between') baseClass = 'col-flex';
    return baseClass + (nameClassName ? ' ' + nameClassName : '');
  }
  getCol2ValueClassName = () => {
    const {layout, valueClassName} = this.props;
    let baseClass = 'col-flex';
    if (layout === 'between') baseClass = '';
    return baseClass + (valueClassName ? ' ' + valueClassName : '');
  }
  render() {
    const {showValidValue, showValidName, col, list, onClick, className, style, rowClassName, nameClassName, valueClassName, rowStyle, colStyle, nameStyle, valueStyle, children} = this.props;
    const attrsDOM = [];
    for (let i = 0; i < list.length;) {
      if (col === '4') {
        attrsDOM.push(
          <div key={i} style={rowStyle}>
            <div className={'row-flex attribute' + (rowClassName ? ' ' + rowClassName : '')} onClick={onClick} key={i}>
              {/* 左 */}
              <div className={'col-3' + (nameClassName ? ' ' + nameClassName : '')} style={Object.assign({}, colStyle, nameStyle)}>{list[i].name}</div>
              {/* 右 */}
              <div className={'col-3' + (valueClassName ? ' ' + valueClassName : '')} style={Object.assign({}, colStyle, valueStyle)}>
                {this.getCol4Value(list[i])}
                {list[i].ricon && <span>{list[i].ricon}</span>}
              </div>
              {/* 左 */}
              <div className={'col-3' + (nameClassName ? ' ' + nameClassName : '')} style={Object.assign({}, colStyle, nameStyle)}>{list[i + 1].name ? list[i + 1].name : ''}</div>
              {/* 右 */}
              <div className={'col-3' + (valueClassName ? ' ' + valueClassName : '')} style={Object.assign({}, colStyle, valueStyle)}>
                {this.getCol4Value(list[i + 1])}
                {list[i + 1].ricon && <span>{list[i + 1].ricon}</span>}
              </div>
            </div>
            {children && children}
          </div>
        );
        i += 2;
      } else {
        let isShow = true;
        if (showValidValue && !list[i].value) isShow = false;
        if (showValidName && !list[i].name) isShow = false;
        if (isShow) {
          attrsDOM.push(
            <div key={i} style={rowStyle}>
              <div className={'row-flex attribute box-middle' + (rowClassName ? ' ' + rowClassName : '')}>
                {/* 左 */}
                <div className={this.getCol2NameClassName()} style={Object.assign({}, colStyle, nameStyle)}>{list[i].name}</div>
                {/* 右 */}
                <div className={this.getCol2ValueClassName()} style={Object.assign({paddingLeft: '8px'}, colStyle, valueStyle)}>
                  {list[i].price ? <Price className={typeof list[i].price === 'string' ? list[i].price : 'normal'} price={list[i].value}/> : list[i].value}
                  {list[i].ricon && <span>{list[i].ricon}</span>}
                </div>
                {/* 操作 */}
                {list[i].copy &&
                <CopyToClipboard text={list[i].value} onCopy={this.onCopyToClipboard}>
                  <Button text="复制" className="button-small"/>
                </CopyToClipboard>}
                {list[i].tel &&
                <a href={`tel:${list[i].value}`}>
                  <i className="icon icon-tel"/>
                </a>}
              </div>
              {children && children}
            </div>
          );
        }
        i++;
      }
    }
    return (
      <div style={style} className={className} onClick={onClick}>
        {attrsDOM}
      </div>
    );
  }
}
