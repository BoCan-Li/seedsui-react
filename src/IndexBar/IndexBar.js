import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class IndexBar extends Component {
  static propTypes = {
    overflowContainer: PropTypes.any, // 滚动区域
    parent: PropTypes.any, // DOM注入容器
    className: PropTypes.string,
    style: PropTypes.object,
    indexs: PropTypes.array,
  }
  static defaultProps = {
    indexs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  }
  constructor(props) {
    super(props);
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.overflowContainer !== prevProps.overflowContainer) {
      this.instance.setOverflowContainer(this.props.overflowContainer);
    }
  }
  componentDidMount () {
    const overflowContainer = this.$el.parentNode;
    var instance = new Instance({
      overflowContainer: this.props.overflowContainer || overflowContainer,
      parent: this.props.parent || document.body
    });
    this.instance = instance;
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
