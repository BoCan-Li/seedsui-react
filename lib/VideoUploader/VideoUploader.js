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

var _Grid = require('./../Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Count = {
  fontSize: '12px',
  color: '#999',
  verticalAlign: '0',
  marginLeft: '4px'
};

var ImgUploader = function (_Component) {
  (0, _inherits3.default)(ImgUploader, _Component);

  function ImgUploader(props) {
    (0, _classCallCheck3.default)(this, ImgUploader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImgUploader.__proto__ || (0, _getPrototypeOf2.default)(ImgUploader)).call(this, props));

    _this.componentDidMount = function () {};

    return _this;
  }

  (0, _createClass3.default)(ImgUploader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          list = _props.list,
          className = _props.className,
          style = _props.style,
          caption = _props.caption,
          captionClassName = _props.captionClassName,
          captionStyle = _props.captionStyle,
          max = _props.max,
          showCount = _props.showCount,
          showDelete = _props.showDelete;

      return [caption && _react2.default.createElement(
        'div',
        {
          key: 'iuCaption',
          className: 'grid-title' + (captionClassName ? ' ' + captionClassName : ''),
          style: captionStyle },
        caption,
        showCount ? _react2.default.createElement(
          'span',
          { style: Count },
          '(',
          list.length,
          '/',
          max,
          ')'
        ) : null
      ), _react2.default.createElement(_Grid2.default, {
        key: 'iuGrid',
        type: 'video',
        onClickDelete: this.props.showDelete ? this.deleteImg : null,
        onClickAdd: this.chooseImg,
        list: list,
        showUpload: list.length < max && this.props.showUpload,
        showDelete: showDelete,
        className: 'grid-album' + (className ? ' ' + className : ''),
        iconClassName: 'icon-full',
        wing: 12,
        space: 12,
        style: style
      })];
    }
  }]);
  return ImgUploader;
}(_react.Component);

ImgUploader.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  caption: _propTypes2.default.node,
  captionStyle: _propTypes2.default.object,
  captionClassName: _propTypes2.default.string,
  list: _propTypes2.default.array,

  enableSafe: _propTypes2.default.bool,
  max: _propTypes2.default.number,
  sourceType: _propTypes2.default.array,
  sizeType: _propTypes2.default.oneOfType([// 压缩['original', 'compressed']
  _propTypes2.default.array, _propTypes2.default.string, _propTypes2.default.number]),

  showUpload: _propTypes2.default.bool, // 显示上传按钮
  showDelete: _propTypes2.default.bool, // 显示删除按钮
  readOnly: _propTypes2.default.bool,

  showCount: _propTypes2.default.bool, // 标题显示图片张字

  onChange: _propTypes2.default.func // 照片发生变化
};
ImgUploader.defaultProps = {
  enableSafe: false, // 安全上传,第次只能传一张
  max: 5,
  sourceType: ['album', 'camera'],
  sizeType: ['compressed'], // ['original', 'compressed']
  list: [], // 格式[{id: '用于删除标识,订货和微信上传的值', src: '预览地址,外勤客户端上传的地址', base64: '', type: 'video'}]
  showUpload: false,
  showDelete: false
};
exports.default = ImgUploader;
module.exports = exports['default'];