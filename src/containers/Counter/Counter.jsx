import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setCount } from 'store/modules/counter.js'
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
  onIncreaseClick = (e) => {
    this.props.setCount(6)
  }
  render() {
    const { value } = this.props
    return (
      <div>
        <h2>Redux</h2>
        <span>{value}</span>
        <button onClick={this.onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
export default Counter
