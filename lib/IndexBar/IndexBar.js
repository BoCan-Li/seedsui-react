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

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IndexBar = function (_Component) {
  (0, _inherits3.default)(IndexBar, _Component);

  function IndexBar(props) {
    (0, _classCallCheck3.default)(this, IndexBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IndexBar.__proto__ || (0, _getPrototypeOf2.default)(IndexBar)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if (_this.props.overflowContainer !== prevProps.overflowContainer) {
        _this.state.instance.setOverflowContainer(_this.props.overflowContainer);
      }
    };

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(IndexBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var overflowContainer = this.$el.parentNode;
      var instance = new _instance2.default({
        overflowContainer: this.props.overflowContainer || overflowContainer,
        parent: this.props.parent || document.body
      });
      this.setState({
        instance: instance
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          indexs = _props.indexs,
          className = _props.className,
          style = _props.style;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'indexbar' + (className ? ' ' + className : ''), style: style },
        indexs.map(function (index, i) {
          return _react2.default.createElement(
            'a',
            { key: 'btn' + i },
            index
          );
        })
      );
    }
  }]);
  return IndexBar;
}(_react.Component);

IndexBar.propTypes = {
  overflowContainer: _propTypes2.default.any, // 滚动区域
  parent: _propTypes2.default.any, // DOM注入容器
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  indexs: _propTypes2.default.array
};
IndexBar.defaultProps = {
  indexs: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
};
exports.default = IndexBar;
module.exports = exports['default'];