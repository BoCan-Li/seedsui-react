import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setCount } from '@/store/modules/counter.js'
import './counter.less'
// React component
@connect(state => ({
  value: state.counter.count
}), {
  setCount: setCount
})
class Counter extends Component {
  static propTypes = {
    value: PropTypes.number,
    setCount: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.onIncreaseClick = this.onIncreaseClick.bind(this);
  }
  onIncreaseClick (e) {
    this.props.setCount(6)
  }
  render() {
    const { value } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={this.onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
export default Counter
