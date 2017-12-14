import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import 'utils/math.js'

export default class Index extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    price: PropTypes.string,
    unit: PropTypes.string,
    digitsFixed: PropTypes.bool,
    digits: PropTypes.number,
  };
  static defaultProps = {
    className: 'normal',
    digitsFixed: true
  }
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {price, unit, className, digits, digitsFixed, style} = this.props;
    let newPrice = price;
    if (digits) {
      try {
        if (digitsFixed) newPrice = String(Number(price).toFixed(digits));
        else newPrice = Math.Calc.toFixed(Number(price), digits);
      } catch (error) {
        console.log(error);
      }
    }
    const priceString = Math.Calc.toThousandth(newPrice);
    let priceInt = null;
    let priceDigits = null;
    if (priceString.indexOf('.') !== -1) {
      priceInt = priceString.substring(0, priceString.indexOf('.'));
      priceDigits = '.' + priceString.substring(priceString.indexOf('.') + 1);
    } else {
      priceInt = priceString;
    }
    return (
      <span style={style} className={`price ${className}`}><span className="price-symbol">¥</span><span className="price-integer">{priceInt}</span>{priceDigits && <span className="price-digits">{priceDigits}</span>}{unit && <span className="price-unit">/{unit}</span>}</span>
    );
  }
}
