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

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function (_Component) {
  (0, _inherits3.default)(Loading, _Component);

  function Loading(props) {
    (0, _classCallCheck3.default)(this, Loading);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || (0, _getPrototypeOf2.default)(Loading)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Loading, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          type = _props.type,
          iconSrc = _props.iconSrc,
          caption = _props.caption,
          loadingStyle = _props.loadingStyle,
          maskBefore = _props.maskBefore;

      var content = _react2.default.createElement(
        'div',
        null,
        '\u52A0\u8F7D\u4E2D...'
      );
      if (iconSrc) {
        // 自定义样式
        content = _react2.default.createElement(
          'div',
          { className: 'loading-wrapper', style: loadingStyle },
          iconSrc && _react2.default.createElement('img', { alt: '', src: iconSrc, className: 'loading-icon' }),
          caption && _react2.default.createElement(
            'p',
            null,
            caption
          )
        );
      } else if (type === 'filling') {
        // 填料环
        content = _react2.default.createElement(
          'div',
          { className: 'loading-filling active', style: loadingStyle },
          _react2.default.createElement('div', { className: 'loading-filling-wrapper' })
        );
      } else if (type === 'floating') {
        // 流光
        content = _react2.default.createElement(
          'div',
          { className: 'loading-floating animated', style: loadingStyle },
          _react2.default.createElement(
            'div',
            { className: 'loading-floating-wrapper' },
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' }),
            _react2.default.createElement('div', { className: 'loading-floating-blade' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'loading-floating-caption' },
            caption
          )
        );
      }
      if (this.props.portal) {
        return (0, _reactDom.createPortal)(_react2.default.createElement(
          'div',
          { className: 'loading-mask mask active' + (className ? ' ' + className : ''), style: style },
          maskBefore,
          content
        ), this.props.portal);
      }
      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'loading-mask mask active' + (className ? ' ' + className : ''), style: style },
        maskBefore,
        content
      );
    }
  }]);
  return Loading;
}(_react.Component);

Loading.propTypes = {
  portal: _propTypes2.default.object, // 传送至DOM
  type: _propTypes2.default.string, // floating | filling
  maskBefore: _propTypes2.default.node,
  iconSrc: _propTypes2.default.string,
  caption: _propTypes2.default.string,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  loadingStyle: _propTypes2.default.object
};
Loading.defaultProps = {
  caption: '正在加载...',
  type: 'floating',
  style: {}
};
exports.default = Loading;
module.exports = exports['default'];