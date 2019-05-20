'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var LotteryWheel = function (_Component) {
  (0, _inherits3.default)(LotteryWheel, _Component);

  function LotteryWheel(props) {
    (0, _classCallCheck3.default)(this, LotteryWheel);
    return (0, _possibleConstructorReturn3.default)(this, (LotteryWheel.__proto__ || (0, _getPrototypeOf2.default)(LotteryWheel)).call(this, props));
  }

  (0, _createClass3.default)(LotteryWheel, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if ((0, _stringify2.default)(prevProps.data) !== (0, _stringify2.default)(this.props.data)) {
        this.instance.params.data = this.props.data;
        this.instance.init();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.instance) return;
      var instance = new _instance2.default(this.$el, {
        // 间隔
        spacing: this.props.spacing,
        // 数据
        data: this.props.data,
        // 数据默认值
        font: this.props.font,
        fontTop: this.props.fontTop,
        fontFillStyle: this.props.fontFillStyle,

        bgFillStyle: this.props.bgFillStyle,
        bgStrokeStyle: this.props.bgStrokeStyle,
        bgLineWidth: this.props.bgLineWidth,

        iconWidth: this.props.iconWidth,
        iconHeight: this.props.iconHeight,
        iconTop: this.props.iconTop,

        around: this.props.around,
        // 保存
        suffix: this.props.suffix,
        quality: this.props.quality
      });
      this.instance = instance;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          className = _props.className,
          style = _props.style;

      return _react2.default.createElement(
        'canvas',
        { ref: function ref(el) {
            _this2.$el = el;
          }, width: width, height: height, className: className, style: style },
        'Canvas\u62BD\u5956\u8F6E\u76D8'
      );
    }
  }]);
  return LotteryWheel;
}(_react.Component);

LotteryWheel.propTypes = {
  // 数据源
  data: _propTypes2.default.array, // [{text: '', icon: '', font: '', fontTop...同数据默认值}]
  // 数据默认值
  fontFamily: _propTypes2.default.string,
  fontSize: _propTypes2.default.number,
  fontTop: _propTypes2.default.number,
  fontFillStyle: _propTypes2.default.string,

  bgFillStyle: _propTypes2.default.string,
  bgStrokeStyle: _propTypes2.default.string,
  bgLineWidth: _propTypes2.default.number,

  iconWidth: _propTypes2.default.number,
  iconHeight: _propTypes2.default.number,
  iconTop: _propTypes2.default.number,

  around: _propTypes2.default.number, // 转动圈数, 默认转6圈
  // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
  width: _propTypes2.default.number, // 宽度
  height: _propTypes2.default.number, // 高度
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  // 间隔
  spacing: _propTypes2.default.number,
  // 保存
  suffix: _propTypes2.default.string,
  quality: _propTypes2.default.number
};
LotteryWheel.defaultProps = {};
exports.default = LotteryWheel;
module.exports = exports['default'];