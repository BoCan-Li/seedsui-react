// DragPull 下拉刷新, 箭头样式, 用于copy到Dragrefresh组件中
const _ = window._seedsLang || {} // 国际化数据
var DragPull = {
  // 实体交互
  onPull: (e) => {
    var topContainer = e.topContainer;
    topContainer.style.height = e.touches.currentPosY + 'px'
    var topIcon = topContainer.querySelector('.df-pull-icon');
    var topCaption = topContainer.querySelector('.df-pull-caption');
    if (!e.isLoading) {
      if (e.touches.currentPosY >= e.params.threshold) {
        if (topIcon) topIcon.classList.add('df-pull-icon-down')
        if (topCaption) topCaption.innerHTML = _['release'] || '释放立即刷新'
      } else {
        if (topIcon) topIcon.classList.remove('df-pull-icon-down')
        if (topCaption) topCaption.innerHTML = _['pull_down'] || '下拉可以刷新'
      }
    }
  },
  onShowTop: (e) => {
    var topContainer = e.topContainer;
    var topIcon = topContainer.querySelector('.df-pull-icon');
    var topCaption = topContainer.querySelector('.df-pull-caption');
    topContainer.style.height = e.params.threshold + 'px'
    if (topIcon) topIcon.classList.remove('df-pull-icon-down')
    if (topIcon) topIcon.classList.add('df-pull-icon-loading')
    if (topCaption) topCaption.innerHTML = _['refreshing'] || '正在刷新...'
  },
  onHideTop: (e) => {
    var topContainer = e.topContainer;
    topContainer.style.height = '0'
  },
  onTopHid: (e) => {
    var topContainer = e.topContainer;
    var topIcon = topContainer.querySelector('.df-pull-icon');
    if (topIcon) topIcon.classList.remove('df-pull-icon-down')
    if (topIcon) topIcon.classList.remove('df-pull-icon-loading')
  }
}

export default DragPull

/*
// 头部
<div ref={(el) => {this.$elTopBox = el;}} className="SID-Dragrefresh-TopContainer df-pull" style={{transitionDuration: '150ms', height: '0px'}}>
  <div className="df-pull-box">
    <div className="df-pull-icon"></div>
    <div className="df-pull-caption">{_['pull_down'] || '下拉可以刷新'}</div>
  </div>
</div>

// 底部
<div className="SID-Dragrefresh-BottomContainer df-pull" style={{height: '50px'}}>
  <div className="df-pull-box">
      <div className="df-pull-icon df-pull-icon-loading"></div>
      <div className="df-pull-caption">{bottomLoadingCaption}</div>
  </div>
</div>
*/