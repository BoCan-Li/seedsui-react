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

var _reactDom = require('react-dom');

var _Carrousel = require('./../Carrousel');

var _Carrousel2 = _interopRequireDefault(_Carrousel);

var _InputPre = require('./../InputPre');

var _InputPre2 = _interopRequireDefault(_InputPre);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

var _instanceData = require('./instance.data.js');

var _instanceData2 = _interopRequireDefault(_instanceData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emoji = function (_Component) {
  (0, _inherits3.default)(Emoji, _Component);

  function Emoji(props) {
    (0, _classCallCheck3.default)(this, Emoji);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Emoji.__proto__ || (0, _getPrototypeOf2.default)(Emoji)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if (prevProps.autoFocus !== _this.props.autoFocus && _this.props.autoFocus === true && _this.$inputPre) {
        _this.$inputPre.$input.focus();
      }
    };

    _this.componentDidMount = function () {
      if (_this.props.autoFocus && _this.$inputPre) _this.$inputPre.$input.focus();
      if (_this.instance) return;
      var instance = new _instance2.default({
        data: _this.props.data,

        mask: _this.$el,
        isClickMaskHide: _this.props.isClickMaskHide,
        onClickMask: _this.onClickMask,

        onClickSubmit: _this.onClickSubmit,

        onChange: _this.props.onChange
      });
      _this.instance = instance;
    };

    _this.onClickMask = function (s, e) {
      if (_this.props.onClickMask) _this.props.onClickMask(Object.getArgs(e, _this.props.args));
    };

    _this.onClickSubmit = function (value, s, e) {
      if (_this.props.onClickSubmit) _this.props.onClickSubmit(value, Object.getArgs(e, _this.props.args));
    };

    _this.getFaceDOM = function () {
      var data = _this.props.data;
      // icons分页变量

      var icons = [];
      var page = 0;
      var index = 0;
      var count = 23;
      // icons分页
      for (var name in data) {
        if (index !== 0 && index % count === 0) {
          page++;
        }
        if (!icons[page]) icons[page] = [];
        icons[page].push({ key: name, value: data[name] });
        index++;
      }
      // 生成DOM
      return icons.map(function (icon, i) {
        return _react2.default.createElement(
          'div',
          { key: 'page' + i, className: 'emoji-carrousel-slide' },
          icon.map(function (item, index) {
            return _react2.default.createElement(
              'a',
              { key: 'face' + index, className: 'emoji-face', 'data-emoji': item.value, title: item.key },
              '\xA0'
            );
          }),
          _react2.default.createElement(
            'a',
            { className: 'emoji-face-delete' },
            '\xA0'
          )
        );
      });
    };

    return _this;
  }
  // 遮罩

  // 提交按钮

  // 表情


  (0, _createClass3.default)(Emoji, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          portal = _props.portal,
          args = _props.args,
          autoFocus = _props.autoFocus,
          value = _props.value,
          placeholder = _props.placeholder,
          isClickMaskHide = _props.isClickMaskHide,
          onClickMask = _props.onClickMask,
          maskClassName = _props.maskClassName,
          maskStyle = _props.maskStyle,
          className = _props.className,
          style = _props.style,
          licon = _props.licon,
          liconParams = _props.liconParams,
          onChange = _props.onChange,
          onClickSubmit = _props.onClickSubmit,
          others = (0, _objectWithoutProperties3.default)(_props, ['data', 'portal', 'args', 'autoFocus', 'value', 'placeholder', 'isClickMaskHide', 'onClickMask', 'maskClassName', 'maskStyle', 'className', 'style', 'licon', 'liconParams', 'onChange', 'onClickSubmit']);

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'mask emoji-mask active' + (maskClassName ? ' ' + maskClassName : ''), style: maskStyle, onClick: this.onClickMask },
        _react2.default.createElement(
          'div',
          { ref: function ref(el) {
              _this2.$container = el;
            }, className: 'emoji active' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
          (liconParams.src || liconParams.className) && _react2.default.createElement(_Icon2.default, liconParams),
          licon,
          _react2.default.createElement(
            'div',
            { className: 'emoji-edit' },
            _react2.default.createElement(_InputPre2.default, (0, _extends3.default)({
              ref: function ref(el) {
                _this2.$inputPre = el;
              },
              className: 'emoji-edit-input',
              inputStyle: { padding: '0' },
              valueBindProp: true,
              value: value,
              onChange: onChange,
              placeholder: placeholder
            }, others)),
            _react2.default.createElement('i', { ref: function ref(el) {
                _this2.$icon = el;
              }, className: 'icon emoji-edit-icon' }),
            _react2.default.createElement(
              _Button2.default,
              { className: 'emoji-edit-submit', disabled: !value, onClick: this.onClickSubmit },
              '\u63D0\u4EA4'
            )
          ),
          _react2.default.createElement(
            _Carrousel2.default,
            { ref: function ref(el) {
                _this2.$carrousel = el;
              }, pagination: true, className: 'carrousel-container emoji-carrousel', style: { display: 'none' } },
            this.getFaceDOM()
          )
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Emoji;
}(_react.Component);

Emoji.propTypes = {
  data: _propTypes2.default.object,

  portal: _propTypes2.default.object,
  args: _propTypes2.default.any,

  autoFocus: _propTypes2.default.bool,

  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,

  isClickMaskHide: _propTypes2.default.bool,
  onClickMask: _propTypes2.default.func,

  maskClassName: _propTypes2.default.string,
  maskStyle: _propTypes2.default.object,

  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  licon: _propTypes2.default.node,
  liconParams: _propTypes2.default.object,

  onChange: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func
};
Emoji.defaultProps = {
  autoFocus: false,
  data: _instanceData2.default,
  placeholder: '说点什么吧...',
  isClickMaskHide: false,
  liconParams: {}
};
exports.default = Emoji;
module.exports = exports['default'];