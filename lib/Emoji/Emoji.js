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

var _reactDom = require('react-dom');

var _Carrousel = require('./../Carrousel');

var _Carrousel2 = _interopRequireDefault(_Carrousel);

var _InputPre = require('./../InputPre');

var _InputPre2 = _interopRequireDefault(_InputPre);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emoji = function (_Component) {
  (0, _inherits3.default)(Emoji, _Component);

  function Emoji(props) {
    (0, _classCallCheck3.default)(this, Emoji);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Emoji.__proto__ || (0, _getPrototypeOf2.default)(Emoji)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if (prevProps.show !== _this.props.show && _this.props.show === true && _this.$inputPre) {
        _this.$inputPre.$input.focus();
      }
    };

    _this.componentDidMount = function () {
      _instance2.default.init(_this.$inputPre.$input);
    };

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

    _this.onClickMask = function (e) {
      if (_this.props.onClickMask) _this.props.onClickMask(_this.getArgs(e));
      e.stopPropagation();
    };

    _this.onClickSubmit = function (e) {
      if (_this.props.onClickSubmit) _this.props.onClickSubmit(_this.props.value, _this.getArgs(e));
    };

    _this.onClick = function (e) {
      var target = e.target;
      // 点击表情
      if (target.getAttribute('data-emoji')) {
        var value = _instance2.default.insertFace(target.getAttribute('alt'));
        if (_this.props.onChange) _this.props.onChange(value, _this.getArgs(e));
      }
      e.stopPropagation();
    };

    _this.getFaceDOM = function () {
      // 将icons分页
      var icons = [];
      var page = 0;
      var index = 0;
      for (var name in _instance2.default.icons) {
        if (index !== 0 && index % 21 === 0) {
          page++;
        }
        if (!icons[page]) icons[page] = [];
        icons[page].push({ key: name, value: _instance2.default.icons[name] });
        index++;
      }
      // 生成DOM
      return icons.map(function (icon, i) {
        return _react2.default.createElement(
          'div',
          { key: 'page' + i },
          icon.map(function (item, index) {
            return _react2.default.createElement(
              'a',
              { key: 'face' + index, 'data-emoji': item.value, alt: item.key },
              '\xA0'
            );
          })
        );
      });
    };

    _this.state = {
      instance: _instance2.default
    };
    return _this;
  }

  (0, _createClass3.default)(Emoji, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          show = _props.show,
          placeholder = _props.placeholder,
          maskClassName = _props.maskClassName,
          maskStyle = _props.maskStyle,
          className = _props.className,
          style = _props.style,
          onChange = _props.onChange;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'mask emoji-mask' + (maskClassName ? ' ' + maskClassName : '') + (show ? ' active' : ''), style: maskStyle, onClick: this.onClickMask },
        _react2.default.createElement(
          'div',
          { className: 'emoji' + (className ? ' ' + className : '') + (show ? ' active' : ''), style: style, onClick: this.onClick },
          _react2.default.createElement(
            _Carrousel2.default,
            { pagination: true, className: 'carrousel-container', style: { height: '186px' } },
            this.getFaceDOM()
          ),
          _react2.default.createElement(_InputPre2.default, {
            ref: function ref(el) {
              _this2.$inputPre = el;
            },
            className: 'emoji-input', inputClassName: 'basketline', inputStyle: { padding: '4px 8px' },
            valueBindProp: true,
            value: value,
            onChange: onChange,
            placeholder: placeholder,
            rcaption: _react2.default.createElement(
              _Button2.default,
              { className: 'link outline emoji-button', disabled: !value, onClick: this.onClickSubmit },
              '\u63D0\u4EA4'
            )
          })
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Emoji;
}(_react.Component);

Emoji.propTypes = {
  portal: _propTypes2.default.object,
  args: _propTypes2.default.any,
  show: _propTypes2.default.bool,

  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,

  isClickMaskHide: _propTypes2.default.bool,
  onClickMask: _propTypes2.default.func,

  maskClassName: _propTypes2.default.string,
  maskStyle: _propTypes2.default.object,

  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  onChange: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func
};
Emoji.defaultProps = {
  args: null,
  placeholder: '请输入',
  isClickMaskHide: false
};
exports.default = Emoji;
module.exports = exports['default'];