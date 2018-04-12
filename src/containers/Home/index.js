import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getMenus} from 'store/modules/home';
import Page from 'components/seedsui/Page/Page.jsx';
import Container from 'components/seedsui/Container/Container.jsx';
import Toast from 'components/seedsui/Toast/Toast.jsx';
import Loading from 'components/seedsui/Loading/Loading.jsx';
import Grid from 'components/seedsui/Grid/Grid.jsx';
import Group from 'components/seedsui/Group/Group.jsx';
import bridge from 'components/seedsui/utils/bridge';

@withRouter
@connect(state => ({
  isLoading: state.home.isLoading,
  menus: state.home.menus,
}), {
  getMenus
})

export default class Home extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    menus: PropTypes.array,
    getMenus: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      toastMsg: '',
      toastShow: false
    };
  }
  componentDidMount = () => {
    // 初始化
    this.loadData();
    // 注册给客户端调用的返回事件
    bridge.addBackPress();
  }
  componentWillUnmount() {
    // 移除给客户端调用的返回事件
    bridge.removeBackPress();
  }
  loadData = () => {
    // 获得数据
    this.props.getMenus().then((result) => {
      if (result.code !== '1') {
        this.showMsg(result.message);
      }
    }).catch((err) => {
      this.showMsg('请求错误，请稍后再试');
    });
  }
  showMsg = (msg) => {
    if (this.timeout) window.clearTimeout(this.timeout);
    this.setState({
      toastMsg: msg,
      toastShow: true
    });
    this.timeout = setTimeout(() => {
      this.setState({
        toastShow: false
      });
    }, 2000);
  }
  render() {
    const {menus, isLoading} = this.props;
    return (
      <Page>
        <Container>
          <div style={{padding: '30px 0 24px 0'}}>
            <p style={{textAlign: 'center', fontSize: '60px', padding: ''}}>SEEDSUI</p>
            <p className="color-sub text-center">全世界最好最全的react移动端开发UI框架</p>
          </div>
          <Group>
            <Grid list={menus} iconClassName="size45" className="grid-bordered"/>
          </Group>
        </Container>
        {isLoading && <Loading style={{top: '44px', backgroundColor: 'white'}}/>}
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle" style={{borderRadius: '4px'}}/>
      </Page>
    )
  }
}