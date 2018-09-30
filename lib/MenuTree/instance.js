'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 左侧菜单
var MenuTree = function MenuTree(container, params) {
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    // DATA
    data: null,
    tagClass: 'menutree-tag',
    activeClass: 'active',
    extandClass: 'extand',
    itemAttr: 'data-item',

    activeId: '' // 默认选中项的id
    // collapseResetChildren: true, // 收缩时, 重置子节点
    /*
    callbacks
    onClick:function(item, isActived, isExtand) // 点击项的数据,是否是选中状态,是否是展开状态
    */

    /* 参数data: [{
      id: '',
      caption: '',
      active: false,
      children
    }] */
  };params = params || {};
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def];
    }
  }
  // MenuTree
  var s = this;

  // Params
  s.params = params;
  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container;
  if (!s.container) {
    console.log('SeedsUI Error：未找到MenuTree的DOM对象，请检查传入参数是否正确');
    return;
  }
  s.initData = function (list, ulContainer) {
    for (var i = 0, option; option = list[i++];) {
      // eslint-disable-line
      var li = document.createElement('li');
      var html = '<div data-index="' + i + '" ' + s.params.itemAttr + '=\'' + (0, _stringify2.default)(option) + '\' class="' + s.params.tagClass + (option.id === s.params.activeId ? ' active' : '') + '" id="ID-MenuTree' + option.id + '">' + '<p class="menutree-tag-font">' + option.caption + '</p>' + (option.children && option.children.length > 0 ? '<i class="menutree-more"></i>' : '') + '</div><ul></ul>';
      li.innerHTML = html;
      ulContainer.appendChild(li);
      var ul = s.container.querySelector('#ID-MenuTree' + option.id).nextElementSibling;
      if (option.children && option.children.length > 0) {
        s.initData(option.children, ul);
      }
    }
  };
  s.container.innerHTML = '';

  /* ------------------
  Method
  ------------------ */
  // 设置选中项
  s.setActiveId = function (id) {
    s.params.activeId = id;
  };
  // 重新设置数据
  s.setData = function (data) {
    s.params.data = data;
    s.container.innerHTML = '';
    s.initData(data, s.container);
    s.updateActive();
  };
  // 添加数据
  s.addData = function (data, childNode) {
    s.initData(data, childNode);
  };
  // 如果子节点有选中的话, 父节点也要选中并且展开
  s.updateActive = function () {
    var actives = s.container.querySelectorAll('.' + s.params.activeClass);
    if (actives.length === 1 && actives[0].parentNode && actives[0].parentNode.parentNode && actives[0].parentNode.parentNode.previousElementSibling) {
      var tag = actives[0].parentNode.parentNode.previousElementSibling;
      s.setActive(tag);
    }
  };
  s.setActive = function (target) {
    target.classList.add(s.params.activeClass);
    target.classList.add(s.params.extandClass);
    if (target.parentNode && target.parentNode.parentNode && target.parentNode.parentNode.previousElementSibling) {
      var tag = target.parentNode.parentNode.previousElementSibling;
      s.setActive(tag);
    }
  };

  /* ------------------
    Events
    ------------------ */
  // 绑定事件
  s.isSupportTouch = 'ontouchstart' in window;
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener';
    // touch兼容pc事件
    if (s.isSupportTouch) {
      s.container[action]('touchstart', s.onTouchStart, false);
      s.container[action]('touchend', s.onTouchEnd, false);
    } else {
      s.container[action]('click', s.onClick, false);
    }
  };
  // attach、dettach事件
  s.attach = function (event) {
    s.events();
  };
  s.detach = function (event) {
    s.events(true);
  };
  /* ------------------
  Event Handler
  ------------------ */
  // Tap
  s.touches = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    diffX: 0,
    diffY: 0
  };
  s.onTouchStart = function (e) {
    s.touches.startX = e.touches[0].clientX;
    s.touches.startY = e.touches[0].clientY;
  };
  s.onTouchEnd = function (e) {
    s.touches.endX = e.changedTouches[0].clientX;
    s.touches.endY = e.changedTouches[0].clientY;
    s.touches.diffX = s.touches.startX - s.touches.endX;
    s.touches.diffY = s.touches.startY - s.touches.endY;
    // 单击事件
    if (Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6) {
      s.onClick(e);
    }
  };
  // 点击树
  s.onClick = function (e) {
    var target = e.target;
    if (!target.classList.contains(s.params.tagClass)) return;
    var isActived = target.classList.contains(s.params.activeClass);
    var isExtand = target.classList.contains(s.params.extandClass);
    // 如果已经展开,则收缩
    if (isExtand) {
      target.classList.remove(s.params.extandClass);
      // 收缩时, 重置子节点
      // if (s.params.collapseResetChildren) {
      // var tags = target.nextElementSibling.querySelectorAll('.' + s.params.tagClass)
      // for (var i = 0, subtag; subtag = tags[i++];) { // eslint-disable-line
      //   subtag.classList.remove(s.params.extandClass)
      //   subtag.classList.remove(s.params.activeClass)
      // }
      // }
    } else {
      // 移除同级所有的选中项与展开项
      var container = target.parentNode.parentNode;
      var actives = container.querySelectorAll('.' + s.params.activeClass);
      for (var i = 0, tag; tag = actives[i++];) {
        // eslint-disable-line
        // var tag = li.querySelector('.' + s.params.tagClass)
        if (tag) {
          tag.classList.remove(s.params.extandClass);
          tag.classList.remove(s.params.activeClass);
        }
      }
      // 添加当前节点为选中项和展开项
      target.classList.add(s.params.extandClass);
      target.classList.add(s.params.activeClass);
    }
    // 返回item
    var item = target.getAttribute('data-item') ? JSON.parse(target.getAttribute('data-item')) : null;
    // 子节点个数
    var childrenCount = item.children && item.children.length ? item.children.length : 0;
    // 展开状态 -1无子节点 | true展开 | false收缩
    var extandStatus = childrenCount ? !isExtand : -1;
    if (s.params.onClick) s.params.onClick(item, isActived, extandStatus, childrenCount);
  };
  // 主函数
  s.init = function () {
    s.initData(s.params.data, s.container);
    s.updateActive();
    s.attach();
  };
  s.init();
};

exports.default = MenuTree;
module.exports = exports['default'];