import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './timepart.js';

export default class Timepart extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,

    disabledStartTime: PropTypes.string,
    disabledEndTime: PropTypes.string,
    selectedStartTime: PropTypes.string, // hh:ss
    selectedEndTime: PropTypes.string,

    onChange: PropTypes.func,
    onError: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidUpdate (prevProps) {
    // if (this.props.selectedStartTime) {
    //   this.state.timepart.chooseTimes("9:10","12:10",["active"],data);
    // }
    // this.state.timepart.disableTimes(null,new Date());
  }
  componentDidMount () {
    var instance = new Instance(this.$el, {
      startTime: this.startTime,
      endTime: this.endTime,
      onClick: (e) => {
        // console.log(e.target)
      },
      onConflictOver: (e) => {
        this.onError('不能跨选禁用时间段', e)
      },
      onConflictContain: (e) => {
        this.error && this.error('时间段冲突', e.target)
      },
      onClickActive: (e) => { // 点击选中区域
        e.removeAllActive()
      },
      onClickDisabled: (e) => { // 点击禁用区域
      },
      onClickChoose: (e) => {
        // var data = JSON.parse(e.target.getAttribute('data-progress'))
        // console.log('点击选择区域，数据：{startTime:' + data.startTime + ',endTime:' + data.endTime + '}')
      },
      onClickValid: (s) => { // 点击有效区域
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
    this.setState({
      instance
    });
  }
  onChange = () => {
    if (this.props.onChange) this.props.onChange();
  }
  render() {
    const {className, style} = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={`timepart${className ? ' ' + className: ''}`} style={style}>
      </div>
    );
  }
}
