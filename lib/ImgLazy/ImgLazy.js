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

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImgLazy = function (_Component) {
  (0, _inherits3.default)(ImgLazy, _Component);

  function ImgLazy(props) {
    (0, _classCallCheck3.default)(this, ImgLazy);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImgLazy.__proto__ || (0, _getPrototypeOf2.default)(ImgLazy)).call(this, props));

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(ImgLazy, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.instance) return;
      var instance = new _instance2.default({
        overflowContainer: this.$el
      });
      instance.load();
      this.setState({
        instance: instance
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          children = _props.children,
          others = (0, _objectWithoutProperties3.default)(_props, ['style', 'className', 'children']);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: className, style: style }, others),
        children
      );
    }
  }]);
  return ImgLazy;
}(_react.Component);

ImgLazy.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node
};
exports.default = ImgLazy;
module.exports = exports['default'];