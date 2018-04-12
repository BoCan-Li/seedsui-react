import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DB from 'components/seedsui/utils/db';
import bridge from 'components/seedsui/utils/bridge';
import styled from 'styled-components';
import Price from 'components/seedsui/Price/Price.jsx';
import {withRouter} from 'react-router';
import Checkbox from 'components/seedsui/Checkbox/Checkbox.jsx';

const checkStyle = {
  marginRight: '8px'
};

const Container = styled.div`
  display: flex;
  margin-bottom: -1px;
  padding: 12px;
  position: relative;
  height: 109px;
  background-color: ${props => props.color};
  box-sizing: border-box;
  overflow: hidden;
  flex: 1;
  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: ${props => props.left}px;
    width: 100%;
    height: 1px;
    background-color: #f0f1f2;
  }
`;

/* const ImgContainer = styled.div`
  width: 85px;
  height: 85px;
  position: relative;
  background: url(${props => props.img}) no-repeat;
  background-size: contain;
  background-position: center;
  border: ${props => props.noImg ? 'none' : '1px solid #EEEEEE' };
`; */
const ImgContainer = {
  width: '85px',
  height: '85px',
  position: 'relative',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  border: '1px solid #EEEEEE'
};
// const Img = styled.img`
//   border: ${props => props.noImg ? 'none' : '1px solid #EEEEEE' };
//   width: 85px;
//   height: 85px;
// `;

const Mark = styled.span`
  width: 100%;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  text-align: center;
  color: #FFF;
  background-color: ${props => props.red ? '#FF7575' : '#FF9008' };
  opacity: 0.85;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const TitleCon = styled.div`
  position: absolute;
  right: 6px;
  top: 2px;
  left: 12px;
`;

const Title = styled.div`
  color: #000;
  font-size: 14px;
  line-height: 1.4;
  max-height: 38px;
  overflow: hidden;
`;

const SubTitle = styled.div`
  font-size: 12px;
  color: #999999;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`;

const PriceContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 12px;
`;

const Body = styled.div`
  flex: 1;
  position: relative;
`;

const Padding = styled.div`
  width: 28px;
`;
@withRouter
export default class GoodItem extends Component {
  static propTypes = {
    onSelect: PropTypes.func, // 选择商品
    isSelectMode: PropTypes.bool, // 是否显示
    id: PropTypes.string,
    tenantId: PropTypes.string,
    customerId: PropTypes.string,
    cartId: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    isGift: PropTypes.bool,
    isPromotion: PropTypes.bool,
    price: PropTypes.string,
    unit: PropTypes.string,
    children: PropTypes.node,
    left: PropTypes.number,
    checked: PropTypes.bool,
    checkChange: PropTypes.func,
    padding: PropTypes.bool,
    color: PropTypes.string,
    noHref: PropTypes.bool, // 进货单列表页面用， 进货单列表页不需要进到商品详情
    query: PropTypes.string
  };

  static defaultProps = {
    tenantId: '',
    customerId: '',
    query: '',
    noHref: false
  }

  constructor(props, context) {
    super(props, context);
  }

  open = (id) => {
    if (this.props.isSelectMode) return;
    const { noHref } = this.props; // 点击不做任何操作
    if (noHref) return;
    const {query, tenantId, customerId} = this.props;
    const {history} = this.props;
    bridge.isHomePage(flag => {
      if (flag) {
        bridge.openWindow({url: `/_react_/goods/detail/${id}${tenantId ? '/' + tenantId : ''}${customerId ? '/' + customerId : ''}?isFromApp=1${query ? '&' + query : ''}`});
      } else {
        history.push(`/_react_/goods/detail/${id}${tenantId ? '/' + tenantId : ''}${customerId ? '/' + customerId : ''}${query ? '?' + query : ''}`);
      }
    });
  }
  onClick = (checked, cartId) => {
    this.props.checkChange(checked, cartId);
  }
  onSelect = (id, img, title, subtitle, isPromotion, price, unit) => {
    const item = {
      id, img, title, subtitle, isPromotion, price, unit
    };
    if (this.props.onSelect) this.props.onSelect(item);
  }
  render() {
    const {id, cartId, padding, img, title, subtitle, price, unit, isGift, isPromotion, children, left, checked, color } = this.props;
    const imgSrc = img ? DB.getStore('app_imgDomain') + img : '';
    let ImgContainerStyle = {};
    if (imgSrc) ImgContainerStyle = {backgroundImage: `url(${imgSrc})`}
    return (
      <Container left={left} color={color} onClick={() => {this.onSelect(id, img, title, subtitle, isPromotion, price, unit);}}>
        {padding && <Padding/>}
        {checked !== undefined && <Checkbox checked={checked} onClick={this.onClick} args={cartId} style={checkStyle}/>}
        <div className="bg-no-img" style={Object.assign({}, ImgContainer, ImgContainerStyle)} onClick={() => this.open(id)}>
          {isPromotion && <Mark >促销</Mark>}
          {isGift && <Mark red>赠品</Mark>}
        </div>
        <Body>
          <TitleCon>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
          </TitleCon>
          {(price || price === 0) && <PriceContainer><Price price={price} unit={unit ? '/' + unit : null}/></PriceContainer>}
        </Body>
        {children}
      </Container>
    );
  }
}

GoodItem.defaultProps = {
  left: 109
};
