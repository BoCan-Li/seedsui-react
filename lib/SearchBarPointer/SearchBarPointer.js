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

var SearchBarPointer = function (_Component) {
  (0, _inherits3.default)(SearchBarPointer, _Component);

  function SearchBarPointer(props) {
    (0, _classCallCheck3.default)(this, SearchBarPointer);
    return (0, _possibleConstructorReturn3.default)(this, (SearchBarPointer.__proto__ || (0, _getPrototypeOf2.default)(SearchBarPointer)).call(this, props));
  }

  (0, _createClass3.default)(SearchBarPointer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          inputClassName = _props.inputClassName,
          inputStyle = _props.inputStyle,
          placeholder = _props.placeholder,
          _onClick = _props.onClick;

      return _react2.default.createElement(
        'div',
        { className: 'searchbar' + (className ? ' ' + className : ''), style: style },
        _react2.default.createElement(
          'div',
          { className: 'searchbar-form' + (inputClassName ? ' ' + inputClassName : ''), style: inputStyle, onClick: function onClick() {
              _onClick();
            } },
          _react2.default.createElement('i', { className: 'icon searchbar-icon-search' }),
          _react2.default.createElement('input', { type: 'search', className: 'searchbar-input', readOnly: true, placeholder: placeholder })
        )
      );
    }
  }]);
  return SearchBarPointer;
}(_react.Component);

SearchBarPointer.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  inputClassName: _propTypes2.default.string,
  inputStyle: _propTypes2.default.object,
  placeholder: _propTypes2.default.string,

  onClick: _propTypes2.default.func
};
exports.default = SearchBarPointer;
module.exports = exports['default'];