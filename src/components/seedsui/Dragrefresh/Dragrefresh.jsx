import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NoData from './../NoData/NoData.jsx';
import Instance from './dragrefresh.pull.js';

export default class Dragrefresh extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    onTopRefresh: PropTypes.func,
    onTopComplete: PropTypes.func,
    onBottomRefresh: PropTypes.func,
    onBottomComplete: PropTypes.func,
    noData: PropTypes.bool,
    children: PropTypes.node,
    init: PropTypes.func,
    hasMore: PropTypes.number
  }
  static defaultProps = {
    noData: false
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null
    };
  }
  componentDidMount = () => {
    var instance = new Instance({
      overflowContainer: this.$el,
      onTopRefresh: this.props.onTopRefresh ? this.props.onTopRefresh : null, // 头部刷新,加载第一页
      onTopComplete: this.props.onTopComplete ? this.props.onTopComplete : null, // 头部完成
      onBottomRefresh: this.props.onBottomRefresh ? this.props.onBottomRefresh : null, // 底部刷新,加载下一页
      onBottomComplete: this.props.onBottomComplete ? this.props.onBottomComplete : null, // 底部完成
    });
    this.setState({
      instance
    });
    // 初始化
    if (this.props.init) this.props.init(instance);
    console.log('didMount触发hasMore:' + this.props.hasMore);
    this.setPagination();
  }
  componentDidUpdate(prevProps) {
    // 数据是否为0条
    if (this.props.noData === true) {
      // console.log('解除touch事件，暂无数据');
      this.state.instance.detach();
    } else if (prevProps.noData === true && this.props.noData === false) {
      // console.log('绑定touch事件，有数据');
      this.state.instance.attach();
    }
    console.log('触发hasMore:' + this.props.hasMore);
    this.setPagination();
  }
  setPagination = () => {
    if (this.props.hasMore === 1) { // 头部完成
      console.log('df:头部完成');
      this.state.instance.setPagination(false, false);
    } else if (this.props.hasMore === 2) { // 底部完成
      console.log('df:底部完成');
      this.state.instance.setPagination(true, false);
    } else if (this.props.hasMore === 0) { // 没有更多数据
      console.log('df:没有更多数据');
      this.state.instance.setPagination(true, true);
    } else if (this.props.hasMore === -1) {
      console.log('df:网络错误');
      this.state.instance.setPagination(true, true, true);
    }
  }
  render() {
    const { style, className, onTopRefresh, onBottomRefresh, noData } = this.props;
    return (
      <div ref={(container) => {this.$el = container}} className={className} style={style}>
        {onTopRefresh && <div className="SID-Dragrefresh-TopContainer df-pull" style={{transitionDuration: '150ms', height: '0px'}}>
          <div className="df-pull-box">
            <div className="df-pull-icon"></div>
            <div className="df-pull-caption">下拉可以刷新</div>
          </div>
        </div>}
        {this.props.children}
        {onBottomRefresh && <div className="SID-Dragrefresh-BottomContainer df-pull" style={{height: '50px'}}>
          <div className="df-pull-box">
            <div className="df-pull-icon df-pull-icon-loading"></div>
            <div className="df-pull-caption">正在加载...</div>
          </div>
        </div>}
        {onBottomRefresh && <div className="SID-Dragrefresh-NoDataContainer df-pull hide" style={{height: '50px'}}>
          <div className="df-pull-box">
            <div className="df-pull-caption">没有更多数据了</div>
          </div>
        </div>}
        {onBottomRefresh && <div className="SID-Dragrefresh-ErrorContainer df-pull hide" style={{height: '50px'}}>
          <div className="df-pull-box">
            <div className="df-pull-caption">加载失败，请稍后再试</div>
          </div>
        </div>}
        {noData && <NoData/>}
      </div>
    );
  }
}
