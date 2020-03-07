import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';

export default class IndexBar extends Component {
  static propTypes = {
    overflowContainer: PropTypes.any, // 滚动区域
    parent: PropTypes.any, // DOM注入容器
    indexs: PropTypes.array,
  }
  static defaultProps = {
    indexs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  }
  componentDidUpdate = () => {
    const {
      overflowContainer,
      parent,
      indexs
    } = this.props;
    const $overflowContainer = overflowContainer || this.$el.parentNode;
    this.instance.updateParams({
      overflowContainer: $overflowContainer,
      parent: parent || document.body,
      indexs: indexs
    })
  }
  componentDidMount () {
    const {
      overflowContainer,
      parent,
      indexs
    } = this.props;
    const $overflowContainer = overflowContainer || this.$el.parentNode;
    var instance = new Instance({
      overflowContainer: $overflowContainer,
      parent: parent || document.body,
      indexs: indexs
    });
    this.instance = instance;
  }
  render() {
    const {
      overflowContainer,
      parent,
      indexs,
      ...others
    } = this.props;
    return (<div ref={el => {this.$el = el;}} {...others} className={`indexbar${others.className ? ' ' + others.className : ''}`}>
      {indexs.map((index, i) => {
        return <a href=";" key={`btn${i}`}>{index}</a>
      })}
    </div>);
  }
}
