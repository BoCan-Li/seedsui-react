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

var _ImgLazy = require('./../ImgLazy');

var _ImgLazy2 = _interopRequireDefault(_ImgLazy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = function (_Component) {
  (0, _inherits3.default)(Container, _Component);

  function Container(props) {
    (0, _classCallCheck3.default)(this, Container);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).call(this, props));

    _this.state = {
      lazyLoadInstance: null
    };
    return _this;
  }

  (0, _createClass3.default)(Container, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.lazyLoad) {
        var imglazy = new _ImgLazy2.default({
          overflowContainer: this.$el
        });
        imglazy.load();
        this.setState({
          lazyLoadInstance: imglazy
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          lazyLoad = _props.lazyLoad,
          children = _props.children,
          others = (0, _objectWithoutProperties3.default)(_props, ['style', 'className', 'lazyLoad', 'children']);

      return _react2.default.createElement(
        'article',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: 'container' + (className ? ' ' + className : ''), style: style }, others),
        children
      );
    }
  }]);
  return Container;
}(_react.Component);

Container.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  lazyLoad: _propTypes2.default.bool,
  children: _propTypes2.default.node
};
exports.default = Container;
module.exports = exports['default'];