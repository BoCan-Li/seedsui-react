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

var _Bridge = require('./../Bridge');

var _Bridge2 = _interopRequireDefault(_Bridge);

var _bridgeBrowser = require('./../Bridge/bridgeBrowser');

var _bridgeBrowser2 = _interopRequireDefault(_bridgeBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window._seeds_lang) window._seeds_lang = {}; // 国际化数据

var ImgMark = function (_Component) {
  (0, _inherits3.default)(ImgMark, _Component);

  function ImgMark(props) {
    (0, _classCallCheck3.default)(this, ImgMark);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImgMark.__proto__ || (0, _getPrototypeOf2.default)(ImgMark)).call(this, props));

    _this.validSrc = false;

    _this.onError = function () {
      _this.validSrc = false;
    };

    _this.onSuccess = function () {
      _this.validSrc = true;
    };

    _this.onClick = function () {
      var layer = ''; // 绘制的base64编码
      if (_this.props.preview) {
        if (!_this.validSrc) {
          _Bridge2.default.showToast((window._seeds_lang['hint_image_failed_to_load'] || '图片加载失败') + ', ' + (window._seeds_lang['cannot_preview'] || '无法预览'), { mask: false });
          return;
        }
        if (_this.props.isDrawSrc) {
          // 绘制背景
          layer = _this.instance.save();
          if (layer) {
            _Bridge2.default.previewImage({ urls: [layer], index: 0 });
          }
        } else {
          // 不绘制背景
          layer = _this.instance.save();
          var previewHTML = '<div class="preview-layer" style="background-image:url(' + layer + ')"></div>';
          if (_this.props.watermark) {
            // 水印
            previewHTML += '<div class="preview-layer" style="background-image:url(' + _this.props.watermark + ');background-repeat: repeat; background-size:auto;"></div>';
          }
          _bridgeBrowser2.default.previewImage({ urls: [_this.props.src], layerHTML: previewHTML });
        }
      }
      if (_this.props.onClick) _this.props.onClick(layer);
    };

    return _this;
  }

  (0, _createClass3.default)(ImgMark, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.instance) {
        if (prevProps.isDrawSrc !== this.props.isDrawSrc) {
          this.instance.setIsDrawSrc(this.props.isDrawSrc);
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
        isDrawSrc: this.props.isDrawSrc,
        height: this.props.height,
        strokeStyle: this.props.strokeStyle,
        lineWidth: this.props.lineWidth,
        quality: this.props.quality,
        onError: this.onError,
        onSuccess: this.onSuccess
      });
      this.instance = instance;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          src = _props.src,
          isDrawSrc = _props.isDrawSrc,
          watermark = _props.watermark,
          strokeStyle = _props.strokeStyle,
          lineWidth = _props.lineWidth,
          quality = _props.quality,
          width = _props.width,
          height = _props.height,
          style = _props.style,
          className = _props.className,
          onClick = _props.onClick,
          preview = _props.preview,
          children = _props.children,
          others = (0, _objectWithoutProperties3.default)(_props, ['data', 'src', 'isDrawSrc', 'watermark', 'strokeStyle', 'lineWidth', 'quality', 'width', 'height', 'style', 'className', 'onClick', 'preview', 'children']);

      var isDrawSrcStyle = {};
      if (!isDrawSrc) {
        isDrawSrcStyle = { backgroundImage: 'url(' + src + ')' };
      }
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: 'imgmark' + (className ? ' ' + className : ''), style: Object({ width: width, height: height }, style), onClick: this.onClick }, others),
        _react2.default.createElement(
          'div',
          { className: 'imgmark-loading active' },
          _react2.default.createElement('div', { className: 'imgmark-loading-icon' })
        ),
        _react2.default.createElement(
          'canvas',
          { ref: function ref(el) {
              _this2.$el = el;
            }, className: 'imgmark-wrapper', style: isDrawSrcStyle },
          'Canvas\u753B\u677F'
        ),
        _react2.default.createElement(
          'div',
          { className: 'imgmark-error' },
          _react2.default.createElement('div', { className: 'imgmark-error-icon' }),
          _react2.default.createElement(
            'div',
            { className: 'imgmark-error-caption' },
            window._seeds_lang['hint_image_failed_to_load'] || '图片加载失败'
          )
        ),
        children
      );
    }
  }]);
  return ImgMark;
}(_react.Component);

ImgMark.propTypes = {
  // 数据源
  data: _propTypes2.default.array,
  src: _propTypes2.default.string,
  // canvas样式
  isDrawSrc: _propTypes2.default.bool, // 是否绘制背景
  watermark: _propTypes2.default.string,
  strokeStyle: _propTypes2.default.string,
  lineWidth: _propTypes2.default.number,
  quality: _propTypes2.default.number,
  // 不能使用style制定宽高,canvas用style的width|height会导致绘图位置不正确
  width: _propTypes2.default.number, // 宽度
  height: _propTypes2.default.number, // 高度
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,

  onClick: _propTypes2.default.func,

  preview: _propTypes2.default.bool, // 是否预览

  children: _propTypes2.default.node
};
ImgMark.defaultProps = {
  isDrawSrc: false,
  strokeStyle: '#00ff00',
  lineWidth: 3,
  quality: 0.92,
  height: 300,
  preview: true
};
exports.default = ImgMark;
module.exports = exports['default'];