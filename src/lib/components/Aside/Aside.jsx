import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Instance from './aside.js';

export default class Aside extends Component {
  static propTypes = {
    leftAside: PropTypes.node, // 左侧边栏
    rightAside: PropTypes.node, // 右侧边栏
    children: PropTypes.node, // 主体内容
    transition: PropTypes.string // 过渡动画, overlay | push
  };

  static defaultProps = {
    transition: 'push'
  }

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }
  componentDidMount = () => {
    if (this.state.instance || (this.props.list.length === 0 && !this.props.children)) return;
    const instance = new Instance(this.$el, {
      sides: {
        left: this.$leftEl || null,
        right: this.$rightEl || null
      }
    });
    this.setState({
      instance
    });
  }
  render() {
    const {
      leftAside,
      rightAside,
      children,
      transition
    } = this.props;
    return (
      children ? <div class="aside-page" ref={el => {this.$el = el}}>
        <div class="aside-wrapper">
          {/* 主体部分 */}
          {children}
          {/* 左侧边栏 */}
          <aside class="aside" ref={el => {this.$leftEl = el}} data-transition={{transition}}>
            {leftAside}
          </aside>
          {/* 右侧边栏 */}
          <aside class="aside" ref={el => {this.$rightEl = el}} data-transition={{transition}}>
            {rightAside}
          </aside>
        </div>
      </div> : null
    );
  }
}
