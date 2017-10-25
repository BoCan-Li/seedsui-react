import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class About extends Component {
  static propTypes = {
    name: PropTypes.string,
  }

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        About
      </div>
    )
  }
}
