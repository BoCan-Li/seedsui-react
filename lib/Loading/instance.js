'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Loading 进度条
var Loading = function Loading(params) {
  /* --------------------
  Model
  -------------------- */
  var defaults = {
    mask: null,
    parent: document.body, // 创建于哪个元素下

    maskCss: '',
    maskClass: 'mask loading-mask', // 加loading-propagation允许点击
    maskActiveClass: 'active',
    loadingClass: 'loading',
    loadingActiveClass: 'active',

    types: ['floating', 'filling', 'custom'],
    type: 'floating', // floating流光 | filling填料环 | custom自定义
    iconClass: 'loading-custom-icon',
    icon: '', // 传入icon的class
    caption: '正在加载...'
  };
  params = params || {};
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def];
    }
  }
  var s = this;
  s.params = params;
  s.parent = typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent;
  s.mask = null;
  s.loading = null;

  // Mask
  s.createMask = function () {
    var mask = document.createElement('div');
    mask.setAttribute('class', s.params.maskClass);
    mask.setAttribute('style', s.params.maskCss);
    return mask;
  };
  // Loading
  s.createLoading = function () {
    var loading = document.createElement('div');
    loading.setAttribute('class', s.params.loadingClass + ' loading-floating animated');
    // 流光loading-floating
    var html = '<div class="loading-floating-icon">' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '<div class="loading-floating-blade"></div>' + '</div>' + '<div class="loading-floating-caption caption">' + s.params.caption + '</div>';
    if (s.params.type === 'filling') {
      // 填料环loading-filling
      loading.setAttribute('class', s.params.loadingClass + ' loading-filling');
      html = '<div class="loading-filling-icon"></div>' + '<div class="loading-filling-caption caption">' + s.params.caption + '</div>';
    } else if (s.params.type === 'custom') {
      // 自定义样式,icon
      loading.setAttribute('class', s.params.loadingClass + ' loading-custom');
      html = '<span class="' + s.params.iconClass + ' ' + s.params.icon + '"></span><p class="loading-custom-caption caption">' + s.params.caption + '</p>';
    }
    loading.innerHTML = html;
    return loading;
  };
  s.create = function () {
    s.mask = s.createMask();
    s.loading = s.createLoading();
    s.mask.appendChild(s.loading);
    s.parent.appendChild(s.mask);
  };
  s.update = function () {
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask;
    if (s.mask) {
      s.loading = s.mask.querySelector('.' + s.params.loadingClass);
    } else {
      s.create();
    }
  };
  s.update();

  /* --------------------
  Method
  -------------------- */
  s.setMaskCss = function (css) {
    if (css) s.params.maskCss = css;
    s.mask.setAttribute('style', s.params.maskCss);
  };
  s.setMaskClassName = function (className) {
    if (className) s.params.maskClass = className;
    s.mask.setAttribute('class', s.params.maskClass);
  };
  s.setType = function (type) {
    if (s.params.type === type || s.params.types.indexOf(type) === -1) return;
    s.params.type = type;
    s.loading = s.createLoading();
  };
  s.setCaption = function (caption) {
    if (!caption) return;
    s.params.caption = caption;
    var captionEl = s.loading.querySelector('.caption');
    if (captionEl) {
      captionEl.innerHTML = caption;
    }
  };
  s.setIcon = function (className) {
    s.params.icon = className;
    var icon = s.loading.querySelector('.' + s.params.iconClass);
    if (icon) {
      icon.className = s.params.iconClass + (s.params.icon ? ' ' + s.params.icon : '');
    }
  };
  s.setHTML = function (html) {
    s.mask.innerHTML = html;
  };

  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass);
  };
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass);
  };
  s.destroyMask = function () {
    s.mask.parentNode.removeChild(s.mask);
  };

  s.showLoading = function () {
    s.loading.classList.add(s.params.loadingActiveClass);
  };
  s.hideLoading = function () {
    s.loading.classList.remove(s.params.loadingActiveClass);
  };

  s.hide = function () {
    s.hideMask();
    s.hideLoading();
  };
  s.show = function () {
    s.showMask();
    s.showLoading();
  };
  s.destroy = function () {
    s.destroyMask();
  };
};

exports.default = Loading;
module.exports = exports['default'];