import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    animation: PropTypes.string,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount () {
  }
  render() {
    const {animation, children, ...others} = this.props;
    return (
      <section ref={(el) => {this.$el = el}} {...others} className={'page' + (others.className ? ' ' + others.className : '')} data-animation={animation}>
        {children}
      </section>
    );
  }
}
