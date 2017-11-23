import React, { Component } from 'react'

export default class About extends Component {
  render() {
    const {match} = this.props
    return (
      <div>
        <h2>About{`${match.params.id}`}</h2>
      </div>
    )
  }
}
