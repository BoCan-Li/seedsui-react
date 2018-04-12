import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'containers/Order/Card';
import Load from 'components/Load';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { getOrders, initData } from 'store/modules/orderSearch';
import bridge from 'components/seedsui/utils/bridge';
import Page from 'components/seedsui/Page/Page.jsx';
import Header from 'components/seedsui/Header/Header.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import SearchBar from 'components/seedsui/SearchBar/SearchBar.jsx';
import SearchBoard from 'components/seedsui/SearchBoard/SearchBoard.jsx';
import Container from 'components/seedsui/Container/Container.jsx';
import Dragrefresh from 'components/seedsui/Dragrefresh/Dragrefresh.jsx';
import Toast from 'components/seedsui/Toast/Toast.jsx';

const scrollContainer = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  overflow: 'auto',
};

const Content = styled.div`
  margin-bottom: 10px;
`;

@withRouter
@connect(state => ({
  page: state.orderSearch.page,
  rows: state.orderSearch.rows,
  hasMore: state.orderSearch.hasMore,
  orders: state.orderSearch.orders,
  isLoading: state.orderSearch.isLoading,
}), {
  getOrders,
  initData,
})

export default class Search extends Component {
  static propTypes = {
    orders: PropTypes.array,
    page: PropTypes.number,
    rows: PropTypes.number,
    hasMore: PropTypes.number,
    getOrders: PropTypes.func,
    initData: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      toastMsg: '',
      toastShow: false,
      searchValue: '',
      searchDate: '',
      otherTitle: '常用查询日期',
      others: [
        {key: 'YESTERDAY', value: '昨天'},
        {key: 'TODAY', value: '今天'},
        {key: 'THIS_WEEK', value: '本周'},
        {key: 'THIS_MONTH', value: '本月'},
        {key: 'LAST_3_DAYS', value: '最近3天'},
        {key: 'LAST_7_DAYS', value: '最近7天'},
        {key: 'LAST_30_DAYS', value: '最近30天'},
      ]
    };
  }

  componentDidMount() {
    // 注册给客户端调用的返回事件
    bridge.addBackPress();
    const {history} = this.props;
    if (history.action === 'POP') return;
    this.props.initData();
  }

  componentWillUnmount() {
    // 移除给客户端调用的返回事件
    bridge.removeBackPress();
  }
  // 下拉刷新配置
  /* onTopRefresh = () => {
    console.log('头部刷新');
    this.loadData(false);
  } */
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
  // 点击历史记录其它
  clickOther = (item) => {
    this.setState({searchDate: item.key});
    setTimeout(() => {
      this.loadData(false);
    }, 100);
  }
  searchOrders = (value) => {
    this.setState({searchValue: value});
    if (this.$historySearch) this.$historySearch.add({key: value, value: value});
    setTimeout(() => {
      this.loadData(false);
    }, 100);
  }
  loadData = (isNext) => {
    // 分页
    let page = this.props.page;
    if (isNext) {
      page++;
    } else {
      page = 1;
    }
    const params = {
      page,
      rows: this.props.rows
    };
    if (this.state.searchValue) {
      params.search_key = this.state.searchValue;
    } else if (this.state.searchDate) {
      params.search_date_tag = this.state.searchDate;
    }
    // 获得数据
    this.props.getOrders(params).then((result) => {
      if (result.code !== '1') {
        this.showMsg('单据请求失败，请稍后重试');
      }
    }).catch((err) => {
      this.showMsg('请求错误，请稍后再试');
    });
  }
  goBack = () => {
    const {history} = this.props;
    history.goBack();
  }
  render() {
    const { orders, hasMore, isLoading } = this.props;
    return (
      <Page>
        <Header style={{backgroundColor: 'white'}}>
          <Titlebar className="flexbox border-b" lButtons={[]} rButtons={[{caption: '取消', style: {color: '#666'}, onClick: this.goBack}]}>
            <SearchBar placeholder={'商品名称/单据编号'} value={this.state.searchValue} className="border-b" onSubmit={this.searchOrders} style={{marginLeft: '12px'}}/>
          </Titlebar>
        </Header>
        <Container>
        <SearchBoard showValidTags={false} expandCaption={this.state.otherTitle} expandTags={this.state.others} show={orders.length === 0 && !this.state.searchValue && !this.state.searchDate} ref={(el) => {this.$historySearch = el;}} dbKey="app_history_search_orders" onClick={(item) => {this.searchOrders(item.value);}} onClickExpand={(item) => {this.clickOther(item);}}/>
        {(orders.length > 0 || this.state.searchValue || this.state.searchDate) && <Dragrefresh noDataCaption="没有找到相关单据" hasMore={hasMore} style={scrollContainer} onBottomRefresh={this.onBottomRefresh}>
          <Content>
            {orders && orders.map((order, index) => (
              <Card key={index} item={order} />
            ))}
          </Content>
        </Dragrefresh>}
        </Container>
        { isLoading && <Load style={{top: '44px'}}/>}
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle" style={{borderRadius: '4px'}}/>
      </Page>
    );
  }
}
