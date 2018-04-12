import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import Goods from './Goods';
import Gifts from './Gifts';
import Message from './Message';
import Toast from 'components/seedsui/Toast/Toast.jsx';
import Load from 'components/Load';
import { connect } from 'react-redux';
import { getOrderDetail, cancelOrder, confirmOrder, buyAgain } from 'store/modules/orderDetail';
import bridge from 'components/seedsui/utils/bridge';
import Page from 'components/seedsui/Page/Page.jsx';
import Header from 'components/seedsui/Header/Header.jsx';
import Container from 'components/seedsui/Container/Container.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import Attributes from 'components/seedsui/Attributes/Attributes.jsx';
import Group from 'components/seedsui/Group/Group.jsx';
import Sliver from 'components/seedsui/Sliver/Sliver.jsx';
import Alert from 'components/seedsui/Alert/Alert.jsx';
import DB from 'components/seedsui/utils/db.js';

@withRouter
@connect(state => ({
  statusAttrs: state.orderDetail.statusAttrs, // 单据状态, 交货日期
  priceVisible: state.orderDetail.priceVisible,
  customerId: state.orderDetail.customerId, // 客户ID
  customer: state.orderDetail.customer, // 客户名称
  orderNo: state.orderDetail.orderNo, // 单据编号
  locationAttrs: state.orderDetail.locationAttrs, // 联系人
  supplierId: state.orderDetail.supplierId, // 供货商ID
  supplier: state.orderDetail.supplier, // 供货商名称
  amount: state.orderDetail.amount, // 单据总金额
  remark: state.orderDetail.remark, // 买家留言
  reason: state.orderDetail.reason, // 审批意见
  operationAttrs: state.orderDetail.operationAttrs, // 单据操作明细
  hasRecord: state.orderDetail.hasRecord,
  gifts: state.orderDetail.gifts,
  products: state.orderDetail.products,
  isConfirm: state.orderDetail.isConfirm,
  isCancel: state.orderDetail.isCancel,
  isPay: state.orderDetail.isPay,
  isViewComment: state.orderDetail.isViewComment,
  isDelivered: state.orderDetail.isDelivered,
  isBuyAgain: state.orderDetail.isBuyAgain, // 202去除，所有状态都要显示再次购买
  isLoading: state.orderDetail.isLoading,
  isPhotoRequired: state.orderDetail.isPhotoRequired,
  cartIds: state.orderDetail.cartIds,
  canReturn: state.orderDetail.canReturn,
  hasReturn: state.orderDetail.hasReturn,
  payStatus: state.orderDetail.payStatus,
  payArrow: state.orderDetail.payArrow,
  storeId: state.orderDetail.storeId,
  dealerCode: state.orderDetail.dealerCode,
}), {
  getOrderDetail,
  cancelOrder,
  confirmOrder,
  buyAgain,
})

export default class Detail extends Component {
  static propTypes = {
    statusAttrs: PropTypes.array,
    priceVisible: PropTypes.bool,
    customerId: PropTypes.string,
    customer: PropTypes.string,
    orderNo: PropTypes.string,
    locationAttrs: PropTypes.array,
    supplierId: PropTypes.string,
    supplier: PropTypes.string,
    amount: PropTypes.array,
    remark: PropTypes.string,
    reason: PropTypes.string,
    operationAttrs: PropTypes.array,
    hasRecord: PropTypes.bool,
    getOrderDetail: PropTypes.func,
    gifts: PropTypes.array,
    products: PropTypes.array,
    isConfirm: PropTypes.bool,
    isCancel: PropTypes.bool,
    isPay: PropTypes.bool,
    isViewComment: PropTypes.bool,
    isDelivered: PropTypes.bool,
    isBuyAgain: PropTypes.bool,
    cancelOrder: PropTypes.func,
    confirmOrder: PropTypes.func,
    isLoading: PropTypes.bool,
    isPhotoRequired: PropTypes.bool,
    buyAgain: PropTypes.func,
    cartIds: PropTypes.array,
    canReturn: PropTypes.bool,
    hasReturn: PropTypes.bool,
    payStatus: PropTypes.string,
    payArrow: PropTypes.bool,
    storeId: PropTypes.string,
    dealerCode: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      alertShow: false,
      alertMsg: '',
      onAlertSubmit: null,
      onAlertCancel: null,
      toastMsg: '复制剪贴板成功',
      toastShow: false,
      isAllowOperate: false // 是否允许操作(主联系人可操作;非主联系人,如果授权,也允许操作)
    };
  }
  componentDidMount() {
    // 主联系人和允许下单的非主联系人才能下单
    if (DB.getStore('app_selectedSupplier') && DB.getStore('app_selectedSupplier').isMain === '1') {
      this.setState({
        isAllowOperate: true,
      });
    } else {
      this.setState({
          isAllowOperate: bridge.getSystemParameter({code: 'mendian.notmain.sign', appId: '5922063325506058008'}) === 'true'
      });
    }

    const {type, orderId, tenantId} = this.props.match.params; // eslint-disable-line
    const params = {
      em_order_type: type,
      order_id: orderId,
      tenant_id: tenantId
    };
    this.props.getOrderDetail(params).then((result) => {
      if (result.code !== '1') {
        this.showMsg('单据详情请求失败，请稍后重试');
      }
    }).catch(() => {
      this.showMsg('请求失败，请稍后重试');
    });
    // 注册给客户端调用的返回事件
    bridge.addBackPress();
  }

  componentWillUnmount() {
    // 移除给客户端调用的返回事件
    bridge.removeBackPress();
  }
  onCopy = (text, result) => {
    if (result) {
      this.showMsg('复制剪贴板成功');
    } else {
      this.showMsg('复制剪贴板失败，此机型不支持此功能');
    }
  }
  onClickReturn = () => {
    const {type, orderId, tenantId} = this.props.match.params; // eslint-disable-line
    const {customerId, supplierId} = this.props;
    const {storeId, supplier} = this.props;
    const {history} = this.props;
    history.push(`/_react_/returnApply/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}/${storeId}/${supplier}`);
  }
  onClickPay = () => {
    this.goPay();
  }
  showMsg = (msg) => {
    if (this.timeout) window.clearTimeout(this.timeout);
    this.setState({
      toastShow: true,
      toastMsg: msg
    });
    this.timeout = setTimeout(() => {
      this.setState({
        toastShow: false
      });
    }, 2000);
  }
  confirm = (msg, success, cancel) => {
    this.setState({
      alertShow: true,
      alertMsg: msg,
      onAlertSubmit: () => {
        this.setState({
          alertShow: false
        });
        if (success) success();
      },
      onAlertCancel: () => {
        this.setState({
          alertShow: false
        });
        if (cancel) cancel();
      }
    });
  }
  cancelOrder = () => {
    this.confirm('确认取消单据么？', () => {
      const { type, orderId, tenantId } = this.props.match.params; // eslint-disable-line
      const { customerId } = this.props;
      const params = {
        em_order_type: type,
        order_id: orderId,
        tenant_id: tenantId,
        customer_id: customerId
      };
      this.props.cancelOrder(params).then((result) => {
        if (result.code === '1') {
          this.props.getOrderDetail(params).then((result2) => {
            if (result2.code !== '1') {
              this.showMsg('单据详情请求失败，请稍后重试');
            }
          });
        } else {
          this.showMsg('取消单据失败，请稍后重试');
        }
      });
    });
  }
  confirmOrder = () => {
    const { type, orderId, tenantId } = this.props.match.params; // eslint-disable-line
    const { customerId } = this.props;
    const params = {
      em_order_type: type,
      order_id: orderId,
      tenant_id: tenantId,
      customer_id: customerId
    };
    this.props.confirmOrder(params).then((result) => {
      if (result.code === '1') {
        this.showMsg('确认单据成功');
        setTimeout(() => {
          this.props.getOrderDetail(params).then((result2) => {
            if (result2.code !== '1') {
              this.showMsg('单据详情请求失败，请稍后重试');
            }
          });
        }, 300);
      } else {
        this.showMsg('确认单据失败，请稍后重试');
      }
    });
  }

  goDelivery = () => {
    const {match, history} = this.props;
    const { type, orderId, tenantId } = match.params;
    history.push(`/_react_/delivery/list/${type}/${orderId}/${tenantId}`);
  }
  goReturn = () => {
    const {match, history} = this.props;
    const { type, orderId, tenantId } = match.params;
    history.push(`/_react_/returnRecord/${type}/${orderId}/${tenantId}`);
  }
  goCommentView = () => {
    const {match, history} = this.props;
    const {orderId, tenantId} = match.params;
    history.push(`/_react_/commentView/${orderId}/${tenantId}`);
  }
  goPay = () => {
    const {match, history} = this.props;
    const {orderId, tenantId} = match.params;
    const {orderNo, customerId, supplier, amount, dealerCode} = this.props;
    const amount1 = amount[0].value;
    let discountAmount = amount1;
    if (amount[2]) discountAmount = amount[2].value;
    history.push(`/_react_/pay/confirm/${orderId}/${orderNo}/${tenantId}/${customerId}/${supplier}/${amount1}/${discountAmount}/${dealerCode}`);
  }
  goPayDetail = () => {
    const {match, history} = this.props;
    const { orderId, tenantId } = match.params;
    history.push(`/_react_/pay/detail/${orderId}/${tenantId}/`);
  }
  // 确认签收
  signConfirm = () => {
    const {history, match} = this.props;
    const { type, orderId, tenantId } = match.params;
    const { customerId, supplierId, isPhotoRequired, customer, orderNo } = this.props;
    if (type === 'PSI') { // 去评价
      history.replace(`/_react_/comment/detail/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}/${isPhotoRequired}/${customer.toASCII()}/${orderNo}`);
      return;
    }
    // DMS采购入库是否需要评价
    const need_appraise = bridge.getSystemParameter({code: 'dms.inhouse_need_appraise', appId: '9179656071611871366'}) === 'true';
    // DMS允许修改签收数量
    const allow_modify = bridge.getSystemParameter({code: 'dms.allow_modify_sign_num', appId: '9179656071611871366'}) === 'true';
    // DMS允许修改签收数量为否,DMS采购入库是否需要评价为是时,则跳过签收入库页面
    if (need_appraise && !allow_modify) {
      history.replace(`/_react_/comment/detail/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}/${isPhotoRequired}/${customer.toASCII()}/${orderNo}?across=1`);
      return;
    }
    // 签收入库
    history.replace(`/_react_/stock/confirm/${type}/${orderId}/${tenantId}/${customerId}/${supplierId}/${isPhotoRequired}/${customer.toASCII()}/${orderNo}`);
  }
  goHome = () => {
    if (bridge.platform === 'dinghuo') {
      bridge.goHome();
      return;
    }
    const {history} = this.props;
    history.go(-2);
    setTimeout(() => {
      history.replace('/_react_/main/home');
    }, 100);
  }
  render() {
    const { tenantId } = this.props.match.params; // eslint-disable-line
    const { statusAttrs, customer, priceVisible, locationAttrs, supplier, amount,
      remark, reason, operationAttrs, products, gifts,
      isLoading,
      customerId
    } = this.props;
    return (
      <Page>
        <Header>
          <Titlebar caption="进货单详情"/>
        </Header>
        {!isLoading && <Container>
          <Group style={{padding: '1px 0'}}>
            <Attributes list={statusAttrs} nameClassName="color-sub" valueStyle={{marginLeft: '8px'}}/>
          </Group>
          <Group style={{padding: '1px 0'}}>
            <Sliver caption={customer} liconClassName="icon-house size16" style={{padding: '10px 12px'}} className="border-b"/>
            <Attributes list={locationAttrs} nameClassName="color-sub" valueStyle={{marginLeft: '8px'}}/>
          </Group>
          <Group>
            <Sliver caption={supplier} liconClassName="icon-build size16" style={{padding: '10px 12px'}} />
          </Group>
          <Goods products={products} priceVisible={priceVisible} customerId={customerId} tenantId={tenantId}/>
          <Gifts gifts={gifts} />
          {priceVisible && <Group style={{padding: '1px 0'}}><Attributes className="between" list={amount} /></Group>}
          {remark && <Message message={remark} label={'买家留言'}/>}
          {reason && <Message message={reason} label={'审批意见'}/>}
          <Group style={{padding: '1px 0'}}>
            <Attributes list={operationAttrs} onCopy={this.onCopy} nameClassName="color-sub" valueStyle={{marginLeft: '8px'}}/>
          </Group>
        </Container>}
        <Alert show={this.state.alertShow} caption={this.state.alertMsg} onClickSubmit={this.state.onAlertSubmit} onClickCancel={this.state.onAlertCancel}/>
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle" style={{borderRadius: '4px'}}/>
        {isLoading && <Load style={{top: '44px'}}/>}
      </Page>
    );
  }
}
