import React, { Component } from 'react';
import {withRouter} from 'react-router';
import Page from 'components/seedsui/Page';
import Container from 'components/seedsui/Container';
import Toast from 'components/seedsui/Toast';
import Grid from 'components/seedsui/Grid';
import Group from 'components/seedsui/Group';
import menus from './menus';

@withRouter
export default class Home extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
  }
  componentWillUnmount() {
  }
  onClickMenu = (item) => {
    const {history} = this.props;
    if (item.url) history.push(item.url);
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
    return (
      <Page>
        <Container>
          <div style={{padding: '30px 0 24px 0'}}>
            <p style={{textAlign: 'center', fontSize: '60px', padding: ''}}>SEEDSUI</p>
            <p className="color-sub text-center">全世界最好最全的react移动开发框架</p>
          </div>
          <Group>
            <Grid list={menus} onClickCell={this.onClickMenu} iconClassName="size45" className="grid-bordered"/>
          </Group>
        </Container>
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle" style={{borderRadius: '4px'}}/>
      </Page>
    )
  }
}
