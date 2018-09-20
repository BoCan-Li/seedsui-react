import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Price extends Component {
  static propTypes = {
    showSymbol: PropTypes.bool, // 是否显示货币符号
    showThousandth: PropTypes.bool, // 是否显示千分位
    className: PropTypes.string,
    style: PropTypes.object,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    unit: PropTypes.string,
    digitsFixed: PropTypes.bool, // 固定小数, 例如100仍然显示100.00
    digits: PropTypes.oneOfType([ // 如果设置了小数位控制,则控制小数位,如不控制,则原样显示
      PropTypes.bool,
      PropTypes.number
    ])
  };
  static defaultProps = {
    showSymbol: true,
    showThousandth: true,
    className: 'capitalize',
    digitsFixed: true,
    digits: false
  }
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {showSymbol, showThousandth, price, unit, className, digits, digitsFixed, style, ...others} = this.props;
    // 价格字符串
    let priceString = '';
    // 如果价格不是数字,则直接显示
    if (isNaN(price)) {
      priceString = price;
    // 如果价格是数字,则加入千分位和小数位
    } else {
      let newPrice = price;
      // 加小数位
      if (typeof digits === 'number') {
        newPrice = digitsFixed ? String(Number(price).toFixed(digits)) : Math.Calc.toFixed(Number(price), digits);
      }
      // 加千分位
      priceString = showThousandth ? Math.Calc.toThousandth(newPrice) : '' + newPrice;
    }
    // 应用格式:整数与小数分开显示
    let priceInteger = null;
    let priceDecimal = null;
    if (priceString && priceString.indexOf('.') !== -1) {
      priceInteger = priceString.substring(0, priceString.indexOf('.'));
      priceDecimal = '.' + priceString.substring(priceString.indexOf('.') + 1);
    } else {
      priceInteger = priceString;
    }
    return (
      <span style={style} className={`price ${className}`} {...others}>{showSymbol && <span className="price-symbol">￥</span>}<span className="price-integer">{priceInteger}</span>{priceDecimal && <span className="price-digits">{priceDecimal}</span>}{unit && <span className="price-unit">{unit}</span>}</span>
    );
  }
}
