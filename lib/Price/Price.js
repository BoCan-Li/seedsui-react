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

var Price = function (_Component) {
  (0, _inherits3.default)(Price, _Component);

  function Price(props, context) {
    (0, _classCallCheck3.default)(this, Price);
    return (0, _possibleConstructorReturn3.default)(this, (Price.__proto__ || (0, _getPrototypeOf2.default)(Price)).call(this, props, context));
  }

  (0, _createClass3.default)(Price, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          showSymbol = _props.showSymbol,
          showThousandth = _props.showThousandth,
          price = _props.price,
          unit = _props.unit,
          className = _props.className,
          digits = _props.digits,
          digitsFixed = _props.digitsFixed,
          style = _props.style;
      // 价格字符串

      var priceString = '';
      // 如果价格不是数字,则直接显示
      if (isNaN(price)) {
        priceString = price;
        // 如果价格是数字,则加入千分位和小数位
      } else {
        var newPrice = price;
        // 加小数位
        if (typeof digits === 'number') {
          newPrice = digitsFixed ? String(Number(price).toFixed(digits)) : Math.Calc.toFixed(Number(price), digits);
        }
        // 加千分位
        priceString = showThousandth ? Math.Calc.toThousandth(newPrice) : '' + newPrice;
      }
      // 应用格式:整数与小数分开显示
      var priceInteger = null;
      var priceDecimal = null;
      if (priceString && priceString.indexOf('.') !== -1) {
        priceInteger = priceString.substring(0, priceString.indexOf('.'));
        priceDecimal = '.' + priceString.substring(priceString.indexOf('.') + 1);
      } else {
        priceInteger = priceString;
      }
      return _react2.default.createElement(
        'span',
        { style: style, className: 'price ' + className },
        showSymbol && _react2.default.createElement(
          'span',
          { className: 'price-symbol' },
          '\uFFE5'
        ),
        _react2.default.createElement(
          'span',
          { className: 'price-integer' },
          priceInteger
        ),
        priceDecimal && _react2.default.createElement(
          'span',
          { className: 'price-digits' },
          priceDecimal
        ),
        unit && _react2.default.createElement(
          'span',
          { className: 'price-unit' },
          unit
        )
      );
    }
  }]);
  return Price;
}(_react.Component);

Price.propTypes = {
  showSymbol: _propTypes2.default.bool, // 是否显示货币符号
  showThousandth: _propTypes2.default.bool, // 是否显示千分位
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  price: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  unit: _propTypes2.default.string,
  digitsFixed: _propTypes2.default.bool, // 固定小数, 例如100仍然显示100.00
  digits: _propTypes2.default.oneOfType([// 如果设置了小数位控制,则控制小数位,如不控制,则原样显示
  _propTypes2.default.bool, _propTypes2.default.number])
};
Price.defaultProps = {
  showSymbol: true,
  showThousandth: true,
  className: 'capitalize',
  digitsFixed: true,
  digits: false
};
exports.default = Price;
module.exports = exports['default'];