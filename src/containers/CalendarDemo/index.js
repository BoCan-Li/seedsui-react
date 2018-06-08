import React, { Component } from 'react';
import Page from 'components/seedsui/Page';
import Header from 'components/seedsui/Header';
import Titlebar from 'components/seedsui/Titlebar';
import Container from 'components/seedsui/Container';
import Calendar from 'components/seedsui/Calendar';
import Button from 'components/seedsui/Button';
import Toast from 'components/seedsui/Toast';

export default class CalendarDemo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      toastMsg: '',
      toastShow: false,
    }
  }
  componentDidMount = () => {
  }
  componentWillUnmount() {
  }
  month = () => {
    this.$calendar.state.instance.showMonth();
  }
  week = () => {
    this.$calendar.state.instance.showWeek();
  }
  today = () => {
    this.$calendar.state.instance.showToday();
  }
  reset = () => {
    this.$calendar.state.instance.reset();
  }
  onCalendarChange = (e) => {
    console.log('激活时期:' + e.activeDate.toLocaleDateString())
    console.log('点击后选中的日期:' + e.selectedDate.toLocaleDateString())
  }
  onCalendarError = (msg) => {
    this.showMsg(msg);
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
        <Header>
          <Titlebar caption="日历"/>
        </Header>
        <Container>
            <Calendar ref={(el) => {this.$calendar = el;}} showTitleWeek showTitleWeeks disableBeforeDate={new Date('2018-03-03')} disableAfterDate={new Date('2018-10-09')} defaultDate={new Date('2018-08-08')} onChange={this.onCalendarChange} onError={this.onCalendarError}/>
            <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.today}>今天</Button>
            <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.month}>月</Button>
            <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.week}>周</Button>
            <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.reset}>重置</Button>
        </Container>
        <Toast caption={this.state.toastMsg} show={this.state.toastShow} position="middle"/>
      </Page>
    )
  }
}
