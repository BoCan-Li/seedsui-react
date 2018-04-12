import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import bridge from 'components/seedsui/utils/bridge';
import Card from './Card';
import Load from 'components/Load';
import { connect } from 'react-redux';
import { getOrders, changeTab, init } from 'store/modules/order';
import styled from 'styled-components';
import Page from 'components/seedsui/Page/Page.jsx';
import Header from 'components/seedsui/Header/Header.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import Dragrefresh from 'components/seedsui/Dragrefresh/Dragrefresh.jsx';
import Device from 'components/seedsui/utils/device.js';
import Toast from 'components/seedsui/Toast/Toast.jsx';
import OrderDetail from './../OrderDetail'; // 详情子路由

const Content = styled.div`
  margin-bottom: 10px;
`;
const scrollContainer = {
  position: 'absolute',
  top: '44px',
  bottom: '0',
  left: '0',
  right: '0',
  overflow: 'auto',
};

@withRouter
@connect(state => ({
  activeIndex: state.order.activeIndex,
  page: state.order.page,
  rows: state.order.rows,
  hasMore: state.order.hasMore,
  orders: state.order.orders,
  isLoading: state.order.isLoading
}), {
  getOrders,
  changeTab,
  init
})
export default class Order extends Component {
  static propTypes = {
    activeIndex: PropTypes.number,
    page: PropTypes.number,
    rows: PropTypes.number,
    hasMore: PropTypes.number,
    orders: PropTypes.array,
    isLoading: PropTypes.bool,
    init: PropTypes.func,
    changeTab: PropTypes.func,
    getOrders: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      tabs: [
        {
          caption: '全部'
        },
        {
          caption: '待确认'
        },
        {
          caption: '待发货'
        },
        {
          caption: '待签收'
        },
        {
          caption: '已完成'
        },
        {
          caption: '已取消'
        },
      ],
      toastMsg: '',
      toastShow: false,
    };
  }

  componentDidMount() {
    const {history} = this.props;
    if (history.action === 'POP' && this.props.orders.length !== 0) {
      return;
    }
    this.props.init();
    setTimeout(() => {
      this.loadData(false);
    }, 100);
    // 注册给客户端调用的返回事件
    bridge.addBackPress();
  }

  componentWillUnmount() {
    // 移除给客户端调用的返回事件
    bridge.removeBackPress();
  }
  // 下拉刷新配置
  onTopRefresh = () => {
    console.log('头部刷新');
    this.loadData(false);
  }
  onBottomRefresh = () => {
    console.log('底部刷新');
    this.loadData(true);
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
  loadData = (isNext) => {
    // 分页
    let page = this.props.page;
    if (isNext) {
      page++;
    } else {
      page = 1;
      if (this.$elDrag) this.$elDrag.$el.scrollTop = 0;
    }
    const params = {
      page,
      rows: this.props.rows,
      em_order_status: '' + (this.props.activeIndex || '')
    };
    // 获得数据
    this.props.getOrders(params).then((result) => {
      if (result.code !== '1') {
        this.showMsg('单据请求失败，请稍后重试');
      }
    }).catch((err) => {
      this.showMsg('请求错误，请稍后再试');
    });
  }
  onClickBack = () => {
    const isFromApp = Device.getUrlParameter('isFromApp', this.props.location.search) || '';
    const {history} = this.props;
    if (isFromApp === '2') {
      history.goBack();
      setTimeout(() => {
        history.replace('/_react_/main/home');
      }, 100);
    } else {
      history.goBack();
    }
  }
  render() {
    const {hasMore, orders, isLoading} = this.props;
    const clickBack = bridge.platform !=='dinghuo' ? this.onClickBack : null;
    return (
      <Page>
        <Header>
          <Titlebar caption="账期使用" onClickBack={clickBack}/>
        </Header>
        <Dragrefresh ref={(el) => {this.$elDrag = el;}} style={scrollContainer} hasMore={hasMore} onTopRefresh={this.onTopRefresh} onBottomRefresh={this.onBottomRefresh}>
          <Content>
            {orders && orders.map((order, index) => {
              return <Card key={index} item={order} />
            })}
          </Content>
        </Dragrefresh>
        {isLoading && <Load style={{top: '44px'}}/>}
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle" style={{borderRadius: '4px'}}/>
        <Route path={`${this.props.match.path}/detail/:type/:orderId/:tenantId`} render={() => <OrderDetail/>} />
      </Page>
    );
  }
}
