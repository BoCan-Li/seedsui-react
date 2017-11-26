import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Page from 'components/seedsui/Page/Page.jsx';
import Header from 'components/seedsui/Page/Header.jsx';
import Titlebar from 'components/seedsui/Titlebar/Titlebar.jsx';
import Container from 'components/seedsui/Page/Container.jsx';
import Info from './Info.js';
import { getPay } from 'store/modules/pay';

@connect(state => ({
  isLoading: state.pay.isLoading,
  info: state.pay.info,
  balance: state.pay.balance,
  isOnlinePay: state.pay.isOnlinePay,
  payType: state.pay.payType
}), {
  getPay
})
export default class Pay extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    info: PropTypes.array,
    balance: PropTypes.number,
    isOnlinePay: PropTypes.bool,
    payType: PropTypes.array,
    getPay: PropTypes.func
  }
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
    this.props.getPay();
  }
  render() {
    const {info} = this.props;
    return (
      <Page>
        <Header>
          <Titlebar title="进货单支付"/>
        </Header>
        <Container>
          <Info list={info}/>
        </Container>
      </Page>
    );
  }
}
