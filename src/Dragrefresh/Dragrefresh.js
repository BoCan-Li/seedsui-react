import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notice from './../Notice';
import Instance from './instance.js';
import ImgLazy from './../ImgLazy';

if (!window._seeds_lang) window._seeds_lang = {} // 国际化数据

export default class Dragrefresh extends Component {
  static propTypes = {
    threshold: PropTypes.number, // 头部下拉的触发位置
    end: PropTypes.number, // 头部下拉的结束位置
    endRefresh: PropTypes.bool, // 滑动到指位置后自动刷新
    moveTimeout: PropTypes.number, // 滑动超时, 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd
    onTopRefresh: PropTypes.func,
    onTopComplete: PropTypes.func,
    onBottomRefresh: PropTypes.func,
    onBottomComplete: PropTypes.func,

    children: PropTypes.node,
    hasMore: PropTypes.number, // hasMore: 0.无更多数据 1.数据加载完成 404.一条数据都没有 -1. 加载错误 -2. 重置状态,为了后面可以更新DOM

    showNotice: PropTypes.bool, // 是否允许暂无数据
    noticeProps: PropTypes.object,

    lazyLoad: PropTypes.bool,

    onScroll: PropTypes.func, // 滚动事件

    // 底部加载中
    bottomLoadingCaption: PropTypes.string,
    // 底部加载完成
    bottomNoDataCaption: PropTypes.string,
    // 底部加载错误
    bottomErrorCaption: PropTypes.string,
    onClickBottomError: PropTypes.func,
  }
  static defaultProps = {
    showNotice: true,
    bottomLoadingCaption: (window._seeds_lang['loading'] || '正在加载...'),
    bottomNoDataCaption: (window._seeds_lang['no_more_data'] || '没有更多数据了'),
    bottomErrorCaption: (window._seeds_lang['refreshing_failed'] || '加载失败, 请稍后再试')
  }
  constructor(props) {
    super(props);
  }
  componentDidMount () {
    this.init();
    this.setPagination(undefined, this.props.hasMore);
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.hasMore === this.props.hasMore) return;
    // 刷新完成则设置刷新
    this.setPagination(prevProps.hasMore, this.props.hasMore);
  }
  // 实例化
  init = () => {
    const {onScroll} = this.props;
    var instance = new Instance({
      threshold: this.props.threshold,
      end: this.props.end,
      endRefresh: this.props.endRefresh,
      moveTimeout: this.props.moveTimeout,
      container: this.$el,
      onScroll,
      onTopRefresh: this.onTopRefresh, // 头部刷新,加载第一页
      onBottomRefresh: this.onBottomRefresh, // 底部刷新,加载下一页
      // 构建实体
      topContainer: this.$elTopBox,
      // 实体交互
      duration: 150,
      onPull: (e) => {
        var topContainer = e.topContainer;
        topContainer.style.height = e.touches.currentPosY + 'px'
        var topIcon = topContainer.querySelector('.df-pull-icon');
        var topCaption = topContainer.querySelector('.df-pull-caption');
        if (!e.isLoading) {
          if (e.touches.currentPosY >= e.params.threshold) {
            if (topIcon) topIcon.classList.add('df-pull-icon-down')
            if (topCaption) topCaption.innerHTML = window._seeds_lang['release'] || '释放立即刷新'
          } else {
            if (topIcon) topIcon.classList.remove('df-pull-icon-down')
            if (topCaption) topCaption.innerHTML = window._seeds_lang['pull_down'] || '下拉可以刷新'
          }
        }
      },
      onShowTop: (e) => {
        var topContainer = e.topContainer;
        var topIcon = topContainer.querySelector('.df-pull-icon');
        var topCaption = topContainer.querySelector('.df-pull-caption');
        topContainer.style.height = e.params.threshold + 'px';
        if (topIcon) topIcon.classList.remove('df-pull-icon-down')
        if (topIcon) topIcon.classList.add('df-pull-icon-loading')
        if (topCaption) topCaption.innerHTML = window._seeds_lang['refreshing'] || '正在刷新...'
      },
      onHideTop: (e) => {
        var topContainer = e.topContainer;
        topContainer.style.height = '0';
      },
      onTopHid: (e) => {
        var topContainer = e.topContainer;
        var topIcon = topContainer.querySelector('.df-pull-icon');
        if (topIcon) topIcon.classList.remove('df-pull-icon-down')
        if (topIcon) topIcon.classList.remove('df-pull-icon-loading')
      }
    });
    this.instance = instance;
  }
  // 头部刷新
  onTopRefresh = () => {
    this.props.onTopRefresh();
  }
  // 底部刷新
  onBottomRefresh = () => {
    if (!this.props.onBottomRefresh) return;
    const {hasMore} = this.props;
    if (hasMore !== 0 && hasMore !== -1 && hasMore !== 404) {
      this.props.onBottomRefresh();
    } else {
      if (this.instance) this.instance.isLoading = false // 暂无数据时, 设置为可刷新
    }
  }
  // 懒人加载
  lazyLoad = () => {
    if (!this.$el) return;
    if (this.timeout) window.clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.lazy) {
        this.lazy.load();
      } else {
        this.lazy = new ImgLazy({
          overflowContainer: this.$el
        });
        this.lazy.load();
      }
    }, 500);
  }
  // 控制刷新
  setPagination = (prevHasMore, hasMore) => {
    // 如果还没有初始化完成,则会再轮询调用一下
    if(!this.instance) {
      setTimeout(() => {
        this.setPagination(prevHasMore, hasMore);
      }, 100);
      return;
    }
    console.log(`hasMore: 由${prevHasMore}变成${hasMore}`)
    // 无数据时不允许触发刷新
    if (this.props.showNotice && hasMore === 404) {
      this.instance.detach();
    } else if (this.props.showNotice && prevHasMore === 404 && hasMore !== 404) {
      this.instance.attach();
    }
    // 刷新完成, 需收起头
    if (hasMore !== -2) {
      this.instance.hideTop();
    }
    // 设置为可刷新
    this.instance.isLoading = false;
    // 刷新完成, 还有数据
    if (hasMore === 1) {
      // 如果还有数据，并且如果没有滚动条，则继续加载
      if (!this.instance.hasScroll()) {
        console.log('还有数据,但没有滚动条,继续加载...')
        this.instance.bottomRefresh()
      }
    }
    // 懒加载
    if (this.props.lazyLoad) this.lazyLoad();
  }
  render() {
    const {
      threshold,
      end,
      endRefresh,
      moveTimeout,
      onTopRefresh,
      onTopComplete,
      onBottomRefresh,
      onBottomComplete,

      children,
      hasMore,

      showNotice,
      noticeProps,

      lazyLoad,

      onScroll,

      // 底部加载中
      bottomLoadingCaption,
      // 底部加载完成
      bottomNoDataCaption,
      // 底部加载错误
      bottomErrorCaption,
      onClickBottomError,
      ...others
    } = this.props;
    return (
      <div ref={(el) => {this.$el = el;}} {...others} className={`container${others.className ? ' ' + others.className : ''}`}>
        {onTopRefresh && <div ref={(el) => {this.$elTopBox = el;}} className="SID-Dragrefresh-TopContainer df-pull">
          <div className="df-pull-box">
            <div className="df-pull-icon"></div>
            <div className="df-pull-caption">{window._seeds_lang['pull_down'] || '下拉可以刷新'}</div>
          </div>
        </div>}
        {this.props.children}
        {onBottomRefresh && (hasMore === 1 || hasMore === -2) && <div className="SID-Dragrefresh-BottomContainer df-pull" style={{height: '50px'}}>
          <div className="df-pull-box">
            <div className="df-pull-icon df-pull-icon-loading"></div>
            <div className="df-pull-caption">{bottomLoadingCaption}</div>
          </div>
        </div>}
        {onBottomRefresh && hasMore === 0 && <div className="SID-Dragrefresh-NoDataContainer df-pull" style={{height: '50px'}}>
          <div className="df-pull-box">
            <div className="df-pull-caption">{bottomNoDataCaption}</div>
          </div>
        </div>}
        {onBottomRefresh && hasMore === -1 && <div className="SID-Dragrefresh-ErrorContainer df-pull" style={{height: '50px'}} onClick={onClickBottomError}>
          <div className="df-pull-box">
            <div className="df-pull-caption">{bottomErrorCaption}</div>
          </div>
        </div>}
        {hasMore === 404 && showNotice && <Notice caption={'暂无数据'} {...noticeProps}/>}
      </div>
    );
  }
}
