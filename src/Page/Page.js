import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Page extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
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
    const {animation, style, className, children, ...others} = this.props;
    return (
      <section ref={(el) => {this.$el = el}} className={'page' + (className ? ' ' + className : '')} data-animation={animation} style={style} {...others}>
        {children}
      </section>
    );
  }
}
