import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './imglazy.js';

export default class ImgLazy extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  componentDidMount () {
    if (this.state.instance) return
    var instance = new Instance({
      overflowContainer: this.$el
    });
    this.setState({
      instance
    });
  }
  render() {
    const { style, className, children } = this.props;
    return (
      <div ref={el => {this.$el = el;}} className={className} style={style}>
        { children }
      </div>
    );
  }
}
