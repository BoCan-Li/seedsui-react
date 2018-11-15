import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './../Button';
import Price from './../Price';
import Mark from './../Mark';
import Clipboard from './../Clipboard';
import Bridge from './../Bridge';

export default class Attributes extends Component {
  static propTypes = {
    showValidValue: PropTypes.bool, // 值合法时显示
    showValidName: PropTypes.bool, // name合法时显示

    col: PropTypes.oneOfType([ // 列数, 默认1
      PropTypes.string,
      PropTypes.number
    ]),
    list: PropTypes.array,
    // [
    //   {
    //     name: string,
    //     value: string,
    //     copy: bool | string,
    //     tel: bool | string,
    //     price: bool | string,
    //     priceClassName: string,
    //     priceStyle: object,
    //     button: bool | string,
    //     buttonClassName: string,
    //     buttonStyle: object,
    //     buttonClick: func,
    //     show: bool,
    //     mark: string,
    //     markClassName: string,
    //     markStyle: object,
    //     suffix: node // value后缀
    //     suffixClassName: string,
    //     suffixStyle: object,
    //   }
    // ]
    className: PropTypes.string, // align(左右对齐布局) | start(左端对齐) | between(两端对齐)
    style: PropTypes.object,

    rowClassName: PropTypes.string, // 行className
    rowStyle: PropTypes.object,

    colClassName: PropTypes.string, // 2列的情况,列className
    colStyle: PropTypes.object,

    cellClassName: PropTypes.string, // 列className
    cellStyle: PropTypes.object,

    nameClassName: PropTypes.string, // name的className
    nameStyle: PropTypes.object,
    valueClassName: PropTypes.string, // value的className
    valueStyle: PropTypes.object,

    rowAfter: PropTypes.node,
    rowAfterExclude: PropTypes.number,
    children: PropTypes.node,
    onCopy: PropTypes.func,
    onClick: PropTypes.func // 点击行
  };

  static defaultProps = {
    list: [],
    rowAfterExclude: -1
  }

  constructor(props, context) {
    super(props, context);
  }
  onCopyToClipboard = (text) => {
    const {onCopy} = this.props;
    Clipboard.copy(text, {
      onSuccess: (msg) => {
        if (onCopy) onCopy(text, msg);
      },
      onError: (msg) => {
        if (onCopy) onCopy(text, msg);
      }
    })
  }
  // 点击行
  onClick = (item, index, item2, index2) => { // eslint-disable-line
    if (this.props.onClick) this.props.onClick(arguments);
  }
  // 获得值DOM
  getValueDOM = (item, index) => {
    // 价格
    if (item.price) {
      let priceValue = item.value || '';
      if (typeof item.price === 'string') {
        priceValue = item.price;
      }
      return <Price digits={item.priceDigits} key={'price' + index} style={item.priceStyle} className={item.priceClassName ? item.priceClassName : 'capitalize'} price={priceValue} unit={item.priceUnit || ''}/>;
    // 按钮
    } else if (item.html) { // html
      let htmlValue = item.value || '';
      if (typeof item.html === 'string') {
        htmlValue = item.html;
      }
      return <div dangerouslySetInnerHTML={{__html: htmlValue}}/>;
    }
    return item.value;
  }
  getSuffixDOM = (item, index) => {
    if (!item.suffix) return null;
    return <span className={item.suffixClassName} style={item.suffixStyle} key={`suffix${index}`}>{item.suffix}</span>;
  }
  // 获得操作DOM
  getOpDOM = (item, index) => {
    // 复制
    if (item.copy) {
      let copyValue = item.value || '';
      if (typeof item.copy === 'string') {
        copyValue = item.copy;
      }
      return <Button key={index} className="rbtn sm" style={{borderRadius: '3px'}} args={copyValue} onClick={this.onCopyToClipboard}>复制</Button>
    }
    // 电话
    if (item.tel) {
      let telValue = item.value || '';
      if (typeof item.tel === 'string') {
        telValue = item.tel;
      }
      return <a key={index} className="ricon"  onClick={() => {Bridge.tel(telValue)}}>
        <i className="icon bg-tel"/>
      </a>;
    }
    // 标签
    if (item.mark) {
      return <Mark className={item.markClassName} style={item.markStyle}>{item.mark}</Mark>
    }
    // 按钮
    if (item.button) {
      let buttonValue = item.value || '';
      if (typeof item.button === 'string') {
        buttonValue = item.button;
      }
      return <Button key={'button' + index} style={item.buttonStyle} className={item.buttonClassName} onClick={(e) => {e.stopPropagation();if (item.buttonClick) item.buttonClick(item, index);}}>{buttonValue}</Button>;
    }
  }
  // 获得2列的value的DOM
  getCol2ValueDOM = (item, index) => {
    let dom = [];
    dom.push(this.getValueDOM(item, index));
    if (item.suffix) dom.push(this.getSuffixDOM(item, index));
    const opDOM = this.getOpDOM(item, index);
    if (opDOM) dom.push(opDOM);
    return dom;
  }
  // 获得一行的className
  getRowClassName = () => {
    const {rowClassName} = this.props;
    return `attribute${rowClassName ? ' ' + rowClassName : ' attribute-margin'}`;
  }
  render() {
    const {
      showValidValue, showValidName,
      col, list,
      className, style,
      rowStyle,
      colClassName, colStyle,
      cellClassName, cellStyle,
      nameClassName, nameStyle, valueClassName, valueStyle,
      rowAfter, rowAfterExclude, children
    } = this.props;
    const attrsDOM = [];
    for (let i = 0; i < list.length;) {
      if (col == 2) { // eslint-disable-line
        attrsDOM.push(
          <div key={`row${i}`} className={this.getRowClassName()} style={rowStyle} onClick={() => {this.onClick(list[i], i, list[i + 1], i + 1);}}>
            <div className={`attribute-half${colClassName ? ' ' + colClassName : ''}`} style={colStyle}>
              {/* 左 */}
              <div className={`attribute-left${cellClassName ? ' ' + cellClassName : ''}${nameClassName ? ' ' + nameClassName : ''}`} style={Object.assign({}, cellStyle, nameStyle)}>{list[i].name}</div>
              {/* 右 */}
              <div className={`attribute-right${cellClassName ? ' ' + cellClassName : ''}${valueClassName ? ' ' + valueClassName : ''}`} style={Object.assign({}, cellStyle, valueStyle)}>
                {this.getCol2ValueDOM(list[i], i)}
              </div>
            </div>
            {list[i + 1] && <div className={`attribute-half${colClassName ? ' ' + colClassName : ''}`} style={colStyle}>
              {/* 左 */}
              <div className={`attribute-left${cellClassName ? ' ' + cellClassName : ''} ${nameClassName ? nameClassName : ''}`} style={Object.assign({}, cellStyle, nameStyle)}>{list[i + 1].name ? list[i + 1].name : ''}</div>
              {/* 右 */}
              <div className={`attribute-right${cellClassName ? ' ' + cellClassName : ''}  ${valueClassName ? valueClassName : ''}`} style={Object.assign({}, cellStyle, valueStyle)}>
                {this.getCol2ValueDOM(list[i + 1], i + 1)}
              </div>
            </div>}
          </div>,
          (rowAfter && rowAfterExclude !== i) ? <div key={`rowafter${i}`}>{rowAfter}</div> : null
        );
        i += 2;
      } else {
        let isShow = true;
        if (showValidValue && !list[i].value) isShow = false;
        if (showValidName && !list[i].name) isShow = false;
        if (list[i].hasOwnProperty('show')) isShow = list[i].show;
        if (isShow) {
          attrsDOM.push(
            <div key={`row${i}`} className={this.getRowClassName()} style={rowStyle} onClick={() => {this.onClick(list[i], i);}}>
              {/* 左 */}
              <div className={`attribute-left${cellClassName ? ' ' + cellClassName : ''}${nameClassName ? ' ' + nameClassName : ''}`} style={Object.assign({}, cellStyle, nameStyle)}>{list[i].name}</div>
              {/* 右 */}
              <div className={`attribute-right${cellClassName ? ' ' + cellClassName : ''}${valueClassName ? ' ' + valueClassName : ''}`} style={Object.assign({}, cellStyle, valueStyle)}>
                {this.getValueDOM(list[i], i)}
                {list[i].suffix && this.getSuffixDOM(list[i], i)}
              </div>
              {/* 操作 */}
              {this.getOpDOM(list[i], i)}
            </div>,
            (rowAfter && rowAfterExclude !== i) ? <div key={`rowafter${i}`}>{rowAfter}</div> : null
          );
        }
        i++;
      }
    }
    return (
      <div ref={el => {this.$el = el;}} className={`attributes${className ? ' ' + className : ''}`} style={style}>
        {attrsDOM}
        {children}
      </div>
    );
  }
}
