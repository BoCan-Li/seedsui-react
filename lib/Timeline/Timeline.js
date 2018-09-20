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

var _Dot = require('./../Dot');

var _Dot2 = _interopRequireDefault(_Dot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timeline = function (_Component) {
  (0, _inherits3.default)(Timeline, _Component);

  function Timeline(props) {
    (0, _classCallCheck3.default)(this, Timeline);
    return (0, _possibleConstructorReturn3.default)(this, (Timeline.__proto__ || (0, _getPrototypeOf2.default)(Timeline)).call(this, props));
  }

  (0, _createClass3.default)(Timeline, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          list = _props.list,
          style = _props.style,
          badgeStyle = _props.badgeStyle,
          top = _props.top,
          bottom = _props.bottom;

      var listDOM = list.map(function (item, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: 'timeline-case' + (item.active ? ' active' : '') },
          _react2.default.createElement(
            'div',
            { className: 'timeline-badge', style: badgeStyle },
            item.icon || _react2.default.createElement(_Dot2.default, { className: item.active ? ' active' : '' })
          ),
          item.content
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'timeline', style: style },
        _react2.default.createElement('span', { className: 'timeline-line', style: { top: top, bottom: bottom } }),
        listDOM
      );
    }
  }]);
  return Timeline;
}(_react.Component);

Timeline.propTypes = {
  list: _propTypes2.default.array, // [{content: node, icon: node(默认Dot), active: bool}]
  style: _propTypes2.default.object,
  badgeStyle: _propTypes2.default.object,
  top: _propTypes2.default.string,
  bottom: _propTypes2.default.string
};
Timeline.defaultProps = {
  list: [],
  style: {}
};
exports.default = Timeline;
module.exports = exports['default'];