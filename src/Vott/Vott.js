import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class Vott extends Component {
  static propTypes = {
    src: PropTypes.string,
    onChange: PropTypes.func
  }
  static defaultProps = {
  }
  constructor(props) {
    super(props);
  }
  instance = () => {
    const instance = new Instance(this.$el, {
      onChange: this.props.onChange
    });
    this.instance = instance;
  }
  componentDidMount () {
    this.instance()
  }
  render() {
    const {
      src,
      onChange,
      ...others
    } = this.props;
    return (
      <div className="vott-container" {...others} ref={(el) => {this.$el = el}}>
      </div>
    );
  }
}
