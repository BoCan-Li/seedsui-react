import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './page.less'

export default class NoWifi extends Component {
  static propTypes = {
    css: PropTypes.object,
    className: PropTypes.string
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { css, className } = this.props;
    return (
      <section className={'page' + (className?' '+className:'')} style={css}>
        { this.props.children }
      </section>
    );
  }
}
