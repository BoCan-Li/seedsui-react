import React, { Component } from 'react';
import Page from '../lib/Page';
import Header from '../lib/Header';
import Titlebar from '../lib/Titlebar';
import Container from '../lib/Container';
import Dropdown from '../lib/Dropdown';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{"id":"","name":"分类","data":[{"id":"","name":"全部","children":[]},{"id":"7938034417512813758","name":"饮料","children":[{"id":"4622400720177680517","name":"碳酸饮料"},{"id":"5800049423243362222","name":"茶饮料"},{"id":"5789432343240798823","name":"功能饮料"},{"id":"6413548566139705252","name":"饮用水"},{"id":"6936207795217715766","name":"中草药饮料"},{"id":"8746408135758103957","name":"蛋白质饮料"},{"id":"7268945622944992066","name":"果味饮料"},{"id":"9138462844675316911","name":"咖啡"}]},{"id":"7746459719734369628","name":"零食","children":[{"id":"9134066222295231258","name":"蜜饯果干"},{"id":"5394487194098598325","name":"坚果炒货"},{"id":"9070533848545878912","name":"早餐面包"},{"id":"5240328190253910837","name":"糖巧果冻"}]}]},{"id":"","name":"品牌","data":[{"id":"","name":"全部"},{"id":"其他","name":"其他"},{"id":"美汁源","name":"美汁源"},{"id":"可口","name":"可口"},{"id":"宏宝莱","name":"宏宝莱"},{"id":"康师傅","name":"康师傅"},{"id":"百事","name":"百事"},{"id":"卫岗","name":"卫岗"},{"id":"蒙牛","name":"蒙牛"},{"id":"伊利","name":"伊利"},{"id":"三只松鼠","name":"三只松鼠"}]},{"id":"","name":"筛选","data":[{"id":"","name":"全部"},{"id":"new","name":"新品"},{"id":"importance","name":"重点"}]}]
    };
  }
  componentDidMount() {
  }
  onChangeDropdown = (tabs) => {
    var items = Object.clone(this.state.items);
    tabs.forEach((item, index) => {
      items[index].id = item.id;
      items[index].name = item.name;
    });
    this.setState({
      items: items
    })
  }
  onChange = () => {
    this.setState({
      items: [{"id":"","name":"类别","data":[{"id":"","name":"全部","children":[]},{"id":"7938034417512813758","name":"饮料","children":[{"id":"4622400720177680517","name":"碳酸饮料"},{"id":"5800049423243362222","name":"茶饮料"},{"id":"5789432343240798823","name":"功能饮料"},{"id":"6413548566139705252","name":"饮用水"},{"id":"6936207795217715766","name":"中草药饮料"},{"id":"8746408135758103957","name":"蛋白质饮料"},{"id":"7268945622944992066","name":"果味饮料"},{"id":"9138462844675316911","name":"咖啡"}]},{"id":"7746459719734369628","name":"零食","children":[{"id":"9134066222295231258","name":"蜜饯果干"},{"id":"5394487194098598325","name":"坚果炒货"},{"id":"9070533848545878912","name":"早餐面包"},{"id":"5240328190253910837","name":"糖巧果冻"}]}]},{"id":"","name":"品牌","data":[{"id":"","name":"全部"},{"id":"其他","name":"其他"},{"id":"美汁源","name":"美汁源"},{"id":"可口","name":"可口"},{"id":"宏宝莱","name":"宏宝莱"},{"id":"康师傅","name":"康师傅"},{"id":"百事","name":"百事"},{"id":"卫岗","name":"卫岗"},{"id":"蒙牛","name":"蒙牛"},{"id":"伊利","name":"伊利"},{"id":"三只松鼠","name":"三只松鼠"}]},{"id":"","name":"筛选","data":[{"id":"","name":"全部"},{"id":"new","name":"新品"},{"id":"importance","name":"重点"}]}]
    })
  }
  render() {
    return <Page>
      <Header>
        <Titlebar caption="SeedsUI" backIconStyle={{ borderColor: 'red' }} backCaption="返回" />
        <Dropdown list={this.state.items} onChange={this.onChangeDropdown}/>
      </Header>
      <Container>
        <input type="button" value="切换" onClick={this.onChange}/>
      </Container>
    </Page>
  }
};
