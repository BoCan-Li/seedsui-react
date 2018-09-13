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

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Handsign = function (_Component) {
  (0, _inherits3.default)(Handsign, _Component);

  function Handsign(props) {
    (0, _classCallCheck3.default)(this, Handsign);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Handsign.__proto__ || (0, _getPrototypeOf2.default)(Handsign)).call(this, props));

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(Handsign, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.instance) return;
      var instance = new _instance2.default(this.$el, {
        strokeStyle: this.props.strokeStyle,
        lineWidth: this.props.lineWidth,
        quality: this.props.quality
      });
      this.setState({
        instance: instance
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          style = _props.style,
          className = _props.className;

      return _react2.default.createElement(
        'canvas',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: className, style: style, width: width, height: height },
        'Canvas\u753B\u677F'
      );
    }
  }]);
  return Handsign;
}(_react.Component);

Handsign.propTypes = {
  strokeStyle: _propTypes2.default.string,
  lineWidth: _propTypes2.default.number,
  quality: _propTypes2.default.number,
  // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
  width: _propTypes2.default.number, // 宽度
  height: _propTypes2.default.number, // 高度
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
};
Handsign.defaultProps = {
  strokeStyle: '#000',
  lineWidth: 3,
  quality: 0.92,
  width: 300,
  height: 300
};
exports.default = Handsign;
module.exports = exports['default'];