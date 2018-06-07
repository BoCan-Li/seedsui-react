import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './calendar.js';

export default class Calendar extends Component {
  static propTypes = {
    type: PropTypes.string, // week|month
    showTitleWeek: PropTypes.bool, // 是否显示周几
    showTitleWeeks: PropTypes.bool, // 是否显示周数
    disableBeforeDate: PropTypes.object,
    disableAfterDate: PropTypes.object,
    isYTouch: PropTypes.bool, // 是否允许竖向滑动
    activeDate: PropTypes.object,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    type: 'month',
    showTitleWeek: true,
    showTitleWeeks: false,
    isYTouch: true,
    activeDate: new Date()
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  componentDidMount () {
    if (this.state.instance) return
    const {type, showTitleWeek, showTitleWeeks, disableBeforeDate, disableAfterDate, isYTouch, activeDate, onChange} = this.props;
    var instance = new Instance(this.$el, {
      viewType: type,
      showTitleWeek: showTitleWeek,
      showTitleWeeks: showTitleWeeks,
      disableBeforeDate: disableBeforeDate,
      disableAfterDate: disableAfterDate,
      isYTouch: isYTouch,
      activeDate: activeDate,
      prevHTML: '<i class="icon-arrowleft"></i>',
      nextHTML: '<i class="icon-arrowright"></i>',
      onChange: (e) => {
        if (onChange) onChange(e.activeDate)
      }
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
