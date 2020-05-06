// require PrototypeDate.js和PrototypeString.js
import React, { forwardRef, useEffect, useRef, useContext, useImperativeHandle } from 'react';
import {createPortal} from 'react-dom';
import Instance from './instance.js';
import Context from '../Context/instance.js';

const PickerDate = forwardRef(({
  portal,
  data, // {year: [], month: [], day: [], hour: [], minute: []}
  split = '-',
  timeSplit = ':',

  type = 'date', // date | month | time | datetime
  show = false,
  value, // '2018-02-26'
  selected, // [{id: '', name: ''}]

  maskAttribute = {},
  submitAttribute = {},
  cancelAttribute = {},

  onError,
  ...others
}, ref) =>  {
  const refEl = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null)
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || {};

  useEffect(() => {
    initInstance()
  }, []) // eslint-disable-line

  useEffect(() => {
    if (instance.current) {
      if (show) {
        update();
        instance.current.show();
      } else {
        instance.current.hide()
      }
    }
  }, [show])

  function update () {
    instance.current.updateParams({
      yyUnit: typeof locale['unit_year'] === 'string' ? locale['unit_year'] : '年',
      MMUnit: typeof locale['unit_month'] === 'string' ? locale['unit_month'] : '月',
      ddUnit: typeof locale['unit_date'] === 'string' ? locale['unit_date'] : '日',
      hhUnit: typeof locale['unit_hour'] === 'string' ? locale['unit_hour'] : '时',
      mmUnit: typeof locale['unit_minute'] === 'string' ? locale['unit_minute'] : '分'
    });
    const def = getDefault();
    instance.current.setDefaults(def);
    instance.current.update();
  }
  function getDefault () {
    var defaultValue = value;
    if (selected && selected.length) {
      defaultValue = selected.map((item) => {
        return item.id
      });
      defaultValue = defaultValue.join(split);
    }
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
      const e = instance.current ? instance.current : {};
      if (!defaultValue || !defaultValue.isDate(split)) {
        if (onError) onError(e, {errMsg: `${locale['hint_invalid_date'] || '无效的日期格式'}`});
      } else {
        let dateValues = defaultValue.split(split)
        defaultYear = dateValues[0]
        defaultMonth = dateValues[1]
        defaultDay = dateValues[2] || '01'
      }
    } else if (type === 'month') {
      // 如果不是合法的日期格式
      if (!defaultValue || !defaultValue.isMonth(split)) {
        if (onError) onError(e, {errMsg: `${locale['hint_invalid_date'] || '无效的日期格式'}, YYYY-MM-DD`});
      } else {
        let monthValues = defaultValue.split(split)
        defaultYear = monthValues[0]
        defaultMonth = monthValues[1]
      }
    } else if (type === 'datetime') {
      // 如果不是合法的日期格式
      if (!defaultValue || !defaultValue.isDateTime(split, timeSplit)) {
        if (onError) onError(e, {errMsg: `${locale['hint_invalid_date'] || '无效的日期格式'}, YYYY-MM-DD hh:mm`});
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
        if (onError) onError(e, {errMsg: `${locale['hint_invalid_date'] || '无效的日期格式'}, hh${timeSplit || ':'}mm`});
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
  function getData () {
    // 自定义数据
    var yearsData = null
    var monthsData = null
    var daysData = null
    var hoursData = null
    var minutesData = null
    if (data) {
      if (data.year) {
        yearsData = data.year.map((n) => {
          return {
            'id': '' + n,
            'name': '' + n + (locale['unit_year'] || '年')
          }
        })
      }
      if (data.month) {
        monthsData = data.month.map((n) => {
          return {
            'id': '' + n,
            'name': '' + n + (locale['unit_month'] || '月')
          }
        })
      }
      if (data.day) {
        daysData = data.day.map((n) => {
          return {
            'id': '' + n,
            'name': '' + n + (locale['unit_date'] || '日')
          }
        })
      }
      if (data.hour) {
        hoursData = data.hour.map((n) => {
          return {
            'id': '' + n,
            'name': '' + n + (locale['unit_hour'] || '时')
          }
        })
      }
      if (data.minute) {
        minutesData = data.minute.map((n) => {
          return {
            'id': '' + n,
            'name': '' + n + (locale['unit_minute'] || '分')
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
  function initInstance () {
    if (!refEl || !refEl.current) return;
    var data = getData();
    var def = getDefault();
    // render数据
    instance.current = new Instance({
      mask: refEl.current,
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
        const value = e.activeText;
        const options = e.activeOptions;
        if (submitAttribute.onClick) submitAttribute.onClick(e, value, options);
      },
      onHid: (e) => {
      },
      yyUnit: locale['unit_year'] || '年',
      MMUnit: locale['unit_month'] || '月',
      ddUnit: locale['unit_date'] || '日',
      hhUnit: locale['unit_hour'] || '时',
      mmUnit: locale['unit_minute'] || '分'
    })
    if (show && instance) {
      setTimeout(function(){
        instance.current.show();
      },10);
    }
  }
  // 过滤已经回调的属性
  function filterProps (props) {
    const {onClick, ...otherProps} = props;
    return {...otherProps};
  }


  // 剔除掉onClick事件, 因为在instance时已经回调了
  const otherMaskAttribute = filterProps(maskAttribute)
  const otherSubmitAttribute = filterProps(submitAttribute)
  const otherCancelAttribute = filterProps(cancelAttribute)
  return createPortal(
    <div ref={refEl} {...otherMaskAttribute} className={`mask picker-mask${otherMaskAttribute.className ? ' ' + otherMaskAttribute.className : ''}`}>
      <div {...others} className={`picker${others.className ? ' ' + others.className : ''}`}>
        <div className="picker-header">
          <a {...otherCancelAttribute} className={`picker-cancel${otherCancelAttribute.className ? ' ' + otherCancelAttribute.className : ''}`}>{otherCancelAttribute.caption || (locale['cancel'] || '取消')}</a>
          <a {...otherSubmitAttribute} className={`picker-submit${otherSubmitAttribute.className ? ' ' + otherSubmitAttribute.className : ''}`}>{otherSubmitAttribute.caption || (locale['finish'] || '完成')}</a>
        </div>
        <div className="picker-wrapper">
          <div className="picker-layer">
            <div className="picker-layer-frame"></div>
          </div>
          <div className="picker-slotbox"></div>
        </div>
      </div>
    </div>,
    portal || context.portal || document.getElementById('root') || document.body
  );
})

export default React.memo(PickerDate, (prevProps, nextProps) => {
  if (nextProps.show === prevProps.show) return true;
  return false;
})
