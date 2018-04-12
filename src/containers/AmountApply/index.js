import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getDetail} from 'store/modules/amountApply';
import Page from 'components/seedsui/Page/Page.jsx';
import Header from 'components/seedsui/Header/Header.jsx';
import Container from 'components/seedsui/Container/Container.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import Toast from 'components/seedsui/Toast/Toast.jsx';
import Button from 'components/seedsui/Button/Button.jsx';
import Load from 'components/Load';
import bridge from 'components/seedsui/utils/bridge';

const centerMiddleStyle = {
  position: 'absolute',
  top: '40%',
  width: '100%',
  WebkitTransform: 'translateY(-50%)'
}

@withRouter
@connect(state => ({
  isLoading: state.amountApply.isLoading,
  detail: state.amountApply.detail,
}), {
  getDetail
})

export default class AmountApply extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    detail: PropTypes.object,
    getDetail: PropTypes.func,
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
  loadData = (isNext) => {
    // 获得数据
    this.props.getDetail({orderId: this.props.match.params.orderId}).then((result) => {
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
    const {detail, isLoading} = this.props;
    const approval_status = '1';
    return (
      <Page>
        <Header>
          <Titlebar caption="账期额度申请"/>
        </Header>
        <Container>
          {/* 0:初审未通过 */}
          {approval_status === '0' && <div style={centerMiddleStyle}>
            <div style={{textAlign: 'center', color: '#666'}}>如需申请授信额度,<br/>请联系您的客户经理</div>
            <div style={{fontSize: '18px', marginTop: '20px', textAlign: 'center'}}>汪强</div>
            <a href="tel:13801234567" style={{display: 'block', fontSize: '24px', textAlign: 'center', marginTop: '8px', color: 'black'}}>13801234567</a>
          </div>}
          {/* 2:可贷款 */}
          {approval_status === '2' && <div style={centerMiddleStyle}>
            <div style={{textAlign: 'center', color: '#666'}}>审批状态：可贷款</div>
            <div style={{textAlign: 'center', marginTop: '4px', color: '#666'}}>您的当前可用授信额度（元）</div>
            <div style={{fontSize: '24px', marginTop: '20px', textAlign: 'center'}}>80,000.00</div>
            <div style={{fontSize: '18px', textAlign: 'center', marginTop: '8px'}}>总额度：200,000.00</div>
          </div>}
          {/* 3:不可贷款 */}
          {approval_status === '3' && <div style={centerMiddleStyle}>
            <div style={{textAlign: 'center', color: '#666'}}>审批状态：不可贷款</div>
            <div style={{textAlign: 'center', marginTop: '4px', color: '#666'}}>您的当前可用授信额度（元）</div>
            <div style={{fontSize: '24px', marginTop: '20px', textAlign: 'center'}}>0.00</div>
            <div style={{fontSize: '18px', textAlign: 'center', marginTop: '8px'}}>总额度：0.00</div>
          </div>}
          {/* 1:通过初审且未提交授信额度申请 */}
          {approval_status === '1' && <div style={centerMiddleStyle}>
            <div style={{textAlign: 'center', color: '#666'}}>您已通过初审</div>
            <Button className="block" style={{margin: '12px 60px'}}>立即申请</Button> 
          </div>}
        </Container>
        {isLoading && <Load style={{top: '44px', backgroundColor: 'white'}}/>}
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle" style={{borderRadius: '4px'}}/>
      </Page>
    )
  }
}
