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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OnOff = function (_Component) {
  (0, _inherits3.default)(OnOff, _Component);

  function OnOff(props) {
    (0, _classCallCheck3.default)(this, OnOff);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OnOff.__proto__ || (0, _getPrototypeOf2.default)(OnOff)).call(this, props));

    _this.onClick = function () {
      var _this$props = _this.props,
          readOnly = _this$props.readOnly,
          checked = _this$props.checked,
          onClick = _this$props.onClick;

      if (readOnly) return;
      if (onClick) {
        if (checked) onClick(true);else onClick(false);
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(OnOff, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          checked = _props.checked,
          onCaption = _props.onCaption,
          offCaption = _props.offCaption,
          readOnly = _props.readOnly,
          onClick = _props.onClick,
          others = (0, _objectWithoutProperties3.default)(_props, ['className', 'style', 'checked', 'onCaption', 'offCaption', 'readOnly', 'onClick']);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: 'onoff' + (className ? ' ' + className : '') + (onCaption && offCaption ? '' : ' notext') + (checked ? ' active' : ''), style: style, 'data-on': onCaption, 'data-off': offCaption, onClick: this.onClick }, others),
        _react2.default.createElement('div', { className: 'onoff-handle' })
      );
    }
  }]);
  return OnOff;
}(_react.Component);

OnOff.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  readOnly: _propTypes2.default.bool,
  checked: _propTypes2.default.bool,
  onCaption: _propTypes2.default.string,
  offCaption: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};
OnOff.defaultProps = {
  onCaption: '',
  offCaption: ''
};
exports.default = OnOff;
module.exports = exports['default'];