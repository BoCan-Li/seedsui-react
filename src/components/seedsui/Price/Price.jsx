import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'utils/math.js';

export default class Index extends Component {
  static propTypes = {
    style: PropTypes.object,
    text: PropTypes.number,
    unit: PropTypes.string,
    digits: PropTypes.number,
  };

  render() {
    const {text, unit, digits, style} = this.props;
    let newPrice = text;
    if (digits) {
      try {
        newPrice = Math.Calc.toFixed(text, digits);
      } catch (error) {
        console.log(error);
      }
    }
    // const priceString = String(newPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    const priceString = Math.Calc.toThousandth(newPrice);
    let priceInt = null;
    let priceTail = null;
    if (priceString.indexOf('.') !== -1) {
      priceInt = priceString.substring(0, priceString.indexOf('.'));
      priceTail = '.' + priceString.substring(priceString.indexOf('.') + 1);
    } else {
      priceInt = priceString;
    }
    return (
      <span style={style} className="price">¥<span className="price-integer">{priceInt}</span>{priceTail}
        {unit && <span className="price-unit">/{unit}</span>}
      </span>
    );
  }
}
