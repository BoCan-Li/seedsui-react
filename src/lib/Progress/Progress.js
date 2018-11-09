import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Counter from './../Counter';

export default class Progress extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,

    barStyle: PropTypes.object,
    barClassName: PropTypes.string,

    captionClassName: PropTypes.string,
    captionStyle: PropTypes.object,

    percentage: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    showPercentage: PropTypes.bool,

    children: PropTypes.node
  }
  static defaultProps = {
    showPercentage: true,
    max: 100,
    min: 0,
    value: 0
  }
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
  }
  render() {
    const {
      style, className,
      barStyle, barClassName,
      captionStyle, captionClassName,
      percentage, max, min, value, showPercentage,
      children,
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
        {showPercentage && <Counter duration={1000} to={textPercentage} from={0} suffix={'%'} className={`progress-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}/>}
        {!showPercentage && <Counter duration={1000} to={Number(value)} from={min} suffix={'/' + max} className={`progress-caption${captionClassName ? ' ' + captionClassName : ''}`} style={captionStyle}/>}
      </span>
      {children}
    </div>;
  }
}
