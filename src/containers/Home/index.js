import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getData, setLoading} from 'store/modules/home.js'
import { push, replace } from './../../react-router-redux/'

@connect(state => ({
  router: state.routing,
  data: state.home.data,
  isLoading: state.home.isLoading
}), {
  onPush: push,
  onReplace: replace,
  getData,
  setLoading
})
export default class Home extends Component {
  static propTypes = {
    router: PropTypes.object,
    onPush: PropTypes.func.isRequired,
    onReplace: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    getData: PropTypes.func,
    setLoading: PropTypes.func
  }
  constructor (props) {
    super(props);
    console.log(props.router)
  }
  componentDidMount = () => {
    this.props.getData().then((result) => {
      console.log('结果');
      console.log(result)
    }).catch((err) => {
      console.log('错误');
      console.log(err);
    })
  }
  onClickJump = () => {
    this.props.onPush('http://www.baidu.com/')
  }
  render() {
    const {isLoading, data} = this.props;
    return (
      <div>
        加载情况:{isLoading.toString()}
        <br/>
        数据情况:{JSON.stringify(data)}
        <input type="button" value="设置isLoading" onClick={this.props.setLoading}/>
        <input type="button" value="跳转到百度" onClick={this.onClickJump}/>
      </div>
    );
  }
}
