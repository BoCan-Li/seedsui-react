import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgLazy from './../ImgLazy';

export default class Container extends Component {
  static propTypes = {
    lazyLoad: PropTypes.bool,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    if (this.props.lazyLoad) {
      this.lazyLoadInstance =  new ImgLazy({
        overflowContainer: this.$el
      });
      this.lazyLoadInstance.load();
    }
  }
  render() {
    const {
      lazyLoad,
      children,
      ...others
    } = this.props;
    return (
      <article ref={el => {this.$el = el;}} {...others} className={`container${others.className ? ' ' + others.className : ''}`}>
        {children}
      </article>
    );
  }
}
