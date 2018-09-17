import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Page from './../Page';
import Instance from './instance.js';

export default class PagePull extends Component {
  static propTypes = {
    sideLeft: PropTypes.node, // 左侧边栏
    sideRight: PropTypes.node, // 右侧边栏
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
    const instance = new Instance(this.$el, {
      isDrag: true,
      sides: {
        left: this.$sideLeft || null,
        right: this.$sideRight || null
      },
      onStart:function(e){
        console.log("开始显示");
      },
      onShowed:function(e){
        console.log("显示结束");
      },
      onHid:function(e){
        console.log("隐藏结束");
      }
    });
    this.setState({
      instance
    });
  }
  render() {
    const {
      sideLeft,
      sideRight,
      children,
      transition
    } = this.props;
    return (
      <div className="aside-page" ref={el => {this.$el = el;}}> 
        <div className="aside-wrapper"> 
          {/* 主体部分 */}
          <Page>
            {children}
          </Page>
          {/* 左侧边栏 */}
          {sideLeft && <aside className="aside-left" data-transition={transition} ref={el => {this.$sideLeft = el;}}> 
            {sideLeft}
          </aside>}
          {/* 右侧边栏 */}
          {sideRight && <aside className="aside-left" data-transition={transition} ref={el => {this.$sideRight = el;}}>
            {sideRight}
          </aside>}
        </div> 
      </div>
    );
  }
}
