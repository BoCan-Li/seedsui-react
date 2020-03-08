import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './instance.js';
import {createPortal} from 'react-dom';

export default class IndexBar extends Component {
  static propTypes = {
    portal: PropTypes.object,
    overflowContainer: PropTypes.any, // 滚动区域
    indexs: PropTypes.array,
  }
  static defaultProps = {
    indexs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  }
  componentDidUpdate = () => {
    const {
      portal,
      overflowContainer,
      indexs
    } = this.props;
    const parent = portal || this.$el.parentNode;
    this.instance.updateParams({
      overflowContainer: overflowContainer,
      parent: parent,
      indexs: indexs
    })
  }
  componentDidMount () {
    const {
      portal,
      overflowContainer,
      indexs
    } = this.props;
    const parent = portal || this.$el.parentNode;
    var instance = new Instance({
      overflowContainer: overflowContainer,
      parent: parent,
      indexs: indexs
    });
    this.instance = instance;
  }
  render() {
    const {
      portal,
      overflowContainer,
      indexs,
      ...others
    } = this.props;
    if (portal) {
      return createPortal(
        <div ref={el => {this.$el = el;}} {...others} className={`indexbar${others.className ? ' ' + others.className : ''}`}>
          {indexs.map((index, i) => {
            return <a href=";" key={`btn${i}`}>{index}</a>
          })}
        </div>,
        portal
      );
    }
    return (<div ref={el => {this.$el = el;}} {...others} className={`indexbar${others.className ? ' ' + others.className : ''}`}>
      {indexs.map((index, i) => {
        return <a href=";" key={`btn${i}`}>{index}</a>
      })}
    </div>);
  }
}
