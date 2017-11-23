import React, { Component } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import Children1 from './Children/Children1.jsx'

export default class About extends Component {
  render() {
    const {match} = this.props
    return (
      <div>
        <h2>子路由</h2>
        <ul>
          <li>
            <Link to={`${match.url}/参数1`}>
              子路由/参数1
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/参数2`}>
              子路由/参数2
            </Link>
          </li>
          <li>
            <Link to={`${match.url}/参数3`}>
              子路由/参数3
            </Link>
          </li>
        </ul>
    
        <Route path={`${match.url}/:topicId`} component={Children1}/>
        <Route exact path={match.url} render={() => (
          <h3>请选择一个子路由</h3>
        )}/>
      </div>
    )
  }
}
