import React, {forwardRef, useRef, useImperativeHandle, useEffect, useContext} from 'react';
import Container from './../Container';
import Instance from './instance.js';
import Context from './../Context/instance.js';

let pullRefreshTimeout = null

const ContainerPull = forwardRef(({
  onTopRefresh,
  onBottomRefresh,
  refreshing, // true: 正在刷新 false: 刷新完成
  // lazyLoad,
  children,
  ...others
}, ref) =>  {
  // context
  const context = useContext(Context) || {};
  const locale = context.locale || function (key) {return key || ''};

  const refEl = useRef(null)
  const refElTop = useRef(null)
  useImperativeHandle(ref, () => {
    return refEl.current
  });
  const instance = useRef(null)

  // 更新句柄, 防止synchronization模式, 每次组件在render的时候都生成上次render的state、function、effects
  if (instance.current) {
    instance.current.params.onTopRefresh = onTopRefresh; // 头部刷新,加载第一页
    instance.current.params.onBottomRefresh = bottomRefresh; // 底部刷新,加载下一页
  }
  
  useEffect(() => {
    instance.current = new Instance({
      // threshold: 100,
      // end: 200, // 头部下拉的结束位置
      // endRefresh: null, // 滑动到指位置后自动刷新
      // moveTimeout: 0, // 滑动超时, 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd
      container: refEl.current,
      onScroll: others.onScroll ? others.onScroll : null,
      onTopRefresh: onTopRefresh, // 头部刷新,加载第一页
      onBottomRefresh: bottomRefresh, // 底部刷新,加载下一页
      // 构建实体
      topContainer: onTopRefresh ? refElTop.current : null,
      // 实体交互
      duration: 150,
      onPull: (e) => {
        var topContainer = e.topContainer;
        topContainer.style.height = e.touches.currentPosY + 'px'
        var topIcon = topContainer.querySelector('.containerpull-pull-icon');
        var topCaption = topContainer.querySelector('.containerpull-pull-caption');
        if (!e.isLoading) {
          if (e.touches.currentPosY >= e.params.threshold) {
            if (topIcon) topIcon.classList.add('containerpull-pull-icon-down')
            if (topCaption) topCaption.innerHTML = locale('release') || '释放立即刷新'
          } else {
            if (topIcon) topIcon.classList.remove('containerpull-pull-icon-down')
            if (topCaption) topCaption.innerHTML = locale('pull_down') || '下拉可以刷新'
          }
        }
      },
      onShowTop: (e) => {
        var topContainer = e.topContainer;
        var topIcon = topContainer.querySelector('.containerpull-pull-icon');
        var topCaption = topContainer.querySelector('.containerpull-pull-caption');
        topContainer.style.height = e.params.threshold + 'px';
        if (topIcon) topIcon.classList.remove('containerpull-pull-icon-down')
        if (topIcon) topIcon.classList.add('containerpull-pull-icon-loading')
        if (topCaption) topCaption.innerHTML = locale('refreshing') || '正在刷新...'
      },
      onHideTop: (e) => {
        var topContainer = e.topContainer;
        topContainer.style.height = '0';
      },
      onTopHid: (e) => {
        var topContainer = e.topContainer;
        var topIcon = topContainer.querySelector('.containerpull-pull-icon');
        if (topIcon) topIcon.classList.remove('containerpull-pull-icon-down')
        if (topIcon) topIcon.classList.remove('containerpull-pull-icon-loading')
      }
    });
  }, []) // eslint-disable-line

  // 底部刷新
  function bottomRefresh () {
    if (refreshing) return;
    if (!refreshing) {
      onBottomRefresh();
    } else if (refreshing === '') { // 为空表示所有数据已经加载完成
      if (instance.current) instance.current.isLoading = false // 暂无数据时, 设置为可刷新
    }
  }

  // 控制刷新
  useEffect(() => {
    if (!instance.current) return
    if (refreshing === true) { // 正在刷新
      instance.current.isLoading = true;
    } else if (refreshing === false) { // 刷新完成
      if (instance.current.touches.posY) { // 如果头部展开, 则隐藏头部
        instance.current.hideTop(); // 隐藏头部
      }
      // 判断是否没有滚动条, 如果没有滚动条会再次触发onBottomRefresh方法
      if (pullRefreshTimeout) {
        window.clearTimeout(pullRefreshTimeout)
      }
      pullRefreshTimeout = setTimeout(() => { // 因为页面渲染需要时间, 所以需要等渲染完成后再判断有无滚动条
        instance.current.isLoading = false;
        if (!instance.current.hasScroll()) {
          console.log('刷新完成,但没有滚动条,继续加载...')
          bottomRefresh()
        } else if (instance.current.isBottom()) {
          console.log('刷新完成,滚动条在底部,继续加载...')
          bottomRefresh()
        }
      }, 500);
    }
  }, [refreshing, onBottomRefresh, onTopRefresh]) // eslint-disable-line

  return <Container ref={refEl} {...others}>
    <div ref={refElTop} className="SID-Dragrefresh-TopContainer containerpull-pull">
      <div className="containerpull-pull-box">
        <div className="containerpull-pull-icon"></div>
        <div className="containerpull-pull-caption">{locale('pull_down') || '下拉可以刷新'}</div>
      </div>
    </div>
    {children}
  </Container>
})

export default ContainerPull
