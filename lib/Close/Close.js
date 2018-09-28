'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Close = function (_Component) {
  (0, _inherits3.default)(Close, _Component);

  function Close(props) {
    (0, _classCallCheck3.default)(this, Close);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Close.__proto__ || (0, _getPrototypeOf2.default)(Close)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Close, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          others = (0, _objectWithoutProperties3.default)(_props, ['className', 'style']);

      return _react2.default.createElement('span', (0, _extends3.default)({ ref: function ref(el) {
          _this2.$el = el;
        }, className: 'icon' + (className ? ' ' + className : ''), style: style }, others));
    }
  }]);
  return Close;
}(_react.Component);

Close.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
Close.defaultProps = {
  className: 'close-icon-clear size18'
};
exports.default = Close;
module.exports = exports['default'];