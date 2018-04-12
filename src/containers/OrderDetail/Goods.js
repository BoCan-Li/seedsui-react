import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import GoodItem from './GoodItem';

const Root = styled.div`
  margin-top: 10px;
  background-color: #FFF;
`;

const Icon = styled.div`
  color: #999999;
  font-size: 12px;
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

export default class Goods extends Component {
  static propTypes = {
    tenantId: PropTypes.string,
    customerId: PropTypes.string,
    products: PropTypes.array,
    priceVisible: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { products, priceVisible, tenantId, customerId } = this.props;
    return (
      <Root>
        {products && products.map((product, index) => {
          return (<GoodItem
            noHref={true}
            query="fromPage=order"
            key={index}
            id={product.id}
            tenantId={tenantId}
            customerId={customerId}
            img={product.picUrl}
            title={product.title}
            subtitle={product.subtitle}
            price={priceVisible ? product.price : null}
            left={0}
          >
            <Icon>{product.info}</Icon>
          </GoodItem>);
        })}
      </Root>
    );
  }
}
