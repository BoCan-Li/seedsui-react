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

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notice = function (_Component) {
  (0, _inherits3.default)(Notice, _Component);

  function Notice(props) {
    (0, _classCallCheck3.default)(this, Notice);
    return (0, _possibleConstructorReturn3.default)(this, (Notice.__proto__ || (0, _getPrototypeOf2.default)(Notice)).call(this, props));
  }

  (0, _createClass3.default)(Notice, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          show = _props.show,
          className = _props.className,
          style = _props.style,
          wrapperParams = _props.wrapperParams,
          icon = _props.icon,
          iconParams = _props.iconParams,
          caption = _props.caption,
          captionParams = _props.captionParams,
          sndcaption = _props.sndcaption,
          sndcaptionParams = _props.sndcaptionParams,
          children = _props.children,
          others = (0, _objectWithoutProperties3.default)(_props, ['show', 'className', 'style', 'wrapperParams', 'icon', 'iconParams', 'caption', 'captionParams', 'sndcaption', 'sndcaptionParams', 'children']);

      return show ? _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: 'notice' + (className ? ' ' + className : ''), style: style }, others),
        _react2.default.createElement(
          'div',
          (0, _extends3.default)({}, wrapperParams, { className: 'notice-wrapper' + (wrapperParams.className ? ' ' + wrapperParams.className : '') }),
          (iconParams.src || iconParams.className) && _react2.default.createElement(_Icon2.default, (0, _extends3.default)({}, iconParams, { className: 'notice-icon' + (iconParams.className ? ' ' + iconParams.className : '') })),
          icon,
          caption && _react2.default.createElement(
            'div',
            (0, _extends3.default)({}, captionParams, { className: 'notice-caption' + (captionParams.className ? ' ' + captionParams.className : '') }),
            caption
          ),
          sndcaption && _react2.default.createElement(
            'div',
            (0, _extends3.default)({}, sndcaptionParams, { className: 'notice-sndcaption' + (sndcaptionParams.className ? ' ' + sndcaptionParams.className : '') }),
            sndcaption
          ),
          children
        )
      ) : null;
    }
  }]);
  return Notice;
}(_react.Component);

Notice.propTypes = {
  show: _propTypes2.default.bool,

  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  wrapperParams: _propTypes2.default.object,

  icon: _propTypes2.default.node,
  iconParams: _propTypes2.default.object,

  caption: _propTypes2.default.node,
  captionParams: _propTypes2.default.object,
  sndcaption: _propTypes2.default.node,
  sndcaptionParams: _propTypes2.default.object,

  children: _propTypes2.default.node
};
Notice.defaultProps = {
  show: true,
  wrapperParams: {},
  iconParams: {
    className: 'notice-icon-nodata'
  },
  caption: '暂无数据',
  captionParams: {},
  sndcaptionParams: {}
};
exports.default = Notice;
module.exports = exports['default'];