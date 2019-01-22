'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 平铺菜单
var MenuTiled = function MenuTiled(container, params) {
  /* ------------------
  Model
  ------------------ */
  var defaults = {
    // DATA
    data: null,
    slotClass: 'menutiled-slot',
    slotSubClass: 'menutiled-slot-sub',
    tagClass: 'menutiled-tag',
    moreClass: 'menutiled-more',
    activeClass: 'active',
    extandClass: 'extand',

    selectedId: '' // 默认选中项的id
    /*
    callbacks
    onClick:function(s, item, isActived, isExtand) // 点击项的数据,是否是选中状态,是否是展开状态
    */

    /* 参数data: [{
      id: '',
      name: '',
      active: false,
      children
    }] */
  };params = params || {};
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def];
    }
  }
  // MenuTiled
  var s = this;

  // Params
  s.params = params;
  // Container
  s.container = typeof container === 'string' ? document.querySelector(container) : container;
  if (!s.container) {
    console.log('SeedsUI Error：未找到MenuTiled的DOM对象，请检查传入参数是否正确');
    return;
  }
  s.initData = function (list, container) {
    if (!list || !list.length) return;
    var hasSlot = container.querySelector('.' + s.params.slotClass);
    var slot = document.createElement('div');
    slot.setAttribute('class', hasSlot ? s.params.slotSubClass : s.params.slotClass);
    var html = '';
    for (var i = 0, option; option = list[i++];) {
      // eslint-disable-line
      html += '<div data-index="' + i + '" data-id="' + option.id + '" class="' + s.params.tagClass + (option.id === s.params.selectedId ? ' active' : '') + '">' + '<p class="menutiled-tag-font">' + option.name + '</p>' + (option.children && option.children.length > 0 ? '<i class="menutiled-more"></i>' : '<i class="menutiled-select"></i>') + '</div>';
    }
    slot.innerHTML = html;
    container.appendChild(slot);
  };
  s.container.innerHTML = '';

  /* ------------------
  Method
  ------------------ */
  // 设置选中项
  s.setSelectedId = function (id) {
    s.params.selectedId = id;
  };
  // 重新设置数据
  s.setData = function (data) {
    if (!data || !data.length) return;
    s.params.data = data;
    s.container.innerHTML = '';
    s.initData(s.params.data, s.container);
  };

  /* ------------------
    Events
    ------------------ */
  // 绑定事件
  s.events = function (detach) {
    var action = detach ? 'removeEventListener' : 'addEventListener';
    // 树结构
    s.container[action]('click', s.onClick, false);
  };
  // attach、dettach事件
  s.attach = function () {
    s.events();
  };
  s.detach = function () {
    s.events(true);
  };
  /* ------------------
  Event Handler
  ------------------ */
  // 点击树
  s.onClick = function (e) {
    var target = e.target;
    s.target = target;
    s.targetLine = target;
    if (!target.classList.contains(s.params.tagClass)) return;
    // isActived
    var isActived = s.target.classList.contains('active');
    // isExtand
    var isExtand = target.classList.contains(s.params.extandClass);
    // item
    var id = target.getAttribute('data-id');
    var item = s.params.data.getDeepTreeNode(id);
    // 如果已经展开,则收缩
    if (isExtand) {
      // target.classList.remove(s.params.extandClass)
      // 如果没有展开,则展开并选中,有下级则新建下级节点
    } else {
      // 移除下级节点
      var slot = target.parentNode;
      var nextSlot = slot.nextElementSibling;
      if (nextSlot) slot.parentNode.removeChild(nextSlot);
      // 移除同级所有的选中项与展开项
      var tags = slot.children;
      for (var i = 0, tag; tag = tags[i++];) {
        // eslint-disable-line
        if (tag) {
          tag.classList.remove(s.params.extandClass);
          tag.classList.remove(s.params.activeClass);
        }
      }
      // 添加当前节点为选中项和展开项
      target.classList.add(s.params.extandClass);
      target.classList.add(s.params.activeClass);
      // 如果有下级则新建下级节点
      if (item.children && item.children.length > 0) {
        s.initData(item.children, s.container);
      }
    }

    if (s.params.onClick) s.params.onClick(s, item, isActived, isExtand);
  };
  // 主函数
  s.init = function () {
    if (s.params.data && s.params.data.length) {
      if (s.params.data && s.params.data.length) s.initData(s.params.data, s.container);
    }
    s.attach();
  };
  s.init();
};

exports.default = MenuTiled;
module.exports = exports['default'];