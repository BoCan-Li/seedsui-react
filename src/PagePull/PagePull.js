import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from './../Page';
import Instance from './instance.js';

export default class PagePull extends Component {
  static propTypes = {
    // Side 侧边栏
    drag: PropTypes.bool,
    transition: PropTypes.string, // 过渡动画, push | reveal
    lSide: PropTypes.node, // 左侧边栏
    lSideAttribute: PropTypes.object,
    rSide: PropTypes.node, // 右侧边栏
    rSideAttribute: PropTypes.object,
    // Page
    children: PropTypes.node
  };

  static defaultProps = {
    drag: true,
    transition: 'push'
  }

  constructor(props, context) {
    super(props, context);
  }
  componentDidMount = () => {
    const {
      transition,
      lSideAttribute = {},
      rSideAttribute = {},
    } = this.props;
    const instance = new Instance(this.$el, {
      drag: true,
      transition: transition || 'push',
      onShowedLeft: lSideAttribute.onShowed,
      onShowedRight: rSideAttribute.onShowed
    });
    this.instance = instance;
  }
  // 过滤已经回调的属性
  filterProps = (props) => {
    if (!props) return props;
    var propsed = {}
    for (let n in props) {
      if (n !== 'onShowed') {
        propsed[n] = props[n]
      }
    }
    return propsed;
  }
  render() {
    let {
      // Side
      drag,
      transition,
      lSide,
      lSideAttribute = {},
      rSide,
      rSideAttribute = {},
      // Page
      children,
      ...others
    } = this.props;

    // 剔除掉onShowed事件, 因为在instance时已经回调了
    lSideAttribute = this.filterProps(lSideAttribute)
    rSideAttribute = this.filterProps(rSideAttribute)

    return (
      <div className="page-pull" ref={el => {this.$el = el;}}> 
        {/* 主体部分 */}
        <Page {...others}>
          {children}
          <div className="mask"></div>
        </Page>
        {/* 左侧边栏 */}
        {lSide && <aside ref={el => {this.$lSide = el;}} {...lSideAttribute} className={`page-side-left${lSideAttribute.className ? ' ' + lSideAttribute.className : ''}`} data-transition={transition}> 
          {lSide}
        </aside>}
        {/* 右侧边栏 */}
        {rSide && <aside ref={el => {this.$rSide = el;}} {...lSideAttribute} className={`page-side-right${lSideAttribute.className ? ' ' + lSideAttribute.className : ''}`} data-transition={transition}>
          {rSide}
        </aside>}
      </div>
    );
  }
}
