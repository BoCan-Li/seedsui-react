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

var Calendar = function (_Component) {
  (0, _inherits3.default)(Calendar, _Component);

  function Calendar(props) {
    (0, _classCallCheck3.default)(this, Calendar);
    return (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call(this, props));
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.instance) return;
      var _props = this.props,
          type = _props.type,
          titleFormat = _props.titleFormat,
          disableBeforeDate = _props.disableBeforeDate,
          disableAfterDate = _props.disableAfterDate,
          verticalDrag = _props.verticalDrag,
          defaultDate = _props.defaultDate,
          prevHTML = _props.prevHTML,
          nextHTML = _props.nextHTML,
          onChange = _props.onChange,
          onClick = _props.onClick,
          onError = _props.onError;

      var instance = new _instance2.default(this.$el, {
        viewType: type,
        titleFormat: titleFormat,

        disableBeforeDate: disableBeforeDate,
        disableAfterDate: disableAfterDate,
        verticalDrag: verticalDrag,
        defaultDate: defaultDate,
        prevHTML: prevHTML,
        nextHTML: nextHTML,
        onChange: onChange,
        onClick: onClick,
        onError: onError
      });
      this.instance = instance;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', { ref: function ref(el) {
          _this2.$el = el;
        }, className: 'calendar' });
    }
  }]);
  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  type: _propTypes2.default.string, // week|month
  titleFormat: _propTypes2.default.string, // 标题日期格式化 YYYY年MM月DD日 周E 第W周
  disableBeforeDate: _propTypes2.default.object, // 禁用之前日期
  disableAfterDate: _propTypes2.default.object, // 禁用之后日期
  verticalDrag: _propTypes2.default.bool, // 是否允许垂直拖动
  defaultDate: _propTypes2.default.object, // 默认日期
  prevHTML: _propTypes2.default.string, // 左箭头
  nextHTML: _propTypes2.default.string, // 右箭头
  onChange: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onError: _propTypes2.default.func
};
Calendar.defaultProps = {
  type: 'month',
  titleFormat: 'YYYY年MM月DD日',
  verticalDrag: true,
  prevHTML: '&lt',
  nextHTML: '&gt'
};
exports.default = Calendar;
module.exports = exports['default'];