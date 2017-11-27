import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getData} from 'store/modules/home.js'

@connect(state => ({
  data: state.home.data,
  isLoading: state.home.isLoading
}), {
  getData
})
export default class Home extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    getData: PropTypes.func
  }
  componentDidMount = () => {
    this.props.getData()
  }
  render() {
    const {isLoading, data} = this.props;
    return (
      <div>
        加载情况:{isLoading.toString()}
        <br/>
        数据情况:{JSON.stringify(data)}
      </div>
    );
  }
}
