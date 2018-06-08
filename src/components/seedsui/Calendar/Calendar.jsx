import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './calendar.js';

export default class Calendar extends Component {
  static propTypes = {
    type: PropTypes.string, // week|month
    showTitleDay: PropTypes.bool, // 是否显示周几
    showTitleWeek: PropTypes.bool, // 是否显示周数
    disableBeforeDate: PropTypes.object, // 禁用之前日期
    disableAfterDate: PropTypes.object, // 禁用之后日期
    verticalDrag: PropTypes.bool, // 是否允许垂直拖动
    defaultDate: PropTypes.object, // 默认日期
    prevHTML: PropTypes.string, // 左箭头
    nextHTML: PropTypes.string, // 右箭头
    onChange: PropTypes.func,
    onError: PropTypes.func
  }
  static defaultProps = {
    type: 'month',
    showTitleDay: true,
    showTitleWeek: false,
    verticalDrag: true,
    defaultDate: new Date(),
    prevHTML: '&lt',
    nextHTML: '&gt',
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  componentDidMount () {
    if (this.state.instance) return
    const {type, showTitleDay, showTitleWeek, disableBeforeDate, disableAfterDate, verticalDrag, defaultDate, prevHTML, nextHTML, onChange, onError} = this.props;
    var instance = new Instance(this.$el, {
      viewType: type,
      showTitleDay: showTitleDay,
      showTitleWeek: showTitleWeek,
      disableBeforeDate: disableBeforeDate,
      disableAfterDate: disableAfterDate,
      verticalDrag: verticalDrag,
      defaultDate: defaultDate,
      prevHTML: prevHTML,
      nextHTML: nextHTML,
      onChange: onChange,
      onError: onError
    });
    this.setState({
      instance
    });
  }
  render() {
    return (
      <div className="calendar" ref={(el) => {this.$el = el;}}></div>
    );
  }
}
