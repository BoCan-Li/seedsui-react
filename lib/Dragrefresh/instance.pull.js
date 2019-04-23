'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragPull = function DragPull(params) {
  // 参数改写
  var _onTopComplete = params.onTopComplete;
  var _onBottomRefresh = params.onBottomRefresh;
  var _onNoData = params.onNoData;
  var _onError = params.onError;
  params.onTopComplete = undefined;
  params.onBottomRefresh = undefined;
  params.onNoData = undefined;
  params.onError = undefined;

  // 必须参数
  var container = typeof params.container === 'string' ? document.querySelector(params.container) : params.container;
  if (!container) {
    console.log('SeedsUI Error : DragPull container不存在，请检查页面中是否有此元素');
  }
  var topContainer;
  var topIcon;
  var topCaption;
  if (params.onTopRefresh) {
    topContainer = container.querySelector('.SID-Dragrefresh-TopContainer');
    if (!topContainer) {
      topContainer = document.createElement('div');
      topContainer.setAttribute('class', 'SID-Dragrefresh-TopContainer df-pull');
      topContainer.innerHTML = '<div class="df-pull-box">' + '<div class="df-pull-icon"></div>' + '<div class="df-pull-caption">下拉可以刷新</div>' + '</div>';
      container.insertBefore(topContainer, container.childNodes[0]);
    }
    topIcon = topContainer.querySelector('.df-pull-icon');
    topCaption = topContainer.querySelector('.df-pull-caption');
  }
  var bottomContainer;
  var nodataContainer;
  var errorContainer;
  if (_onBottomRefresh) {
    bottomContainer = container.querySelector('.SID-Dragrefresh-BottomContainer');
    if (!bottomContainer) {
      bottomContainer = document.createElement('div');
      bottomContainer.setAttribute('class', 'SID-Dragrefresh-BottomContainer df-pull');
      bottomContainer.setAttribute('style', 'height: 50px');
      bottomContainer.innerHTML = '<div class="df-pull-box">' + '<div class="df-pull-icon df-pull-icon-loading"></div>' + '<div class="df-pull-caption">正在加载...</div>' + '</div>';
      container.appendChild(bottomContainer);
    }

    nodataContainer = container.querySelector('.SID-Dragrefresh-NoDataContainer');
    if (!errorContainer) {
      nodataContainer = document.createElement('div');
      nodataContainer.setAttribute('class', 'SID-Dragrefresh-NoDataContainer df-pull hide');
      nodataContainer.setAttribute('style', 'height: 50px;');
      nodataContainer.innerHTML = '<div class="df-pull-box">' + '<div class="df-pull-caption">没有更多数据了</div>' + '</div>';
      container.appendChild(nodataContainer);
    }

    errorContainer = container.querySelector('.SID-Dragrefresh-ErrorContainer');
    if (!errorContainer) {
      errorContainer = document.createElement('div');
      errorContainer.setAttribute('class', 'SID-Dragrefresh-ErrorContainer df-pull hide');
      errorContainer.setAttribute('style', 'height: 50px;');
      errorContainer.innerHTML = '<div class="df-pull-box">' + '<div class="df-pull-caption">加载失败，请稍后重试</div>' + '</div>';
      container.appendChild(errorContainer);
    }
  }

  /* ----------------------
  params
  ---------------------- */
  var defaults = {
    container: container,
    topContainer: topContainer,
    threshold: params.threshold || 50,
    end: params.end || 200,
    endRefresh: params.endRefresh || false, // 滑动到指位置后自动刷新
    onTopComplete: function onTopComplete(e) {
      if (bottomContainer && !e.isNoData) {
        bottomContainer.classList.remove('hide');
        nodataContainer.classList.add('hide');
        errorContainer.classList.add('hide');
      }
      // 回调
      if (_onTopComplete) _onTopComplete(e);
    },
    onBottomRefresh: function onBottomRefresh(e) {
      if (bottomContainer) {
        bottomContainer.classList.remove('hide');
        nodataContainer.classList.add('hide');
        errorContainer.classList.add('hide');
      }
      // 回调
      if (_onBottomRefresh) _onBottomRefresh(e);
    },
    onNoData: function onNoData(e) {
      // 显示无数据容器,隐藏底部和错误容器
      if (bottomContainer) {
        bottomContainer.classList.add('hide');
        nodataContainer.classList.remove('hide');
        errorContainer.classList.add('hide');
      }
      // 回调
      if (_onNoData) _onNoData(e);
    },
    onError: function onError(e) {
      // 显示错误容器,隐藏底部和无数据容器
      if (bottomContainer) {
        bottomContainer.classList.add('hide');
        nodataContainer.classList.add('hide');
        errorContainer.classList.remove('hide');
      }
      // 回调
      if (_onError) _onError(e);
    },
    onClickError: function onClickError(e) {
      console.log('点击错误容器');
    },
    // 实体操作
    onPull: function onPull(e) {
      topContainer.style.height = e.touches.currentPosY + 'px';
      if (e.isRefreshed) {
        if (e.touches.currentPosY >= e.params.threshold) {
          topIcon.classList.add('df-pull-icon-down');
          topCaption.innerHTML = '释放立即刷新';
        } else {
          topIcon.classList.remove('df-pull-icon-down');
          topCaption.innerHTML = '下拉可以刷新';
        }
      }
    },
    onShowTop: function onShowTop(e) {
      topContainer.style.height = e.params.threshold + 'px';
      topIcon.classList.remove('df-pull-icon-down');
      topIcon.classList.add('df-pull-icon-loading');
      topCaption.innerHTML = '正在刷新...';
    },
    onHideTop: function onHideTop(e) {
      topContainer.style.height = '0';
    },
    onTopHid: function onTopHid(e) {
      topIcon.classList.remove('df-pull-icon-down');
      topIcon.classList.remove('df-pull-icon-loading');
    }
  };
  params = params || {};
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def];
    }
  }
  var s = new _instance2.default(params);
  return s;
};

exports.default = DragPull;
module.exports = exports['default'];