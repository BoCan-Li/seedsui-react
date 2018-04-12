import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import GoodItem from './GoodItem';
import Attributes from 'components/seedsui/Attributes/Attributes.jsx';
import ImgScroll from './ImgScroll';
import {withRouter} from 'react-router';

const Root = styled.div`
  box-shadow: 1px 1px 0 0 #E5E5E5, -1px -1px 0 0 #E5E5E5;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 2px;
  background: #fff;
  padding: 1px 0;
`;

const Title = styled.div`
  height: 44px;
  box-shadow: 0 1px 0 0 #E5E5E5;
  padding-left: 11px;
  height: 44px;
  color: #1A1A1A;
  font-size: 14px;
  line-height: 46px;
`;

const Status = styled.div`
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  background: ${props => props.color};
  border-radius: 2px;
  font-size: 12px;
  color: #FFFFFF;
  height: 19px;
  line-height: 1.5;
  text-align: center;
  padding: 0 4px;
`;

@withRouter
export default class Card extends Component {
  static propTypes = {
    item: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
  }
  onClickLoan = () => {
    console.log('申请贷款');
  }
  goDetail = (item) => {
    const {history} = this.props;
    history.push(`/_react_/order/detail/${item.type}/${item.orderId}/${item.tenantId}`);
    return;
  }

  render() {
    const { item } = this.props;
    let Item = null;
    if (item.picLength === 0) {
      Item = null;
    } else if (item.picLength === 1) {
      Item = (<GoodItem
        noHref
        color={'#FAFAFA'}
        img={item.detail.picUrl}
        title={item.detail.title}
        subtitle={item.detail.subtitle}
        left={0}
      />);
    } else {
      Item = <ImgScroll imgs={item.detail} />;
    }
    // 设置attributes
    const attrs = [
      {
        name: '进货方:',
        value: item.customer_name
      },
      {
        name: '下单时间:',
        value: item.create_time
      },
      {
        name: '订单金额:',
        price: true,
        value: item.price,
        show: item.price_visible === '1',
        ricon: item.payStatus
      }
    ];
    if (item.payment_status === '1') { // 贷款状态,1显示申请贷款按钮;其它情况只显示文字
      attrs.push({
        name: '贷款状态:',
        value: '申请贷款',
        button: true,
        buttonClick: this.onClickLoan,
        buttonClassName: 'small'
      });
    } else {
      attrs.push({
        name: '贷款状态:',
        value: item.payment_status
      });
    }
    return (
      item &&
      <Root onClick={() => this.goDetail(item)}>
        <Title>{item.title}<Status color={item.color}>{item.statusName}</Status> </Title>
        {Item}
        <Attributes className="align" list={attrs} />
      </Root>
    );
  }
}
