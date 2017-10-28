import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
// components
import '@/components/seedsui/seedsui-core.less'
import {
  Page
} from '@/components/seedsui/seedsui.js'
// views
import About from '@/views/About/About.js'
import Counter from '@/views/Counter/Counter.js'

export default class Home extends Component {
  static propTypes = {
    children: PropTypes.node
  }
  constructor(props, context) {
    super(props, context)
  }
  render() {
    const { match } = this.props
    return (
      <div>
        <Page className="active">
          Home
          <Route path={`${match.url}/about/:id`} component={About}/>
          <Route path="counter" component={Counter}/>
        </Page>
      </div>
    )
  }
}
