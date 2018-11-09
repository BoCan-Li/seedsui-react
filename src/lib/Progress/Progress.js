import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Counter from './../Counter';

export default class Progress extends Component {
  static propTypes = {
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
    max: 100,
    min: 0,
    value: '0'
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  onClick = () => {
  }
  render() {
    const {
      style, className,
      barStyle, barClassName,
      percentage, max, min, value, showPercentage,
      ...others
    } = this.props;

    // 计算百分比
    let barPercentage = 0;
    let textPercentage = 0;
    if (!isNaN(percentage)) {
      barPercentage = textPercentage = percentage;
    } else if (!isNaN(max) && !isNaN(value)) {
      barPercentage = textPercentage = (value / (max - min)) * 100;
    }
    if (barPercentage > 100) {
      barPercentage = 100;
    } else if (barPercentage < 0) {
      barPercentage = 0;
    }
    return <div className={`progress${className ? ' ' + className : ''}`} style={style} {...others}>
      <span ref={(el) => {this.$bar = el;}} className={`progress-bar${barClassName ? ' ' + barClassName : ''}`} style={Object.assign({}, barStyle, {width: barPercentage + '%'})}>
        {showPercentage && <Counter duration={1000} to={textPercentage} from={0} suffix={'%'} style={{fontSize: '12px', marginRight: '4px'}}/>}
        {!showPercentage && <Counter duration={1000} to={Number(value)} from={min} suffix={'/' + max} style={{fontSize: '12px', marginRight: '4px'}}/>}
      </span>
    </div>;
  }
}
