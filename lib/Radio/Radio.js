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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function (_Component) {
  (0, _inherits3.default)(Radio, _Component);

  function Radio(props) {
    (0, _classCallCheck3.default)(this, Radio);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Radio.__proto__ || (0, _getPrototypeOf2.default)(Radio)).call(this, props));

    _this.onClick = function (e) {
      if (_this.props.disabled) return;
      if (_this.props.onClick) {
        _this.props.onClick(_this.$input.checked, Object.getArgs(e, _this.props.args));
      }
    };

    return _this;
  }

  (0, _createClass3.default)(Radio, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          name = _props.name,
          value = _props.value,
          checked = _props.checked,
          caption = _props.caption,
          captionClassName = _props.captionClassName,
          captionStyle = _props.captionStyle;

      return _react2.default.createElement(
        'div',
        { className: 'radio-box' + (className ? ' ' + className : ''), onClick: this.onClick, style: style },
        _react2.default.createElement('input', { readOnly: true, checked: checked, type: 'radio', className: 'radio events-none', name: name, value: value, ref: function ref(el) {
            _this2.$input = el;
          } }),
        caption && _react2.default.createElement(
          'span',
          { className: 'radio-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle },
          caption
        )
      );
    }
  }]);
  return Radio;
}(_react.Component);

Radio.propTypes = {
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,

  name: _propTypes2.default.string,
  value: _propTypes2.default.string,
  checked: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,

  caption: _propTypes2.default.string,
  captionClassName: _propTypes2.default.string,
  captionStyle: _propTypes2.default.object
};
Radio.defaultProps = {
  args: null,
  value: '',
  checked: false
};
exports.default = Radio;
module.exports = exports['default'];