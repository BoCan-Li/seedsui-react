import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from './../Page';
import Instance from './instance.js';

export default class PagePull extends Component {
  static propTypes = {
    // Page
    children: PropTypes.node,
    // Side 侧边栏
    drag: PropTypes.bool,
    lSide: PropTypes.node, // 左侧边栏
    lSideStyle: PropTypes.object,
    lSideClassName: PropTypes.string,
    rSide: PropTypes.node, // 右侧边栏
    rSideStyle: PropTypes.object,
    rSideClassName: PropTypes.string,
    transition: PropTypes.string, // 过渡动画, push | reveal
    onShowedLeft: PropTypes.func,
    onShowedRight: PropTypes.func
  };

  static defaultProps = {
    drag: true,
    transition: 'push'
  }

  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
    const instance = new Instance(this.$el, {
      drag: true,
      transition: this.props.transition || 'push',
      onShowedLeft: this.props.onShowedLeft,
      onShowedRight: this.props.onShowedRight
    });
    this.instance = instance;
  }
  render() {
    const {
      lSide, lSideStyle, lSideClassName,
      rSide, rSideStyle, rSideClassName,
      drag,
      children,
      transition,
      ...others
    } = this.props;
    return (
      <div className="page-pull" ref={el => {this.$el = el;}}> 
        {/* 主体部分 */}
        <Page {...others}>
          {children}
          <div className="mask"></div>
        </Page>
        {/* 左侧边栏 */}
        {lSide && <aside className={`page-side-left${lSideClassName ? ' ' + lSideClassName : ''}`} style={lSideStyle} data-transition={transition} ref={el => {this.$lSide = el;}}> 
          {lSide}
        </aside>}
        {/* 右侧边栏 */}
        {rSide && <aside className={`page-side-right${rSideClassName ? ' ' + rSideClassName : ''}`} style={rSideStyle} data-transition={transition} ref={el => {this.$rSide = el;}}>
          {rSide}
        </aside>}
      </div>
    );
  }
}
