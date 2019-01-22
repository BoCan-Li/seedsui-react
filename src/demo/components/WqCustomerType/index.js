import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Page from 'seedsui-react/lib/Page';
import Header from 'seedsui-react/lib/Header';
import Titlebar from 'seedsui-react/lib/Titlebar';
import Tabbar from 'seedsui-react/lib/Tabbar';
import Container from 'seedsui-react/lib/Container';
import Tree from 'seedsui-react/lib/Tree';
import Loading from 'seedsui-react/lib/Loading';
import ApiAxios from 'seedsui-react/lib/ApiAxios';
import Bridge from 'seedsui-react/lib/Bridge';
import Carrousel from 'seedsui-react/lib/Carrousel';

export default class WqCustomerType extends Component {
  static propTypes = {
    url: PropTypes.string,
    tradeType: PropTypes.string, // 3门店,2经销商,不传都显示
    multiple: PropTypes.bool, // 是否需要多选
    selectedIds: PropTypes.string, // 传入选中的id集合
    syncData: PropTypes.func, // 'error', args
  };
  static defaultProps = {
    url: '/component/getComponentData.action'
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      tabActiveIndex: 0,
      supplierList: [],
      customerList: []
    };
  }
  componentDidMount = () => {
    const {tradeType} = this.props;
    if (!this.state.customerList.length && !this.state.supplierList.length) {
      if (tradeType === '2') {
        this.loadSupplierData();
      } else if (tradeType === '3') {
        this.loadCustomerData();
      } else {
        this.loadCustomerData();
      }
    }
  }
  componentWillUnmount() {
  }
  onSubmit = () => {
    let customerSelected = this.$customerTree.instance.selected;
    let supplierSelected = this.$supplierTree.instance.selected;
    let selected = {};
    selected = Object.assign(customerSelected, supplierSelected)
    const {syncData} = this.props;
    if (syncData) syncData('', selected);
    history.go(-1);
  }
  // 加载经销商列表
  loadSupplierData = () => {
    this.loadData('2');
  }
  // 加载门店列表
  loadCustomerData = () => {
    this.loadData('3');
  }
  // 加载数据
  loadData = (argTradeType) => {
    this.setState({
      isLoading: true
    });
    const {url} = this.props;
    const tradeType = argTradeType || '3';
    const data =  {typeCode: 'customer_type', paramValue: {trade_type: tradeType}};
    ApiAxios.post(url, {
      data: Object.params(data, 'bracket'),
      head: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(result => {
      if (result.code === '1') {
        if (result.data && !Object.isEmptyObject(result.data)) {
          let data = JSON.stringify(result.data).replace(/parent_id/mgi,"parentid");
          data = JSON.parse(data);
          this.setState({
            [tradeType === '3' ? 'customerList' : 'supplierList']: data
          })
        }
      } else {
        Bridge.showToast(result.message, {mask: false});
      }
      this.setState({
        isLoading: false
      })
    }).catch(() => {
      Bridge.showToast('请求客户类型异常, 请稍后重试', {mask: false});
      this.setState({
        isLoading: false
      })
    });
  }
  getSelectedList = () => {
    if (!this.props.multiple) return [];
    const selectedList = [];
    const {selectedIds} = this.props;
    const {list} = this.state;
    if (selectedIds && list.length) {
      for (var item of list) {
        for (var id of selectedIds.split(',')) {
          if (item.id === id) {
            selectedList.push({
              id: item.id,
              name: item.name,
              parentid: item.parentid
            })
          }
        }
      }
    }
    return selectedList;
  }
  onClickAdd = () => {
    if (!this.props.multiple) this.onSubmit();
  }
  // 切换tab页
  onCarrouselChange = (e) => {
    this.setState({
      tabActiveIndex: e.activeIndex
    })
    if (e.activeIndex === 1) {
      if (!this.supplierLoaded) {
        this.loadSupplierData(false);
        this.supplierLoaded = true;
      }
    }
  }
  onClickTab = (item) => {
    let tabActiveIndex = 0;
    if (item.id === '2') {
      tabActiveIndex = 1;
    }
    this.setState({
      tabActiveIndex
    })
  }
  render() {
    const {tradeType} = this.props;
    let tabbar = null;
    if (!tradeType) {
      tabbar = [
        {
          id: '3',
          caption: '门店'
        },
        {
          id: '2',
          caption: '经销商'
        }
      ]
    }
    const {tabActiveIndex, isLoading, supplierList, customerList} = this.state;
    const selectedList = this.getSelectedList();
    return createPortal(
      <Page style={{zIndex: '2'}}>
        <Header>
          <Titlebar caption="选择客户类型" rButtons={!isLoading && this.props.multiple ? [{caption: '确定', onClick: this.onSubmit}] : []}/>
          {tabbar && <Tabbar list={tabbar} activeIndex={tabActiveIndex} onClick={this.onClickTab}/>}
        </Header>
        {/* style={{top: tabbar ? '84px' : '44px'}} */}
        <Container>
          <Carrousel onChange={this.onCarrouselChange} activeIndex={tabActiveIndex}>
            {(!tradeType || tradeType === '3') && <Tree ref={el => {this.$customerTree = el;}} list={customerList} selected={selectedList} checkbox onClickAdd={this.onClickAdd}/>}
            {(!tradeType || tradeType === '2') && <Tree ref={el => {this.$supplierTree = el;}} list={supplierList} selected={selectedList} checkbox onClickAdd={this.onClickAdd}/>}
          </Carrousel>
        </Container>
        {isLoading && <Loading style={{top: '44px'}}/>}
      </Page>,
      document.getElementById('root')
    );
  }
}
