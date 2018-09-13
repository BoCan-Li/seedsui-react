import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notice from './../Notice';
import Instance from './instance.pull.js';
import ImgLazy from './../ImgLazy/instance.js';

export default class Dragrefresh extends Component {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    onTopRefresh: PropTypes.func,
    onTopComplete: PropTypes.func,
    onBottomRefresh: PropTypes.func,
    onBottomComplete: PropTypes.func,
    children: PropTypes.node,
    hasMore: PropTypes.number, // 1头部完成 | 2底部完成 | 0没有更多数据 | -1网络错误 | 404找不到数据 | -2空闲但展现底部转圈 | -3空闲但不展现底部转圈

    showNoData: PropTypes.bool, // 是否允许暂无数据
    noDataClassName: PropTypes.string,
    noDataStyle: PropTypes.object,
    noDataCaption: PropTypes.string,
    noDataIconSrc: PropTypes.string,
    noDataIconClassName: PropTypes.string,
    noDataOnClick: PropTypes.func, // 点击暂无数据

    lazyLoad: PropTypes.bool,

    onScroll: PropTypes.func, // 滚动事件
  }
  static defaultProps = {
    noDataIconClassName: 'notice-icon-nodata',
    showNoData: true
  }
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
      // noData: false
    };
  }
  componentDidMount = () => {
    this.init();
    console.log('dragrefresh:DidMount, hasMore:' + this.props.hasMore);
    this.setPagination();
  }
  init = () => {
    const {onScroll} = this.props;
    var instance = new Instance({
      container: this.$el,
      onScroll,
      onTopRefresh: this.props.onTopRefresh ? this.props.onTopRefresh : null, // 头部刷新,加载第一页
      onTopComplete: this.props.onTopComplete ? this.props.onTopComplete : null, // 头部完成
      onBottomRefresh: this.props.onBottomRefresh ? this.props.onBottomRefresh : null, // 底部刷新,加载下一页
      onBottomComplete: this.props.onBottomComplete ? this.props.onBottomComplete : null, // 底部完成
    });
    this.setState({
      instance
    });
    // 懒人加载
    let imgLazy = null;
    if (this.props.lazyLoad && !imgLazy) {
      imgLazy = new ImgLazy({
        overflowContainer: this.$el
      });
    }
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.hasMore === this.props.hasMore) return;
    if (this.props.hasMore === 404) {
      console.log('dragrefresh:解除touch事件，暂无数据');
      this.state.instance.detach();
    } else if (prevProps.hasMore === 404 && this.props.hasMore !== 404) {
      /* this.setState({
        noData: false
      }); */
      console.log('dragrefresh:绑定touch事件，有数据');
      this.state.instance.attach();
    }
    console.log('dragrefresh:DidUpdate, hasMore:' + this.props.hasMore);
    this.setPagination();
  }
  setPagination = () => {
    // 如果还没有初始化完成,则会再轮询调用一下
    if(!this.state.instance) {
      setTimeout(() => {
        this.setPagination();
      }, 100);
      return;
    }
    if (this.props.hasMore === 1) { // 头部完成
      console.log('dragrefresh:头部完成');
      this.state.instance.setPagination(false, false);
    } else if (this.props.hasMore === 2) { // 底部完成
      console.log('dragrefresh:底部完成');
      this.state.instance.setPagination(true, false);
    } else if (this.props.hasMore === 0) { // 没有更多数据
      console.log('dragrefresh:没有更多数据');
      this.state.instance.setPagination(true, true);
    } else if (this.props.hasMore === -1) {
      console.log('dragrefresh:网络错误');
      this.state.instance.setPagination(true, true, true);
    } else if (this.props.hasMore === 404) {
      // if (this.state.noData === true) return;
      console.log('dragrefresh:没有一条数据');
      this.state.instance.setPagination(true, true);
      /* this.setState({
        noData: true
      }); */
    }
  }
  render() {
    const {style, className, onTopRefresh, onBottomRefresh, showNoData, noDataClassName, noDataStyle, noDataCaption, noDataIconSrc, noDataIconClassName, noDataOnClick} = this.props;
    return (
      <div ref={(el) => {this.$el = el;}} className={`container${className ? ' ' + className : ''}`} style={style}>
        {onTopRefresh && <div className="SID-Dragrefresh-TopContainer df-pull" style={{transitionDuration: '150ms', height: '0px'}}>
          <div className="df-pull-box">
            <div className="df-pull-icon"></div>
            <div className="df-pull-caption">下拉可以刷新</div>
          </div>
        </div>}
        {this.props.children}
        {onBottomRefresh && <div className="SID-Dragrefresh-BottomContainer df-pull" style={{height: '50px'}}>
          {this.props.hasMore !== -3 && <div className="df-pull-box">
            <div className="df-pull-icon df-pull-icon-loading"></div>
            <div className="df-pull-caption">正在加载...</div>
          </div>}
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
        {this.props.hasMore === 404 && showNoData && <Notice className={noDataClassName} style={noDataStyle} caption={noDataCaption || '暂无数据'} iconSrc={noDataIconSrc} iconClassName={noDataIconClassName} onClick={noDataOnClick}/>}
      </div>
    );
  }
}