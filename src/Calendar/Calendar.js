import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Calendar extends Component {
  static propTypes = {
    type: PropTypes.string, // week|month
    titleFormat: PropTypes.string, // 标题日期格式化 YYYY年MM月DD日 周E 第W周
    disableBeforeDate: PropTypes.object, // 禁用之前日期
    disableAfterDate: PropTypes.object, // 禁用之后日期
    verticalDrag: PropTypes.bool, // 是否允许垂直拖动
    defaultDate: PropTypes.object, // 默认日期
    prevHTML: PropTypes.string, // 左箭头
    nextHTML: PropTypes.string, // 右箭头
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onError: PropTypes.func
  }
  static defaultProps = {
    type: 'month',
    verticalDrag: true,
    prevHTML: '&lt',
    nextHTML: '&gt',
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    if (this.instance) return
    const {type, titleFormat, disableBeforeDate, disableAfterDate, verticalDrag, defaultDate, prevHTML, nextHTML, onChange, onClick, onError} = this.props;
    var instance = new Instance(this.$el, {
      viewType: type,
      titleFormat: titleFormat,

      disableBeforeDate: disableBeforeDate,
      disableAfterDate: disableAfterDate,
      verticalDrag: verticalDrag,
      defaultDate: defaultDate,
      prevHTML: prevHTML,
      nextHTML: nextHTML,
      onChange: onChange,
      onClick: onClick,
      onError: onError // func(e, err)
    });
    this.instance = instance;
  }
  render() {
    return (
      <div ref={el => {this.$el = el;}} className="calendar"></div>
    );
  }
}
