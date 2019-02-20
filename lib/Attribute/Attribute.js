'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var Attribute = function (_Component) {
  (0, _inherits3.default)(Attribute, _Component);

  function Attribute(props, context) {
    (0, _classCallCheck3.default)(this, Attribute);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Attribute.__proto__ || (0, _getPrototypeOf2.default)(Attribute)).call(this, props, context));

    _this.onClick = function (e) {
      if (_this.props.onClick) _this.props.onClick(Object.getArgs(e, _this.props.args));
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Attribute, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          name = _props.name,
          required = _props.required,
          value = _props.value,
          showValidValue = _props.showValidValue,
          showValidName = _props.showValidName,
          className = _props.className,
          style = _props.style,
          cellClassName = _props.cellClassName,
          cellStyle = _props.cellStyle,
          requiredClassName = _props.requiredClassName,
          requiredStyle = _props.requiredStyle,
          nameClassName = _props.nameClassName,
          nameStyle = _props.nameStyle,
          valueClassName = _props.valueClassName,
          valueStyle = _props.valueStyle,
          rowAfter = _props.rowAfter,
          children = _props.children;

      var isShow = true;
      if (showValidValue && !children) isShow = false;
      if (showValidName && !name) isShow = false;
      return isShow && _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'attribute' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
        name && _react2.default.createElement(
          'div',
          { className: 'attribute-left' + (cellClassName ? ' ' + cellClassName : '') + ' ' + (nameClassName ? nameClassName : ''), style: (0, _assign2.default)({}, cellStyle, nameStyle) },
          required && _react2.default.createElement(
            'span',
            { className: 'required required-left' + (requiredClassName ? ' ' + requiredClassName : ''), style: requiredStyle },
            required
          ),
          name
        ),
        name && _react2.default.createElement(
          'div',
          { className: 'attribute-right' + (cellClassName ? ' ' + cellClassName : '') + '  ' + (valueClassName ? valueClassName : ''), style: (0, _assign2.default)({}, cellStyle, valueStyle) },
          value,
          children
        ),
        !name && children,
        rowAfter && rowAfter
      );
    }
  }]);
  return Attribute;
}(_react.Component);

Attribute.propTypes = {
  args: _propTypes2.default.any,

  name: _propTypes2.default.node, // 标题
  value: _propTypes2.default.node, // 内容
  required: _propTypes2.default.string, // 必填项

  showValidValue: _propTypes2.default.bool, // 值合法时显示
  showValidName: _propTypes2.default.bool, // name合法时显示

  className: _propTypes2.default.string, // align(左右对齐布局) | start(左端对齐) | between(两端对齐)
  style: _propTypes2.default.object,

  cellClassName: _propTypes2.default.string, // 列className
  cellStyle: _propTypes2.default.object,

  nameClassName: _propTypes2.default.string, // name的className
  nameStyle: _propTypes2.default.object,
  requiredClassName: _propTypes2.default.string, // required的className
  requiredStyle: _propTypes2.default.object,
  valueClassName: _propTypes2.default.string, // value的className
  valueStyle: _propTypes2.default.object,

  rowAfter: _propTypes2.default.node,
  children: _propTypes2.default.node,
  onClick: _propTypes2.default.func
};
Attribute.defaultProps = {
  args: null,
  className: 'attribute-margin'
};
exports.default = Attribute;
module.exports = exports['default'];