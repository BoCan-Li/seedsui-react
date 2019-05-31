'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DragCircle = {
  // 实体交互
  onPull: function onPull(e) {
    var topContainer = e.topContainer;
    if (!e.isLoading) {
      var rotateDeg = e.touches.currentPosY * 2;
      topContainer.style.webkitTransform = 'translate3d(0,' + e.touches.currentPosY + 'px,0) rotate(' + rotateDeg + 'deg)';
    }
  },
  onShowTop: function onShowTop(e) {
    var topContainer = e.topContainer;
    var topIcon = topContainer.querySelector('.df-pull-icon');
    topContainer.style.height = e.params.threshold + 'px';
    if (topIcon) topIcon.classList.remove('df-pull-icon-down');
    if (topIcon) topIcon.classList.add('df-pull-icon-loading');
    topCaption.innerHTML = '正在刷新...';
  },
  onHideTop: function onHideTop(e) {
    var topContainer = e.topContainer;
    topContainer.style.height = '0';
  },
  onTopHid: function onTopHid(e) {
    var topContainer = e.topContainer;
    var topIcon = topContainer.querySelector('.df-pull-icon');
    if (topIcon) topIcon.classList.remove('df-pull-icon-down');
    if (topIcon) topIcon.classList.remove('df-pull-icon-loading');
  }
};

exports.default = DragCircle;

/*
// 头部
<div ref={(el) => {this.$elTopBox = el;}} className="SID-Dragrefresh-TopContainer df-circle">
  <div class="df-circle-icon"></div>
</div>

// 底部
<div className="SID-Dragrefresh-BottomContainer df-circle-icon df-circle-icon-loading" style={{height: '50px'}}></div>
*/

module.exports = exports['default'];