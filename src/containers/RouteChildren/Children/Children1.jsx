import React, { Component } from 'react'

export default class Children1 extends Component {
  render() {
    const {match} = this.props
    return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    )
  }
}
