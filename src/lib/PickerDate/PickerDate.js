import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './instance.js';

export default class PickerDate extends Component {
  static propTypes = {
    portal: PropTypes.object,
    type: PropTypes.string, // 'date','month','time','datetime'
    className: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object, // {year: [], month: [], day: [], hour: [], minute: []}
    value: PropTypes.string, // 例: 2018-02-26
    show: PropTypes.bool,
    onClickMask: PropTypes.func,
    onClickCancel: PropTypes.func,
    onClickSubmit: PropTypes.func,
    onError: PropTypes.func
  }
  static defaultProps = {
    type: 'date'
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidMount = () => {
    this.initInstance()
  }
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.show === this.props.show) return false;
    return true;
  }
  componentDidUpdate = (prevProps) => {
    if (this.state.instance) {
      if (this.props.show) {
        this.setDefault();
        this.state.instance.show();
      }
      else this.state.instance.hide()
    }
  }
  setDefault = () => {
    const def = this.getDefault();
    this.state.instance.setDefaults(def);
    this.state.instance.update();
  }
  getDefault = () => {
    const {type, onError} = this.props;
    var defaultValue = this.props.value
    var defaultYear = ''
    var defaultMonth = ''
    var defaultDay = ''
    var defaultHour = ''
    var defaultMinute = ''
    // 默认值
    if (type === 'date') {
      // 如果不是合法的日期格式
      if (!defaultValue || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(defaultValue)) {
        if (onError) onError('请传入合法的日期');
        defaultValue = new Date().format('yyyy-MM-dd');
      }
      let dateValues = defaultValue.split('-')
      defaultYear = dateValues[0]
      defaultMonth = dateValues[1]
      defaultDay = dateValues[2] || '01'
    } else if (type === 'month') {
      // 如果不是合法的日期格式
      if (!defaultValue.isMonth()) {
        if (onError) onError('请传入合法的年月日期');
        defaultValue = new Date().format('yyyy-MM');
      }
      let monthValues = defaultValue.split('-')
      defaultYear = monthValues[0]
      defaultMonth = monthValues[1]
    } else if (type === 'datetime') {
      // 如果不是合法的日期格式
      if (!defaultValue.isMonth()) {
        if (onError) onError('请传入合法的日期时间');
        defaultValue = new Date().format('yyyy-MM-dd hh:mm');
      }
      let values = defaultValue.split(' ')
      let dateValues = values[0].split('-')
      let timeValues = values[1].split(':')
      defaultYear = dateValues[0]
      defaultMonth = dateValues[1]
      defaultDay = dateValues[2]
      defaultHour = timeValues[0]
      defaultMinute = timeValues[1]
    } else if (type === 'time') {
      // 如果不是合法的日期格式
      if (!/^[0-9]{2}:[0-9]{2}$/.test(defaultValue)) {
        if (onError) onError('请传入合法的时间');
        defaultValue = new Date().format('hh:mm');
      }
      let timeValues = defaultValue.split(':')
      defaultHour = timeValues[0]
      defaultMinute = timeValues[1]
    }
    return {
      year: defaultYear,
      month: defaultMonth,
      day: defaultDay,
      hour: defaultHour,
      minute: defaultMinute,
    }
  }
  getData = () => {
    // 自定义数据
    var yearsData = null
    var monthsData = null
    var daysData = null
    var hoursData = null
    var minutesData = null
    if (this.props.data) {
      if (this.props.data.year) {
        yearsData = this.props.data.year.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + '年'
          }
        })
      }
      if (this.props.data.month) {
        monthsData = this.props.data.month.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + '月'
          }
        })
      }
      if (this.props.data.day) {
        daysData = this.props.data.day.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + '日'
          }
        })
      }
      if (this.props.data.hour) {
        hoursData = this.props.data.hour.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + '时'
          }
        })
      }
      if (this.props.data.minute) {
        minutesData = this.props.data.minute.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + '分'
          }
        })
      }
    }
    return {
      yearsData: yearsData,
      monthsData: monthsData,
      daysData: daysData,
      hoursData: hoursData,
      minutesData: minutesData,
    }
  }
  initInstance = () => {
    var data = this.getData();
    var def = this.getDefault();
    // render数据
    const instance = new Instance({
      mask: this.$el,
      viewType: this.props.type,
      yearsData: data.yearsData,
      monthsData: data.monthsData,
      daysData: data.daysData,
      hoursData: data.hoursData,
      minutesData: data.minutesData,
      defaultYear: def.year,
      defaultMonth: def.month,
      defaultDay: def.day,
      defaultHour: def.hour,
      defaultMinute: def.minute,
      onClickMask: (e) => {
        if (this.props.onClickMask) this.props.onClickMask(e)
      },
      onClickCancel: (e) => {
        // e.hide()
        if (this.props.onClickCancel) this.props.onClickCancel(e);
      },
      onClickSubmit: (e) => {
        // e.hide()
        if (this.props.onClickSubmit) this.props.onClickSubmit(e);
      },
      onHid: (e) => {
      }
    })
    if (this.props.show && instance) {
      setTimeout(function(){
        instance.show();
      },10);
    }
    this.setState({
      instance
    })
  }
  render() {
    const {className, style} = this.props;
    return createPortal(
      <div className="mask picker-mask" ref={(el) => {this.$el = el}}>
        <div className={`picker${className ? ' ' + className : ''}`} style={style}>
          <div className="picker-header">
            <a className="picker-cancel">取消</a>
            <a className="picker-submit">完成</a>
          </div>
          <div className="picker-wrapper">
            <div className="picker-layer">
              <div className="picker-layer-frame"></div>
            </div>
            <div className="picker-slotbox"></div>
          </div>
        </div>
      </div>,
      this.props.portal || document.getElementById('root')
    );
  }
}
