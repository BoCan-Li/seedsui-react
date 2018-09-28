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

var Star = function (_Component) {
  (0, _inherits3.default)(Star, _Component);

  function Star(props) {
    (0, _classCallCheck3.default)(this, Star);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Star.__proto__ || (0, _getPrototypeOf2.default)(Star)).call(this, props));

    _this.getArgs = function (e) {
      var args = _this.props.args;
      if (args !== undefined) {
        if (typeof args === 'string' && args === '$event') {
          args = e;
        } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
          args[args.indexOf('$event')] = e;
        }
      } else {
        args = e;
      }
      return args;
    };

    _this.onClick = function (e) {
      if (_this.props.onClick) {
        _this.props.onClick(_this.getArgs(e));
      }
    };

    return _this;
  }

  (0, _createClass3.default)(Star, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          args = _props.args,
          className = _props.className,
          onClick = _props.onClick,
          others = (0, _objectWithoutProperties3.default)(_props, ['args', 'className', 'onClick']);

      return _react2.default.createElement('i', (0, _extends3.default)({ className: 'star' + (className ? ' ' + className : '') }, others, { onClick: this.onClick }));
    }
  }]);
  return Star;
}(_react.Component);

Star.propTypes = {
  args: _propTypes2.default.any,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};
Star.defaultProps = {
  args: null
};
exports.default = Star;
module.exports = exports['default'];