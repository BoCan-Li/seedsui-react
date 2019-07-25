// DragCircle 下拉刷新, 圆圈转动样式, 用于copy到Dragrefresh组件中
const _ = window._seedsLang || {} // 国际化数据
var DragCircle = {
  // 实体交互
  onPull: function (e) {
    var topContainer = e.topContainer;
    if (!e.isLoading) {
      var rotateDeg = e.touches.currentPosY * 2
      topContainer.style.webkitTransform = 'translate3d(0,' + e.touches.currentPosY + 'px,0) rotate(' + rotateDeg + 'deg)'
    }
  },
  onShowTop: function (e) {
    var topContainer = e.topContainer;
    var topIcon = topContainer.querySelector('.df-pull-icon');
    topContainer.style.height = e.params.threshold + 'px';
    if (topIcon) topIcon.classList.remove('df-pull-icon-down');
    if (topIcon) topIcon.classList.add('df-pull-icon-loading');
    topCaption.innerHTML = _['refreshing'] || '正在刷新...';
  },
  onHideTop: function (e) {
    var topContainer = e.topContainer;
    topContainer.style.height = '0';
  },
  onTopHid: function (e) {
    var topContainer = e.topContainer;
    var topIcon = topContainer.querySelector('.df-pull-icon');
    if (topIcon) topIcon.classList.remove('df-pull-icon-down');
    if (topIcon) topIcon.classList.remove('df-pull-icon-loading');
  }
}

export default DragCircle

/*
// 头部
<div ref={(el) => {this.$elTopBox = el;}} className="SID-Dragrefresh-TopContainer df-circle">
  <div class="df-circle-icon"></div>
</div>

// 底部
<div className="SID-Dragrefresh-BottomContainer df-circle-icon df-circle-icon-loading" style={{height: '50px'}}></div>
*/