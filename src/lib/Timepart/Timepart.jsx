import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './timepart.js';

export default class Timepart extends Component {
  static propTypes = {
    multiple: PropTypes.bool, // 是否支持多选
    className: PropTypes.string,
    style: PropTypes.object,

    startTime: PropTypes.string, // hh:ss
    endTime: PropTypes.string,

    disabledTimes: PropTypes.array, // [{startTime: 'hh:ss', endTime: 'hh:ss', className: string, data: string}]
    selectedTimes: PropTypes.array, // 同上
    customTimes: PropTypes.array, // 同上

    onChange: PropTypes.func, // onChange({})
    onError: PropTypes.func
  }
  static defaultProps = {
    startTime: '7:00',
    endTime: '22:00'
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.disabledTimes && prevProps.disabledTimes.length !== this.props.disabledTimes.length) {
      this.props.disabledTimes.forEach((time) => {
        this.state.instance.disableTimes(time.startTime, time.endTime, time.className, time.data);
      })
    }
    if (this.props.customTimes && prevProps.customTimes.length !== this.props.customTimes.length) {
      this.props.customTimes.forEach((time) => {
        this.state.instance.chooseTimes(time.startTime, time.endTime, time.className || 'active', time.data);
      })
    }
  }
  componentDidMount () {
    var instance = new Instance(this.$el, {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      onClick: (e) => {
      },
      onConflictOver: (e) => {
        this.onError('不能跨选禁用时间段', e)
      },
      onConflictContain: (e) => {
        this.error && this.error('时间段冲突', e.target)
      },
      onClickActive: (e) => { // 点击选中区域
        if (!this.props.multiple) e.removeAllActive()
      },
      onClickDisabled: (e) => { // 点击禁用区域
      },
      onClickChoose: (e) => {
        var data = JSON.parse(e.target.getAttribute('data-progress'))
        console.log('点击选择区域，数据：{startTime:' + data.startTime + ',endTime:' + data.endTime + '}')
      },
      onClickValid: (s) => { // 点击空白有效区域
        console.log('有效区域')
        console.log(s.params.activeClass)
        if (s.clickCount === 1) { // 如果点击了一次
          this.part1 = s.target
          this.part1.classList.add(s.params.activeClass)
        } else if (s.clickCount === 2) { // 如果点击了两次
          this.part2 = s.target
          // 选中
          var times = s.getTimesByParts(this.part1, this.part2)
          s.activeTimes(times.startTime, times.endTime)
        } else if (s.clickCount === 3) { // 如果点击了三次
          s.removeAllActive()
        }
      }
    });
    // 禁用时间
    if (this.props.disabledTimes) {
      this.props.disabledTimes.forEach((time) => {
        instance.disableTimes(time.startTime, time.endTime, time.className, time.data);
      });
    }
    // 自定义时间
    if (this.props.customTimes) {
      this.props.customTimes.forEach((time) => {
        instance.chooseTimes(time.startTime, time.endTime, time.className || 'active', time.data);
      });
    }
    // 选中时间
    if (this.props.selectedTimes) {
      let selectedTimes = this.props.selectedTimes;
      if (!this.props.multiple) selectedTimes = [this.props.selectedTimes[0]];
      selectedTimes.forEach((time) => {
        instance.activeTimes(time.startTime, time.endTime, time.className || 'active', time.data);
      });
    }
    this.setState({
      instance
    }, () => {
      this.onChange();
    });
  }
  onChange = () => {
    console.log(this.state.instance.getActiveTimes())
    const {disabledTimes, customTimes} = this.props;
    if (this.props.onChange) this.props.onChange({
      disabledTimes,
      customTimes,
      selectedTimes: this.state.instance.getActiveTimes()
    });
  }
  render() {
    const {className, style} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={`timepart${className ? ' ' + className: ''}`} style={style}>
      </div>
    );
  }
}
