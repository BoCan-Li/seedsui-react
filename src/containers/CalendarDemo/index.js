import React, { Component } from 'react';
import Page from 'components/seedsui/Page';
import Header from 'components/seedsui/Header';
import Titlebar from 'components/seedsui/Titlebar';
import Container from 'components/seedsui/Container';
import Calendar from 'components/seedsui/Calendar';
import Button from 'components/seedsui/Button';

export default class CalendarDemo extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
    var date = new Date();
    var data = date.getPrevDate(3);
    console.log(data)
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
  render() {
    return (
      <Page>
        <Header>
          <Titlebar caption="日历"/>
        </Header>
        <Container>
            <Calendar ref={(el) => {this.$calendar = el;}} showTitleWeek showTitleWeeks disableBeforeDate={new Date()} disableAfterDate={new Date('2018-09-09')}/>
            <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.today}>今天</Button>
            <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.month}>月</Button>
            <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.week}>周</Button>
            <Button className="block primary spacemargin-lg wingmargin-lg" onClick={this.reset}>重置</Button>
        </Container>
      </Page>
    )
  }
}
