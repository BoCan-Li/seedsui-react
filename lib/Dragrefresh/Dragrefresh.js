'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _instancePull = require('./instance.pull.js');

var _instancePull2 = _interopRequireDefault(_instancePull);

var _instance = require('./../ImgLazy/instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dragrefresh = function (_Component) {
  (0, _inherits3.default)(Dragrefresh, _Component);

  function Dragrefresh(props) {
    (0, _classCallCheck3.default)(this, Dragrefresh);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dragrefresh.__proto__ || (0, _getPrototypeOf2.default)(Dragrefresh)).call(this, props));

    _this.componentDidMount = function () {
      _this.init();
      console.log('dragrefresh:DidMount, hasMore:' + _this.props.hasMore);
      _this.setPagination();
    };

    _this.init = function () {
      var onScroll = _this.props.onScroll;

      var instance = new _instancePull2.default({
        container: _this.$el,
        onScroll: onScroll,
        onTopRefresh: _this.props.onTopRefresh ? _this.props.onTopRefresh : null, // 头部刷新,加载第一页
        onTopComplete: _this.props.onTopComplete ? _this.props.onTopComplete : null, // 头部完成
        onBottomRefresh: _this.props.onBottomRefresh ? _this.props.onBottomRefresh : null, // 底部刷新,加载下一页
        onBottomComplete: _this.props.onBottomComplete ? _this.props.onBottomComplete : null // 底部完成
      });
      _this.setState({
        instance: instance
      });
      // 懒人加载
      var imgLazy = null;
      if (_this.props.lazyLoad && !imgLazy) {
        imgLazy = new _instance2.default({
          overflowContainer: _this.$el
        });
      }
    };

    _this.componentDidUpdate = function (prevProps) {
      if (prevProps.hasMore === _this.props.hasMore) return;
      if (_this.props.hasMore === 404) {
        console.log('dragrefresh:解除touch事件，暂无数据');
        _this.state.instance.detach();
      } else if (prevProps.hasMore === 404 && _this.props.hasMore !== 404) {
        /* this.setState({
          noData: false
        }); */
        console.log('dragrefresh:绑定touch事件，有数据');
        _this.state.instance.attach();
      }
      console.log('dragrefresh:DidUpdate, hasMore:' + _this.props.hasMore);
      _this.setPagination();
    };

    _this.setPagination = function () {
      // 如果还没有初始化完成,则会再轮询调用一下
      if (!_this.state.instance) {
        setTimeout(function () {
          _this.setPagination();
        }, 100);
        return;
      }
      if (_this.props.hasMore === 1) {
        // 头部完成
        console.log('dragrefresh:头部完成');
        _this.state.instance.setPagination(false, false);
      } else if (_this.props.hasMore === 2) {
        // 底部完成
        console.log('dragrefresh:底部完成');
        _this.state.instance.setPagination(true, false);
      } else if (_this.props.hasMore === 0) {
        // 没有更多数据
        console.log('dragrefresh:没有更多数据');
        _this.state.instance.setPagination(true, true);
      } else if (_this.props.hasMore === -1) {
        console.log('dragrefresh:网络错误');
        _this.state.instance.setPagination(true, true, true);
      } else if (_this.props.hasMore === 404) {
        // if (this.state.noData === true) return;
        console.log('dragrefresh:没有一条数据');
        _this.state.instance.setPagination(true, true);
        /* this.setState({
          noData: true
        }); */
      }
    };

    _this.state = {
      instance: null
      // noData: false
    };
    return _this;
  }

  (0, _createClass3.default)(Dragrefresh, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          onTopRefresh = _props.onTopRefresh,
          onBottomRefresh = _props.onBottomRefresh,
          showNoData = _props.showNoData,
          noDataClassName = _props.noDataClassName,
          noDataStyle = _props.noDataStyle,
          noDataCaption = _props.noDataCaption,
          noDataIconSrc = _props.noDataIconSrc,
          noDataIconClassName = _props.noDataIconClassName,
          noDataOnClick = _props.noDataOnClick;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'container' + (className ? ' ' + className : ''), style: style },
        onTopRefresh && _react2.default.createElement(
          'div',
          { className: 'SID-Dragrefresh-TopContainer df-pull', style: { transitionDuration: '150ms', height: '0px' } },
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
        onBottomRefresh && _react2.default.createElement(
          'div',
          { className: 'SID-Dragrefresh-BottomContainer df-pull', style: { height: '50px' } },
          this.props.hasMore !== -3 && _react2.default.createElement(
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
        onBottomRefresh && _react2.default.createElement(
          'div',
          { className: 'SID-Dragrefresh-NoDataContainer df-pull hide', style: { height: '50px' } },
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
        onBottomRefresh && _react2.default.createElement(
          'div',
          { className: 'SID-Dragrefresh-ErrorContainer df-pull hide', style: { height: '50px' } },
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
        this.props.hasMore === 404 && showNoData && _react2.default.createElement(_Notice2.default, { className: noDataClassName, style: noDataStyle, caption: noDataCaption || '暂无数据', iconSrc: noDataIconSrc, iconClassName: noDataIconClassName, onClick: noDataOnClick })
      );
    }
  }]);
  return Dragrefresh;
}(_react.Component);

Dragrefresh.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onTopRefresh: _propTypes2.default.func,
  onTopComplete: _propTypes2.default.func,
  onBottomRefresh: _propTypes2.default.func,
  onBottomComplete: _propTypes2.default.func,
  children: _propTypes2.default.node,
  hasMore: _propTypes2.default.number, // 1头部完成 | 2底部完成 | 0没有更多数据 | -1网络错误 | 404找不到数据 | -2空闲但展现底部转圈 | -3空闲但不展现底部转圈

  showNoData: _propTypes2.default.bool, // 是否允许暂无数据
  noDataClassName: _propTypes2.default.string,
  noDataStyle: _propTypes2.default.object,
  noDataCaption: _propTypes2.default.string,
  noDataIconSrc: _propTypes2.default.string,
  noDataIconClassName: _propTypes2.default.string,
  noDataOnClick: _propTypes2.default.func, // 点击暂无数据

  lazyLoad: _propTypes2.default.bool,

  onScroll: _propTypes2.default.func // 滚动事件
};
Dragrefresh.defaultProps = {
  noDataIconClassName: 'notice-icon-nodata',
  showNoData: true
};
exports.default = Dragrefresh;
module.exports = exports['default'];