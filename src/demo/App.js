import React, { Component } from 'react';
import Page from './../lib/Page';
import Header from './../lib/Header';
import Container from './../lib/Container';
import Titlebar from './../lib/Titlebar';
import Calendar from './../lib/Calendar';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }
  onChangeCalendar = (s) => {
    // 记录滑动后切换的日期
    console.log('滑动选中:' + s.activeDate.format('YYYY-MM-DD'))
  }
  onClickCalendar = (s) => {
    // 记录点击的选中日期, 用于滑动不切换日期用
    console.log('点击选中:' + s.selectedDate.format('YYYY-MM-DD'))
  }
  showMonth = () => {
    this.$calendar.instance.showMonth();
  }
  showWeek = () => {
    this.$calendar.instance.showWeek();
  }
  showToday = () => {
    this.$calendar.instance.setToday();
  }
  showReset = () => {
    this.$calendar.instance.setDefaultDate();
  }
  render() {
    const defaultDate = new Date()
defaultDate.nextMonth();
    return (
      <Page>
        <Header>
          <Titlebar caption="SeedsUI"/>
        </Header>
        <Container>
        <Calendar
  ref={el => {this.$calendar = el;}}
  type="week"
  titleFormat="YYYY年MM月DD日 周EE 第W周"
  disableBeforeDate={new Date()}
  onChange={this.onChangeCalendar}
  onClick={this.onClickCalendar}
  defaultDate={defaultDate}
/>
<a style={{margin: '8px'}} className="button lg bg-1" onClick={this.showMonth}>月</a>
<a style={{margin: '8px'}} className="button lg bg-2" onClick={this.showWeek}>周</a>
<a style={{margin: '8px'}} className="button lg bg-3" onClick={this.showToday}>今天</a>
<a style={{margin: '8px'}} className="button lg bg-4" onClick={this.showReset}>重置</a>
        </Container>
      </Page>
    );
  }
}

export default App;
