// Loading 进度条
var Loading = function (params) {
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
    iconSrc: '',
    caption: '正在加载...'
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params
  s.parent = typeof s.params.parent === 'string' ? document.querySelector(s.params.parent) : s.params.parent
  s.mask = null
  s.loading = null
  
  // Mask
  s.createMask = function () {
    var mask = document.createElement('div')
    mask.setAttribute('class', s.params.maskClass)
    mask.setAttribute('style', s.params.maskCss)
    return mask
  }
  s.create = function (html) {
    s.mask = s.createMask()
    s.mask.innerHTML = html
    s.parent.appendChild(s.mask)
    s.loading = s.mask.querySelector('.' + s.params.loadingClass)
  }
  // Loading
  s.getLoadingHTML = function () {
    // 流光loading-floating
    var html = '<div class="' + s.params.loadingClass + ' loading-floating animated">' +
      '<div class="loading-floating-wrapper">' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
        '<div class="loading-floating-blade"></div>' +
      '</div>' +
      '<div class="loading-floating-caption">' + s.params.caption + '</div>' +
    '</div>'
    if (s.params.type === 'filling') { // 填料环loading-filling
      html = '<div class="' + s.params.loadingClass + ' loading-filling active">' +
        '<div class="loading-filling-wrapper"></div>' +
      '</div>'
    } else if (s.params.type === 'custom') { // 自定义样式,icon
      html = '<div class="' + s.params.loadingClass + ' loading-wrapper">' +
        '<img alt="" src="' + s.params.iconSrc + '" class="loading-icon"/>'+
        '<p>' + s.params.caption + '</p>' +
      '</div>'
    }
    return html
  }
  s.update = function (params) {
    if (s.params.mask) s.mask = typeof s.params.mask === 'string' ? document.querySelector(s.params.mask) : s.params.mask
    if (s.mask) {
      if (params && params.type) {
        var loadingHTML = s.getLoadingHTML()
        s.mask.innerHTML = loadingHTML
      }
      s.loading = s.mask.querySelector('.' + s.params.loadingClass)
    } else {
      var html = s.getLoadingHTML()
      s.create(html)
    }
  }
  s.update()

  /* --------------------
  Method
  -------------------- */
  s.setMaskCss = function (css) {
    if (css) s.params.maskCss = css
    s.mask.setAttribute('style', s.params.maskCss)
  }
  s.setMaskClassName = function (className) {
    if (className) s.params.maskClass = className
    s.mask.setAttribute('class', s.params.maskClass)
  }
  s.setType = function (type) {
    if (s.params.type === type || s.params.types.indexOf(type) === -1) return
    s.params.type = type
    s.update({type: type})
  }
  s.setHTML = function (html) {
    s.mask.innerHTML = html
  }

  s.showMask = function () {
    s.mask.classList.add(s.params.maskActiveClass)
  }
  s.hideMask = function () {
    s.mask.classList.remove(s.params.maskActiveClass)
  }
  s.destroyMask = function () {
    s.mask.parentNode.removeChild(s.mask)
  }

  s.showLoading = function () {
    s.loading.classList.add(s.params.loadingActiveClass)
  }
  s.hideLoading = function () {
    s.loading.classList.remove(s.params.loadingActiveClass)
  }

  s.hide = function () {
    s.hideMask()
    s.hideLoading()
  }
  s.show = function () {
    s.showMask()
    s.showLoading()
  }
  s.destroy = function () {
    s.destroyMask()
  }
}

export default Loading