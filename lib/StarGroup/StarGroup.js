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

var StarGroup = function (_Component) {
  (0, _inherits3.default)(StarGroup, _Component);

  function StarGroup(props) {
    (0, _classCallCheck3.default)(this, StarGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StarGroup.__proto__ || (0, _getPrototypeOf2.default)(StarGroup)).call(this, props));

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

    return _this;
  }

  (0, _createClass3.default)(StarGroup, [{
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
      if (onChange) onChange(num, this.getArgs(e));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          max = _props2.max,
          star = _props2.star,
          className = _props2.className,
          style = _props2.style;

      var stars = [];
      for (var i = 1; i <= max; i++) {
        stars.push(i);
      }
      return _react2.default.createElement(
        'div',
        { className: 'stargroup' + (className ? ' ' + className : ''), style: style },
        stars.map(function (num) {
          return _react2.default.createElement(_Star2.default, { onClick: function onClick(e) {
              _this2.onChange(e, num);
            }, key: num, active: num <= star ? true : false });
        })
      );
    }
  }]);
  return StarGroup;
}(_react.Component);

StarGroup.propTypes = {
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  star: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
  // args: PropTypes.array
};
StarGroup.defaultProps = {
  args: null,
  min: 0,
  max: 5
};
exports.default = StarGroup;
module.exports = exports['default'];