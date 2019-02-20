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

var _Star = require('./../Star');

var _Star2 = _interopRequireDefault(_Star);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputStar = function (_Component) {
  (0, _inherits3.default)(InputStar, _Component);

  function InputStar(props) {
    (0, _classCallCheck3.default)(this, InputStar);
    return (0, _possibleConstructorReturn3.default)(this, (InputStar.__proto__ || (0, _getPrototypeOf2.default)(InputStar)).call(this, props));
  }

  (0, _createClass3.default)(InputStar, [{
    key: 'onChange',
    value: function onChange(e, argNum) {
      var _props = this.props,
          min = _props.min,
          onChange = _props.onChange,
          onError = _props.onError;

      var num = argNum;
      if (num < min) {
        if (onError) {
          onError('\u6700\u5C0F\u4E0D\u80FD\u5C0F\u4E8E' + min + '\u9897\u661F');
        } else {
          num = min;
        }
      }
      if (onChange) onChange(num, Object.getArgs(e, this.props.args));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          max = _props2.max,
          min = _props2.min,
          value = _props2.value,
          className = _props2.className,
          style = _props2.style;

      var stars = [];
      for (var i = 1; i <= max; i++) {
        stars.push(i);
      }
      var current = value;
      if (current < min) current = min;
      return _react2.default.createElement(
        'div',
        { className: 'input-star' + (className ? ' ' + className : ''), style: style },
        stars.map(function (index) {
          return _react2.default.createElement(_Star2.default, { onClick: function onClick(e) {
              _this2.onChange(e, index);
            }, key: index, className: index <= current ? 'active' : '' });
        })
      );
    }
  }]);
  return InputStar;
}(_react.Component);

InputStar.propTypes = {
  args: _propTypes2.default.any,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
InputStar.defaultProps = {
  args: null,
  value: 0,
  min: 0,
  max: 5
};
exports.default = InputStar;
module.exports = exports['default'];