'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Carrousel = function (_Component) {
  (0, _inherits3.default)(Carrousel, _Component);

  function Carrousel(props) {
    (0, _classCallCheck3.default)(this, Carrousel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Carrousel.__proto__ || (0, _getPrototypeOf2.default)(Carrousel)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if (_this.instance && _this.instance.activeIndex !== _this.props.activeIndex) {
        _this.instance.slideTo(_this.props.activeIndex, _this.props.speed, _this.props.enableOnChange);
      }
      if (_this.props.stopPropagation !== prevProps.stopPropagation) {
        _this.instance.setParams({ stopPropagation: _this.props.stopPropagation });
      }
      if (!_this.props.list.equals(prevProps.list)) {
        _this.update();
      }
    };

    _this.componentDidMount = function () {
      _this.instance();
      // 轮播图片, 自适应的情况下, 高度需要计算
      if (!(_this.props.style && _this.props.style.height) && _this.props.list.length && _this.props.delay) {
        setTimeout(function () {
          _this.instance.updateContainerSize();
        }, _this.props.delay);
      }
    };

    _this.instance = function () {
      var instance = new _instance2.default(_this.$el, {
        height: _this.props.style && _this.props.style.height ? _this.props.style.height : null,
        width: _this.props.style && _this.props.style.width ? _this.props.style.width : null,
        stopPropagation: _this.props.stopPropagation,
        autoplay: _this.props.autoplay,
        slidesPerView: _this.props.slidesPerView,
        loop: _this.props.loop,
        onClick: _this.onClick,
        onSlideChangeEnd: _this.props.onChange ? _this.props.onChange : null
      });
      _this.instance = instance;
    };

    _this.onClick = function (s, e) {
      var index = s.activeIndex;
      if (_this.props.onClick) _this.props.onClick(_this.props.list[index], index, s, e);
    };

    _this.getCarrouselClassName = function () {
      var _this$props = _this.props,
          className = _this$props.className,
          list = _this$props.list;

      if (className) {
        if (className.indexOf('carrousel-container') !== -1 || className.indexOf('carrousel-page') !== -1) {
          return className;
        }
      }
      return (list.length > 0 ? 'carrousel-container' : 'carrousel-page') + (className ? ' ' + className : '');
    };

    _this.getSlideStyle = function (item) {
      var slideParams = _this.props.slideParams;

      if (item.bg) {
        return (0, _assign2.default)({ backgroundImage: 'url(' + _this.props.defaultSrc + ')' }, slideParams.style);
      }
      return slideParams.style;
    };

    _this.update = function () {
      // 更新为默认图片
      var imgs = _this.$el.querySelectorAll('.carrousel-lazy');
      for (var i = 0; i < imgs.length; i++) {
        var imgTarget = imgs[i];
        if (!imgTarget) continue;
        if (imgTarget.tagName === 'IMG') {
          imgTarget.src = _this.props.defaultSrc;
        } else {
          imgTarget.style.backgroundImage = 'url(' + _this.props.defaultSrc + ')';
        }
      }
      // 更新Carrousel
      if (_this.instance) _this.instance.update();
    };

    return _this;
  }

  (0, _createClass3.default)(Carrousel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          slideParams = _props.slideParams,
          pagination = _props.pagination,
          paginationParams = _props.paginationParams,
          prevParams = _props.prevParams,
          nextParams = _props.nextParams,
          stopPropagation = _props.stopPropagation,
          activeIndex = _props.activeIndex,
          loop = _props.loop,
          autoplay = _props.autoplay,
          slidesPerView = _props.slidesPerView,
          defaultSrc = _props.defaultSrc,
          list = _props.list,
          enableOnChange = _props.enableOnChange,
          speed = _props.speed,
          onClick = _props.onClick,
          onChange = _props.onChange,
          delay = _props.delay,
          children = _props.children,
          others = (0, _objectWithoutProperties3.default)(_props, ['className', 'style', 'slideParams', 'pagination', 'paginationParams', 'prevParams', 'nextParams', 'stopPropagation', 'activeIndex', 'loop', 'autoplay', 'slidesPerView', 'defaultSrc', 'list', 'enableOnChange', 'speed', 'onClick', 'onChange', 'delay', 'children']);

      var childrenArr = _react2.default.Children.toArray(children);
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: this.getCarrouselClassName(), style: style }, others),
        _react2.default.createElement(
          'div',
          { className: 'carrousel-wrapper' },
          list.length > 0 && list.map(function (item, index) {
            return _react2.default.createElement(
              'div',
              { className: 'carrousel-slide' + (slideParams.className ? ' ' + slideParams.className : '') + (item.bg ? ' carrousel-lazy' : ''), style: _this2.getSlideStyle(item), key: index, 'data-load-src': item.bg },
              item.img && _react2.default.createElement('img', { className: 'carrousel-slide-img carrousel-lazy', alt: '', src: defaultSrc, 'data-load-src': item.img }),
              item.caption && _react2.default.createElement(
                'div',
                { className: 'carrousel-summary' },
                item.iconParams && item.iconParams.className && _react2.default.createElement('i', (0, _extends3.default)({}, item.iconParams, { className: 'icon carrousel-summary-icon' + (item.iconParams.className ? ' ' + item.iconParams.className : '') })),
                _react2.default.createElement(
                  'span',
                  { className: 'nowrap carrousel-summary-caption', style: { marginRight: '20px' } },
                  item.caption
                )
              )
            );
          }),
          list.length === 0 && childrenArr && childrenArr.map(function (item, index) {
            return _react2.default.createElement(
              'div',
              { className: 'carrousel-slide', key: index },
              item
            );
          })
        ),
        pagination === true && _react2.default.createElement('div', (0, _extends3.default)({}, paginationParams, { className: 'carrousel-pagination' + (paginationParams.className ? ' ' + paginationParams.className : '') })),
        pagination && pagination !== true && pagination,
        list.length > 1 && _react2.default.createElement('div', (0, _extends3.default)({}, prevParams, { className: 'carrousel-prev' + (prevParams.className ? ' ' + prevParams.className : '') })),
        list.length > 1 && _react2.default.createElement('div', (0, _extends3.default)({}, nextParams, { className: 'carrousel-next' + (nextParams.className ? ' ' + nextParams.className : '') }))
      );
    }
  }]);
  return Carrousel;
}(_react.Component);

Carrousel.propTypes = {
  style: _propTypes2.default.object, // 设置容器Style
  className: _propTypes2.default.string, // 设置容器className

  slideParams: _propTypes2.default.object,

  pagination: _propTypes2.default.oneOfType([// 是否显示小点点
  _propTypes2.default.bool, _propTypes2.default.node]),
  paginationParams: _propTypes2.default.object,

  prevParams: _propTypes2.default.object,
  nextParams: _propTypes2.default.object,

  stopPropagation: _propTypes2.default.bool, // 是否阻止点击事件的传播, 设置为false解决与FastClick插件touch事件冲突的问题
  activeIndex: _propTypes2.default.number, // 默认选中第几块

  loop: _propTypes2.default.bool, // 是否循环显示
  autoplay: _propTypes2.default.number, // 是否自动播放
  slidesPerView: _propTypes2.default.number, // 一屏显示几块,默认1块
  defaultSrc: _propTypes2.default.string, // 默认图片
  list: _propTypes2.default.array, // [{bg: 'xx', img: 'xx', iconParams: {}, caption: 'xx'}]
  enableOnChange: _propTypes2.default.bool, // 手动调用slideTo方法是否触发onChange事件回调
  speed: _propTypes2.default.number, // 动画过渡的速度
  onClick: _propTypes2.default.func, // func(s, e)
  onChange: _propTypes2.default.func,
  delay: _propTypes2.default.number, // 延迟初始化秒数

  children: _propTypes2.default.node // 轮播页,例<Carrousel><div>第1页</div></Carrousel>
};
Carrousel.defaultProps = {
  slideParams: {},
  paginationParams: {},
  prevParams: {},
  nextParams: {},
  stopPropagation: false, // 设置为false解决与FastClick插件touch事件冲突的问题
  activeIndex: 0,
  page: 0,
  loop: false,
  pagination: false,
  autoplay: 0,
  slidesPerView: 1,
  list: [],
  defaultSrc: '//res.waiqin365.com/d/seedsui/carrousel/default.png',
  enableOnChange: true,
  speed: 300,
  delay: 500
};
exports.default = Carrousel;
module.exports = exports['default'];