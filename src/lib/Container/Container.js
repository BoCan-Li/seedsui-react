import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgLazyInstance from './../ImgLazy/instance.js';

export default class Container extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    lazyLoad: PropTypes.bool,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    if (this.props.lazyLoad) {
      var imglazy = new ImgLazyInstance({
        overflowContainer: this.$el
      });
      imglazy.load();
    }
  }
  render() {
    const {style, className, lazyLoad, children, ...others} = this.props;
    return (
      <article ref={el => {this.$el = el;}} className={'container' + (className ? ' ' + className : '')} style={style} {...others}>
        {children}
      </article>
    );
  }
}
