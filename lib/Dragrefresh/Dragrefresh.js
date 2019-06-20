'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _Notice = require('./../Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

var _ImgLazy = require('./../ImgLazy');

var _ImgLazy2 = _interopRequireDefault(_ImgLazy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dragrefresh = function (_Component) {
  (0, _inherits3.default)(Dragrefresh, _Component);

  function Dragrefresh(props) {
    (0, _classCallCheck3.default)(this, Dragrefresh);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dragrefresh.__proto__ || (0, _getPrototypeOf2.default)(Dragrefresh)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if (prevProps.hasMore === _this.props.hasMore) return;
      // 刷新完成则设置刷新
      _this.setPagination(prevProps.hasMore, _this.props.hasMore);
    };

    _this.init = function () {
      var onScroll = _this.props.onScroll;

      var instance = new _instance2.default({
        threshold: _this.props.threshold,
        end: _this.props.end,
        endRefresh: _this.props.endRefresh,
        moveTimeout: _this.props.moveTimeout,
        container: _this.$el,
        onScroll: onScroll,
        onTopRefresh: _this.onTopRefresh, // 头部刷新,加载第一页
        onBottomRefresh: _this.onBottomRefresh, // 底部刷新,加载下一页
        // 构建实体
        topContainer: _this.$elTopBox,
        // 实体交互
        duration: 150,
        onPull: function onPull(e) {
          var topContainer = e.topContainer;
          topContainer.style.height = e.touches.currentPosY + 'px';
          var topIcon = topContainer.querySelector('.df-pull-icon');
          var topCaption = topContainer.querySelector('.df-pull-caption');
          if (!e.isLoading) {
            if (e.touches.currentPosY >= e.params.threshold) {
              if (topIcon) topIcon.classList.add('df-pull-icon-down');
              if (topCaption) topCaption.innerHTML = '释放立即刷新';
            } else {
              if (topIcon) topIcon.classList.remove('df-pull-icon-down');
              if (topCaption) topCaption.innerHTML = '下拉可以刷新';
            }
          }
        },
        onShowTop: function onShowTop(e) {
          var topContainer = e.topContainer;
          var topIcon = topContainer.querySelector('.df-pull-icon');
          var topCaption = topContainer.querySelector('.df-pull-caption');
          topContainer.style.height = e.params.threshold + 'px';
          if (topIcon) topIcon.classList.remove('df-pull-icon-down');
          if (topIcon) topIcon.classList.add('df-pull-icon-loading');
          if (topCaption) topCaption.innerHTML = '正在刷新...';
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
      });
      _this.instance = instance;
    };

    _this.onTopRefresh = function () {
      _this.props.onTopRefresh();
    };

    _this.onBottomRefresh = function () {
      if (!_this.props.onBottomRefresh) return;
      var hasMore = _this.props.hasMore;

      if (hasMore !== 0 && hasMore !== -1 && hasMore !== 404) {
        _this.props.onBottomRefresh();
      } else {
        if (_this.instance) _this.instance.isLoading = false; // 暂无数据时, 设置为可刷新
      }
    };

    _this.lazyLoad = function () {
      if (!_this.$el) return;
      if (_this.timeout) window.clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        if (_this.lazy) {
          _this.lazy.load();
        } else {
          _this.lazy = new _ImgLazy2.default({
            overflowContainer: _this.$el
          });
          _this.lazy.load();
        }
      }, 500);
    };

    _this.setPagination = function (prevHasMore, hasMore) {
      // 如果还没有初始化完成,则会再轮询调用一下
      if (!_this.instance) {
        setTimeout(function () {
          _this.setPagination(prevHasMore, hasMore);
        }, 100);
        return;
      }
      console.log('hasMore: \u7531' + prevHasMore + '\u53D8\u6210' + hasMore);
      // 无数据时不允许触发刷新
      if (hasMore === 404) {
        _this.instance.detach();
      } else if (prevHasMore === 404 && hasMore !== 404) {
        _this.instance.attach();
      }
      // 刷新完成, 需收起头
      if (hasMore !== -2) {
        _this.instance.hideTop();
      }
      // 设置为可刷新
      _this.instance.isLoading = false;
      // 刷新完成, 还有数据
      if (hasMore === 1) {
        // 如果还有数据，并且如果没有滚动条，则继续加载
        if (!_this.instance.hasScroll()) {
          console.log('还有数据,但没有滚动条,继续加载...');
          _this.instance.bottomRefresh();
        }
      }
      // 懒加载
      if (_this.props.lazyLoad) _this.lazyLoad();
    };

    return _this;
  }

  (0, _createClass3.default)(Dragrefresh, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
      this.setPagination(undefined, this.props.hasMore);
    }
    // 实例化

    // 头部刷新

    // 底部刷新

    // 懒人加载

    // 控制刷新

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          onTopRefresh = _props.onTopRefresh,
          onBottomRefresh = _props.onBottomRefresh,
          showNoData = _props.showNoData,
          hasMore = _props.hasMore,
          noDataParams = _props.noDataParams;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'container' + (className ? ' ' + className : ''), style: style },
        onTopRefresh && _react2.default.createElement(
          'div',
          { ref: function ref(el) {
              _this2.$elTopBox = el;
            }, className: 'SID-Dragrefresh-TopContainer df-pull' },
          _react2.default.createElement(
            'div',
            { className: 'df-pull-box' },
            _react2.default.createElement('div', { className: 'df-pull-icon' }),
            _react2.default.createElement(
              'div',
              { className: 'df-pull-caption' },
              '\u4E0B\u62C9\u53EF\u4EE5\u5237\u65B0'
            )
          )
        ),
        this.props.children,
        onBottomRefresh && (hasMore === 1 || hasMore === -2) && _react2.default.createElement(
          'div',
          { className: 'SID-Dragrefresh-BottomContainer df-pull', style: { height: '50px' } },
          _react2.default.createElement(
            'div',
            { className: 'df-pull-box' },
            _react2.default.createElement('div', { className: 'df-pull-icon df-pull-icon-loading' }),
            _react2.default.createElement(
              'div',
              { className: 'df-pull-caption' },
              '\u6B63\u5728\u52A0\u8F7D...'
            )
          )
        ),
        onBottomRefresh && hasMore === 0 && _react2.default.createElement(
          'div',
          { className: 'SID-Dragrefresh-NoDataContainer df-pull', style: { height: '50px' } },
          _react2.default.createElement(
            'div',
            { className: 'df-pull-box' },
            _react2.default.createElement(
              'div',
              { className: 'df-pull-caption' },
              '\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86'
            )
          )
        ),
        onBottomRefresh && hasMore === -1 && _react2.default.createElement(
          'div',
          { className: 'SID-Dragrefresh-ErrorContainer df-pull', style: { height: '50px' } },
          _react2.default.createElement(
            'div',
            { className: 'df-pull-box' },
            _react2.default.createElement(
              'div',
              { className: 'df-pull-caption' },
              '\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5'
            )
          )
        ),
        hasMore === 404 && showNoData && _react2.default.createElement(_Notice2.default, (0, _extends3.default)({ caption: '暂无数据' }, noDataParams))
      );
    }
  }]);
  return Dragrefresh;
}(_react.Component);

Dragrefresh.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,

  threshold: _propTypes2.default.number, // 头部下拉的触发位置
  end: _propTypes2.default.number, // 头部下拉的结束位置
  endRefresh: _propTypes2.default.bool, // 滑动到指位置后自动刷新
  moveTimeout: _propTypes2.default.number, // 滑动超时, 解决ios手指滑动到原生tabbar上, 不触发onTouchEnd
  onTopRefresh: _propTypes2.default.func,
  onTopComplete: _propTypes2.default.func,
  onBottomRefresh: _propTypes2.default.func,
  onBottomComplete: _propTypes2.default.func,

  children: _propTypes2.default.node,
  hasMore: _propTypes2.default.number, // hasMore: 0.无更多数据, 1.头部刷新完成, 2.底部刷新完成, 404.一条数据都没有, -1. 加载错误, -2. 重置状态,为了后面可以更新DOM

  showNoData: _propTypes2.default.bool, // 是否允许暂无数据
  noDataParams: _propTypes2.default.object,

  lazyLoad: _propTypes2.default.bool,

  onScroll: _propTypes2.default.func // 滚动事件
};
Dragrefresh.defaultProps = {
  showNoData: true
};
exports.default = Dragrefresh;
module.exports = exports['default'];