'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _NumBox = require('./../NumBox');

var _NumBox2 = _interopRequireDefault(_NumBox);

var _NumBoxPop = require('./../NumBoxPop');

var _NumBoxPop2 = _interopRequireDefault(_NumBoxPop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumBoxPopPointer = function (_Component) {
  (0, _inherits3.default)(NumBoxPopPointer, _Component);

  function NumBoxPopPointer(props) {
    (0, _classCallCheck3.default)(this, NumBoxPopPointer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumBoxPopPointer.__proto__ || (0, _getPrototypeOf2.default)(NumBoxPopPointer)).call(this, props));

    _this.onClickCancel = function () {
      _this.setState({ show: false });
    };

    _this.onClickSubmit = function (value, args) {
      // Callback
      if (_this.props.onChange) _this.props.onChange(value, args);
      // 隐藏
      _this.setState({
        show: false
      });
    };

    _this.onClickNumBox = function () {
      _this.setState({
        show: true
      });
    };

    _this.state = {
      show: false
    };
    return _this;
  }

  (0, _createClass3.default)(NumBoxPopPointer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          args = _props.args,
          containerClassName = _props.containerClassName,
          containerStyle = _props.containerStyle,
          className = _props.className,
          style = _props.style,
          value = _props.value,
          disabled = _props.disabled,
          min = _props.min,
          max = _props.max,
          digits = _props.digits,
          unitClassName = _props.unitClassName,
          unitStyle = _props.unitStyle,
          unit = _props.unit,
          onChange = _props.onChange,
          others = (0, _objectWithoutProperties3.default)(_props, ['args', 'containerClassName', 'containerStyle', 'className', 'style', 'value', 'disabled', 'min', 'max', 'digits', 'unitClassName', 'unitStyle', 'unit', 'onChange']);
      var show = this.state.show;

      return _react2.default.createElement(
        'div',
        { style: (0, _assign2.default)({ position: 'relative' }, containerStyle), className: containerClassName },
        _react2.default.createElement(_NumBox2.default, {
          args: args,
          className: className,
          style: style,
          value: value,
          disabled: disabled,
          readOnly: true,
          min: min,
          max: max,
          digits: digits,
          onClickInput: this.onClickNumBox
        }),
        _react2.default.createElement(
          'span',
          { style: unitStyle, className: unitClassName },
          unit || ''
        ),
        _react2.default.createElement(_NumBoxPop2.default, (0, _extends3.default)({
          args: args,
          show: show,
          value: value,
          min: min,
          max: max,
          digits: digits,
          onClickCancel: this.onClickCancel,
          onClickSubmit: this.onClickSubmit
        }, others))
      );
    }
  }]);
  return NumBoxPopPointer;
}(_react.Component);

NumBoxPopPointer.propTypes = {
  args: _propTypes2.default.any,
  containerClassName: _propTypes2.default.string,
  containerStyle: _propTypes2.default.object,
  // numbox
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  digits: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
  min: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  max: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  disabled: _propTypes2.default.bool,
  // unit
  unitClassName: _propTypes2.default.string,
  unitStyle: _propTypes2.default.object,
  unit: _propTypes2.default.string,
  // events
  onChange: _propTypes2.default.func
};
NumBoxPopPointer.defaultProps = {
  className: 'sm',
  unitStyle: {
    fontSize: '13px',
    marginLeft: '8px'
  }
};
exports.default = NumBoxPopPointer;
module.exports = exports['default'];