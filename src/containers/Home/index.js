import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getData, setLoading} from 'store/modules/home.js'
import { withRouter } from 'react-router'

@withRouter
@connect(state => ({
  data: state.home.data,
  isLoading: state.home.isLoading
}), {
  getData,
  setLoading
})
export default class Home extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    getData: PropTypes.func,
    setLoading: PropTypes.func
  }
  constructor (props) {
    super(props);
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
    // const { match, location, history } = this.props
    const { history } = this.props
    history.push('/about')
  }
  render() {
    const {isLoading, data} = this.props;
    return (
      <div>
        加载情况:{isLoading.toString()}
        <br/>
        数据情况:{JSON.stringify(data)}
        <input type="button" value="设置isLoading" onClick={this.props.setLoading}/>
        <input type="button" value="路由跳转" onClick={this.onClickJump}/>
      </div>
    );
  }
}
