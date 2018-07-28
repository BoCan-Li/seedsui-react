import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Attributes extends Component {
  static propTypes = {
    name: PropTypes.node, // 标题
    value: PropTypes.node, // 内容
    required: PropTypes.string, // 必填项

    showValidValue: PropTypes.bool, // 值合法时显示
    showValidName: PropTypes.bool, // name合法时显示

    className: PropTypes.string, // align(左右对齐布局) | start(左端对齐) | between(两端对齐)
    style: PropTypes.object,

    cellClassName: PropTypes.string, // 列className
    cellStyle: PropTypes.object,

    nameClassName: PropTypes.string, // name的className
    nameStyle: PropTypes.object,
    requiredClassName: PropTypes.string, // required的className
    requiredStyle: PropTypes.object,
    valueClassName: PropTypes.string, // value的className
    valueStyle: PropTypes.object,

    rowAfter: PropTypes.node,
    children: PropTypes.node,
    onClick: PropTypes.func
  };

  static defaultProps = {
    args: null,
    className: 'attribute-margin'
  }

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }
  getArgs = (e) => {
    var args = this.props.args;
    if (args) {
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
  onClick = (e) => {
    if (this.props.onClick) this.props.onClick(this.getArgs(e));
  }
  render() {
    const {
      name, required,
      value,
      showValidValue, showValidName,
      className, style,
      cellClassName, cellStyle,
      requiredClassName, requiredStyle, nameClassName, nameStyle, valueClassName, valueStyle,
      rowAfter, children
    } = this.props;
    let isShow = true;
    if (showValidValue && !children) isShow = false;
    if (showValidName && !name) isShow = false;
    return (
      isShow && <div ref={el => {this.$el = el;}} className={`attribute${className ? ' ' + className : ''}`} style={style} onClick={this.onClick}>
        {/* 左 */}
        {name && <div className={`attribute-left${cellClassName ? ' ' + cellClassName : ''} ${nameClassName ? nameClassName : ''}`} style={Object.assign({}, cellStyle, nameStyle)}>
          {required && <span className={`required required-left${requiredClassName ? ' ' + requiredClassName : ''}`} style={requiredStyle}>{required}</span>}
          {name}
        </div>}
        {/* 右 */}
        {name && <div className={`attribute-right${cellClassName ? ' ' + cellClassName : ''}  ${valueClassName ? valueClassName : ''}`} style={Object.assign({}, cellStyle, valueStyle)}>
          {value}
          {children}
        </div>}
        {/* 如果没有设置name */}
        {!name && children}
        {rowAfter && rowAfter}
      </div>
    );
  }
}
