import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Container from '../lib/Container';
import Titlebar from '../lib/Titlebar';
// import Loading from '../lib/Loading';
import Dropdown from '../lib/Dropdown';
import MenuTree from '../lib/MenuTree';

const MenuTreeStyle = {
  position: 'absolute',
  top: '300px',
  left: '0',
  bottom: '0'
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0'
    }
  }
  componentDidMount() {
  }
  onClick = (item, isActived, extandStatus, childrenCount) => {
    console.log(item, isActived, extandStatus, childrenCount)
  }
  onChange = (value) => {
    this.setState({
      value
    })
  }
  changeDate = () => {
    this.setState({
      value: '2018-08-08'
    })
  }
  onHide = () => {
    this.setState({
      show: false
    })
  }
  render() {
    const list = [{"id":"-1","show_order":-1,"caption":"全部","children":[],"parent_id":"-2"},{"id":"5884112927677396749","show_order":0,"caption":"百饮","children":[],"parent_id":"-1"},{"id":"5170817935962998220","show_order":0,"caption":"业务","children":[],"parent_id":"-1"},{"id":"5560958318574727662","show_order":1,"caption":"PET中包装","children":[],"parent_id":"-1"},{"id":"9199989753697871223","show_order":2,"caption":"乘用车","children":[{"id":"8182192418836738254","show_order":0,"caption":"家轿","parent_id":"9199989753697871223"},{"id":"4719934568248841585","show_order":0,"caption":"SUV","parent_id":"9199989753697871223"}],"parent_id":"-1"},{"id":"6381663369076352142","show_order":3,"caption":"康师傅方便面","children":[{"id":"6162698864252245743","show_order":0,"caption":"经典袋面单包","parent_id":"6381663369076352142"},{"id":"4878138732125492161","show_order":0,"caption":"杯面","parent_id":"6381663369076352142"},{"id":"9006409737235548571","show_order":0,"caption":"开心桶","parent_id":"6381663369076352142"},{"id":"4753429730191617176","show_order":0,"caption":"高汤","parent_id":"6381663369076352142"},{"id":"8025475447269485158","show_order":0,"caption":"大食袋","parent_id":"6381663369076352142"},{"id":"6848161054921512588","show_order":0,"caption":"经典五连","parent_id":"6381663369076352142"}],"parent_id":"-1"},{"id":"1","show_order":4,"caption":"香烟","children":[],"parent_id":"-1"},{"id":"6321208477511373988","show_order":5,"caption":"CAN拉罐","children":[],"parent_id":"-1"}];
    const dropdownList = [{caption: 'haha', data: list}]
    return <Page style={{ backgroundColor: 'white' }}>
      <Header>
        <Titlebar caption="SeedsUI" rButtons={[{ caption: 'haha' , onClick: this.showDialog}]} />
        <Dropdown list={dropdownList}/>
      </Header>
      <Container>
        {/* <Loading type="custom" iconSrc="//res.waiqin365.com/d/dinghuo365/loading.gif" style={{position: 'absolute', top: '44px', left: '96px', bottom: '54px', right: '0', backgroundColor: 'white'}}/> */}
        <MenuTree list={list} style={MenuTreeStyle} onClick={this.onClick}/>
      </Container>
    </Page>
  }
};
