import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Counter from './../Counter';

export default class Progress extends Component {
  static propTypes = {
    // args: PropTypes.array,
    style: PropTypes.object,
    className: PropTypes.string,
    barStyle: PropTypes.object,
    barClassName: PropTypes.string,

    percentage: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    value: PropTypes.string,
    showPercentage: PropTypes.bool
  }
  static defaultProps = {
    showPercentage: true,
    max: 0,
    min: 0,
    value: '0'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    const {percentage, max, min, value} = this.props;
    // 计算百分比
    let barPercentage = 0;
    if (percentage) {
      barPercentage = percentage;
    } else if (max && value) {
      barPercentage = (value / (max - min)) * 100;
    }
    this.$bar.style.width = barPercentage + '%';
  }
  onClick = () => {
  }
  render() {
    const {
      style, className,
      barStyle, barClassName,
      percentage, max, min, value, showPercentage
    } = this.props;

    // 计算百分比
    let barPercentage = 0;
    if (percentage) {
      barPercentage = percentage;
    } else if (max && value) {
      barPercentage = (value / (max - min)) * 100;
    }

    return <div className={`progress${className ? ' ' + className : ''}`} style={style}>
      <span ref={(el) => {this.$bar = el;}} className={`progress-bar${barClassName ? ' ' + barClassName : ''}`} style={barStyle}>
        {showPercentage && <Counter duration={1000} to={barPercentage} from={0} suffix={'%'} style={{fontSize: '12px', marginRight: '4px'}}/>}
        {!showPercentage && <Counter duration={1000} to={Number(value)} from={min} suffix={'/' + max} style={{fontSize: '12px', marginRight: '4px'}}/>}
      </span>
    </div>;
  }
}
