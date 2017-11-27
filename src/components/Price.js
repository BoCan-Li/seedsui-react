import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../utils/math.js';

const Price = styled.div`
  color: #EB464A;
  font-size: 12px;
  vertical-align: bottom;
`;

const Big = styled.span`
  font-size: 16px;
`;

const PriceUnit = styled.div`
  display: inline-block;
  vertical-align:middle;
  color: #aaa;
  margin-left:5px;
`;
export default class Index extends Component {
  static propTypes = {
    style: PropTypes.string,
    price: PropTypes.string,
    unit: PropTypes.string,
    precision: PropTypes.number,
  };


  render() {
    const {price, unit, precision, style} = this.props;
    let newPrice = price;
    if (precision) {
      try {
        newPrice = String(Number(price).toFixed(precision));
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
      <Price style={style}>¥<Big>{priceInt}</Big>{priceTail}
        {unit && <PriceUnit>/{unit}</PriceUnit>}
      </Price>
    );
  }
}
