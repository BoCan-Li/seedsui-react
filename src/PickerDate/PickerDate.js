// require PrototypeDate.js和PrototypeString.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Instance from './instance.js';

export default class PickerDate extends Component {
  // 全局配置
  static contextTypes = {
    locale: PropTypes.object,
    portal: PropTypes.object
  }
  static propTypes = {
    portal: PropTypes.object,
    data: PropTypes.object, // {year: [], month: [], day: [], hour: [], minute: []}
    split: PropTypes.string,
    timeSplit: PropTypes.string,

    type: PropTypes.string, // date | month | time | datetime
    show: PropTypes.bool,
    value: PropTypes.string, // '2018-02-26'
    valueForKey: PropTypes.string, // '2018-02-26'

    maskAttribute: PropTypes.object,
    submitAttribute: PropTypes.object,
    cancelAttribute: PropTypes.object,

    onError: PropTypes.func
  }
  static defaultProps = {
    split: '-',
    timeSplit: ':',
    type: 'date'
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
    this.initInstance()
  }
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.show === this.props.show) return false;
    return true;
  }
  componentDidUpdate = () => {
    if (this.instance) {
      if (this.props.show) {
        this.update();
        this.instance.show();
      }
      else this.instance.hide()
    }
  }
  update = () => {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    this.instance.updateParams({
      yyUnit: typeof locale['unit_year'] === 'string' ? locale['unit_year'] : '年',
      MMUnit: typeof locale['unit_month'] === 'string' ? locale['unit_month'] : '月',
      ddUnit: typeof locale['unit_date'] === 'string' ? locale['unit_date'] : '日',
      hhUnit: typeof locale['unit_hour'] === 'string' ? locale['unit_hour'] : '时',
      mmUnit: typeof locale['unit_minute'] === 'string' ? locale['unit_minute'] : '分'
    });
    const def = this.getDefault();
    this.instance.setDefaults(def);
    this.instance.update();
  }
  getDefault = () => {
    const {
      locale = {}
    } = this.context;
    const {split, timeSplit, type, onError} = this.props;
    var defaultValue = this.props.valueForKey || this.props.value;
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    var nowHour = now.getHours();
    var nowMinute = now.getMinutes();
    var defaultYear = nowYear;
    var defaultMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
    var defaultDay = nowDate < 10 ? '0' + nowDate : nowDate;
    var defaultHour = nowHour < 10 ? '0' + nowHour : nowHour;
    var defaultMinute = nowMinute < 10 ? '0' + nowMinute : nowMinute;
    // 默认值
    if (type === 'date') {
      // 如果不是合法的日期格式
      const e = this.instance ? this.instance : {};
      if (!defaultValue || !defaultValue.isDate(split)) {
        if (onError) onError(e, {msg: `${locale['hint_invalid_date'] || '无效的日期格式'}`});
      } else {
        let dateValues = defaultValue.split(split)
        defaultYear = dateValues[0]
        defaultMonth = dateValues[1]
        defaultDay = dateValues[2] || '01'
      }
    } else if (type === 'month') {
      // 如果不是合法的日期格式
      if (!defaultValue || !defaultValue.isMonth(split)) {
        if (onError) onError(e, {msg: `${locale['hint_invalid_date'] || '无效的日期格式'}, YYYY-MM-DD`});
      } else {
        let monthValues = defaultValue.split(split)
        defaultYear = monthValues[0]
        defaultMonth = monthValues[1]
      }
    } else if (type === 'datetime') {
      // 如果不是合法的日期格式
      if (!defaultValue || !defaultValue.isDateTime(split, timeSplit)) {
        if (onError) onError(e, {msg: `${locale['hint_invalid_date'] || '无效的日期格式'}, YYYY-MM-DD hh:mm`});
      } else {
        let values = defaultValue.split(' ')
        let dateValues = values[0].split(split || '-')
        let timeValues = values[1].split(timeSplit || ':')
        defaultYear = dateValues[0]
        defaultMonth = dateValues[1]
        defaultDay = dateValues[2]
        defaultHour = timeValues[0]
        defaultMinute = timeValues[1]
      }
    } else if (type === 'time') {
      // 如果不是合法的日期格式
      if (!defaultValue || !defaultValue.isTime(split, timeSplit)) {
        if (onError) onError(e, {msg: `${locale['hint_invalid_date'] || '无效的日期格式'}, hh${timeSplit || ':'}mm`});
      } else {
        let timeValues = defaultValue.split(timeSplit || ':')
        defaultHour = timeValues[0]
        defaultMinute = timeValues[1]
      }
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
    const {
      locale = {}
    } = this.context;
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
            'value': '' + n + (locale['unit_year'] || '年')
          }
        })
      }
      if (this.props.data.month) {
        monthsData = this.props.data.month.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + (locale['unit_month'] || '月')
          }
        })
      }
      if (this.props.data.day) {
        daysData = this.props.data.day.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + (locale['unit_date'] || '日')
          }
        })
      }
      if (this.props.data.hour) {
        hoursData = this.props.data.hour.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + (locale['unit_hour'] || '时')
          }
        })
      }
      if (this.props.data.minute) {
        minutesData = this.props.data.minute.map((n) => {
          return {
            'key': '' + n,
            'value': '' + n + (locale['unit_minute'] || '分')
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
    // 全局配置
    const {
      locale = {}
    } = this.context;
    var data = this.getData();
    var def = this.getDefault();
    // render数据
    const {
      split,
      timeSplit,
      type,
      show,
      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {}
    } = this.props;
    this.instance = new Instance({
      mask: this.$el,
      split: split,
      timeSplit: timeSplit,
      viewType: type,
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
        if (maskAttribute.onClick) maskAttribute.onClick(e)
      },
      onClickCancel: (e) => {
        if (cancelAttribute.onClick) cancelAttribute.onClick(e);
      },
      onClickSubmit: (e) => {
        if (submitAttribute.onClick) submitAttribute.onClick(e);
      },
      onHid: (e) => {
      },
      yyUnit: locale['unit_year'] || '年',
      MMUnit: locale['unit_month'] || '月',
      ddUnit: locale['unit_date'] || '日',
      hhUnit: locale['unit_hour'] || '时',
      mmUnit: locale['unit_minute'] || '分'
    })
    if (show && this.instance) {
      setTimeout(function(){
        this.instance.show();
      },10);
    }
  }
  // 过滤已经回调的属性
  filterProps = (props) => {
    var propsed = {}
    for (let n in props) {
      if (n !== 'onClick') {
        propsed[n] = props[n]
      }
    }
    return propsed;
  }
  render() {
    // 全局配置
    const {
      locale = {}
    } = this.context;
    let {
      portal,
      data,
      split,
      timeSplit,
      type,
      show,
      value,
      valueForKey,

      maskAttribute = {},
      submitAttribute = {},
      cancelAttribute = {},

      onError,
      ...others
    } = this.props;
    // 剔除掉onClick事件, 因为在instance时已经回调了
    maskAttribute = this.filterProps(maskAttribute)
    submitAttribute = this.filterProps(submitAttribute)
    cancelAttribute = this.filterProps(cancelAttribute)
    return createPortal(
      <div ref={(el) => {this.$el = el}} {...maskAttribute} className={`mask picker-mask${maskAttribute.className ? ' ' + maskAttribute.className : ''}`}>
        <div {...others} className={`picker${others.className ? ' ' + others.className : ''}`}>
          <div className="picker-header">
            <a {...cancelAttribute} className={`picker-cancel${cancelAttribute.className ? ' ' + cancelAttribute.className : ''}`}>{cancelAttribute.caption || (locale['cancel'] || '取消')}</a>
            <a {...submitAttribute} className={`picker-submit${submitAttribute.className ? ' ' + submitAttribute.className : ''}`}>{cancelAttribute.caption || (locale['finish'] || '完成')}</a>
          </div>
          <div className="picker-wrapper">
            <div className="picker-layer">
              <div className="picker-layer-frame"></div>
            </div>
            <div className="picker-slotbox"></div>
          </div>
        </div>
      </div>,
      portal || this.context.portal || document.getElementById('root') || document.body
    );
  }
}
