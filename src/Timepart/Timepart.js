import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Timepart extends Component {
  static propTypes = {
    multiple: PropTypes.bool, // 是否支持多选
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    times: PropTypes.array, // [{className: string, startTime: 'hh:ss', endTime: 'hh:ss', data: string, cover: bool}]

    onChange: PropTypes.func, // onChange(times)
    onError: PropTypes.func
  }
  static defaultProps = {
    startTime: '07:00',
    endTime: '22:00'
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate (prevProps) {
    if (this.props.times && prevProps.times.length !== this.props.times.length) {
      this.update();
    }
  }
  componentDidMount () {
    var clickCount = 0;
    var instance = new Instance(this.$el, {
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      onClickPart: (s) => {
        if (s.target.classList.contains('active')) {
          s.target.classList.remove('active');
          clickCount = 0;
          // onChange
          this.onChange();
          return;
        }
        // 如果不允许多选,发现有已选中的先清除
        if (!this.props.multiple) {
          if (s.container.querySelectorAll('.progress-legend.active').length) {
            s.removeProgress('active');
            clickCount = 0;
            // onChange
            this.onChange();
            return;
          }
        }
        // 选中
        clickCount++;
        if (clickCount === 1) { // 如果点击了一次
          this.part1 = s.target;
          this.part1.classList.add('active');
          // onChange
          this.onChange();
        } else if (clickCount === 2) { // 如果点击了两次
          this.part1.classList.remove('active');
          this.part2 = s.target;
          var times = s.getTimesByParts(this.part1, this.part2);
          s.addProgress(times.startTime, times.endTime, 'active');
          clickCount = 0;
          // onChange
          this.onChange();
        }
      },
      onContain: (e) => {
        clickCount = 0;
        if (this.props.onError) this.props.onError(e, {errMsg: '已包含其它时间段'});
      },
      onCross: (e) => {
        if (this.props.onError) this.props.onError(e, {errMsg: '与其它时间段相交'});
      },
      onClickProgress: (s) => {
        if (s.target.classList.contains('active')) {
          // 根据data-id删除
          const id = s.target.getAttribute('data-id');
          [].slice.call(s.container.querySelectorAll(`.timepart-progress[data-id="${id}"]`)).forEach((el) => {
            el.parentNode.removeChild(el);
          });
          // onChange
          this.onChange();
        }
      },
      onClickWhite: (s) => {
      }
    });
    this.instance = instance;
    this.update();
  }
  update = () => {
    if (!this.props.times) return;
    for (let i = 0, time; time = this.props.times[i++];) { // eslint-disable-line
      if (time.className && time.startTime && time.endTime) {
        this.instance.addProgress(time.startTime, time.endTime, time.className, time.data || null, time.cover || false);
      }
    }
    // onChange
    this.onChange();
  }
  onChange = () => {
    const times = this.instance.getTimes();
    const part = this.instance.container.querySelector('.timepart-part.active');
    if (part) {
      times.push({
        className: part.className.replace('timepart-part ', ''),
        startTime: part.startTime,
        endTime: part.endTime,
        data: part.getAttribute('data') || ''
      })
    }
    if (this.props.onChange) this.props.onChange(times);
  }
  render() {
    const {
      multiple,
      startTime,
      endTime,
      times,

      onChange,
      onError,
      ...others
    } = this.props;
    return (
      <div ref={el => {this.$el = el;}} {...others} className={`timepart${others.className ? ' ' + others.className: ''}`}>
      </div>
    );
  }
}
