import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import '../utils/math.js'

export default class Index extends Component {
  static propTypes = {
    showSymbol: PropTypes.bool, // 是否显示货币符号
    showThousandth: PropTypes.bool, // 是否显示千分位
    className: PropTypes.string,
    style: PropTypes.object,
    price: PropTypes.string,
    unit: PropTypes.string,
    digitsFixed: PropTypes.bool, // 固定小数, 例如100仍然显示100.00
    digits: PropTypes.number,
  };
  static defaultProps = {
    showSymbol: true,
    showThousandth: true,
    className: 'capitalize',
    digits: 2,
    digitsFixed: true
  }
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {showSymbol, showThousandth, price, unit, className, digits, digitsFixed, style} = this.props;
    // 价格字符串
    let priceString = '';
    // 如果价格不是数字,则直接显示
    if (isNaN(price)) {
      priceString = price;
    // 如果价格是数字,则将整数和小数分别放在两个子元素里显示
    } else {
      let newPrice = price;
      if (digits) {
        try {
          if (digitsFixed) newPrice = String(Number(price).toFixed(digits));
          else newPrice = Math.Calc.toFixed(Number(price), digits);
        } catch (error) {
          console.log(error);
        }
      } else {
        newPrice = Math.abs(price);
      }
      priceString = showThousandth ? Math.Calc.toThousandth(newPrice) : '' + newPrice;
    }
    // 整数与小数分开显示
    let priceInteger = null;
    let priceDecimal = null;
    if (priceString && priceString.indexOf('.') !== -1) {
      priceInteger = priceString.substring(0, priceString.indexOf('.'));
      priceDecimal = '.' + priceString.substring(priceString.indexOf('.') + 1);
    } else {
      priceInteger = priceString;
    }
    return (
      <span style={style} className={`price ${className}`}>{showSymbol && <span className="price-symbol">￥</span>}<span className="price-integer">{priceInteger}</span>{priceDecimal && <span className="price-digits">{priceDecimal}</span>}{unit && <span className="price-unit">{unit}</span>}</span>
    );
  }
}
