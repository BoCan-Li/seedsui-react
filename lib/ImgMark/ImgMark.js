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

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImgMark = function (_Component) {
  (0, _inherits3.default)(ImgMark, _Component);

  function ImgMark(props) {
    (0, _classCallCheck3.default)(this, ImgMark);
    return (0, _possibleConstructorReturn3.default)(this, (ImgMark.__proto__ || (0, _getPrototypeOf2.default)(ImgMark)).call(this, props));
  }

  (0, _createClass3.default)(ImgMark, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.instance) {
        if (prevProps.drawBg !== this.props.drawBg) {
          this.instance.setDrawBg(this.props.drawBg);
          this.instance.update();
        }
        if (prevProps.strokeStyle !== this.props.strokeStyle) {
          this.instance.setStrokeStyle(this.props.strokeStyle);
          this.instance.update();
        }
        if (prevProps.lineWidth !== this.props.lineWidth) {
          this.instance.setLineWidth(this.props.lineWidth);
          this.instance.update();
        }
        if (prevProps.quality !== this.props.quality) {
          this.instance.setQuality(this.props.quality);
          this.instance.update();
        }
        if (prevProps.data !== this.props.data) {
          this.instance.setData(this.props.data);
          this.instance.update();
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.instance) return;
      var instance = new _instance2.default(this.$el, {
        src: this.props.src,
        data: this.props.data,
        drawBg: this.props.drawBg,
        height: this.props.height,
        strokeStyle: this.props.strokeStyle,
        lineWidth: this.props.lineWidth,
        quality: this.props.quality
      });
      this.instance = instance;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          src = _props.src,
          data = _props.data,
          drawBg = _props.drawBg,
          strokeStyle = _props.strokeStyle,
          lineWidth = _props.lineWidth,
          quality = _props.quality,
          width = _props.width,
          height = _props.height,
          style = _props.style,
          className = _props.className,
          others = (0, _objectWithoutProperties3.default)(_props, ['src', 'data', 'drawBg', 'strokeStyle', 'lineWidth', 'quality', 'width', 'height', 'style', 'className']);

      var drawBgStyle = {};
      if (!drawBg) {
        drawBgStyle = { backgroundImage: 'url(' + src + ')' };
      }
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: 'imgmark' + (className ? ' ' + className : ''), style: Object({ width: width, height: height }, style) }, others),
        _react2.default.createElement(
          'div',
          { className: 'imgmark-loading active' },
          _react2.default.createElement('div', { className: 'imgmark-loading-icon' })
        ),
        _react2.default.createElement(
          'canvas',
          { ref: function ref(el) {
              _this2.$el = el;
            }, className: 'imgmark-wrapper', style: drawBgStyle },
          'Canvas\u753B\u677F'
        ),
        _react2.default.createElement(
          'div',
          { className: 'imgmark-error' },
          _react2.default.createElement('div', { className: 'imgmark-error-icon' }),
          _react2.default.createElement(
            'div',
            { className: 'imgmark-error-caption' },
            '\u56FE\u7247\u52A0\u8F7D\u5931\u8D25'
          )
        )
      );
    }
  }]);
  return ImgMark;
}(_react.Component);

ImgMark.propTypes = {
  // 数据源
  src: _propTypes2.default.string,
  data: _propTypes2.default.array,
  drawBg: _propTypes2.default.bool, // 是否绘制背景
  // canvas样式
  strokeStyle: _propTypes2.default.string,
  lineWidth: _propTypes2.default.number,
  quality: _propTypes2.default.number,
  // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
  width: _propTypes2.default.number, // 宽度
  height: _propTypes2.default.number, // 高度
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
};
ImgMark.defaultProps = {
  drawBg: true,
  strokeStyle: '#00ff00',
  lineWidth: 3,
  quality: 0.92,
  height: 300
};
exports.default = ImgMark;
module.exports = exports['default'];