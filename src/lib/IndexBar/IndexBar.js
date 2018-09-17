import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class IndexBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    indexs: PropTypes.array,
  }
  static defaultProps = {
    indexs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    }
  }
  componentDidMount () {
    const parent = this.$el.parentNode;
    var instance = new Instance(parent);
    this.setState({
      instance
    });
  }
  render() {
    const {indexs, className, style} = this.props;
    return (<div ref={el => {this.$el = el;}} className={`indexbar${className ? ' ' + className : ''}`} style={style}>
      {indexs.map((index, i) => {
        return <a key={`btn${i}`}>{index}</a>
      })}
    </div>);
  }
}
