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
          className = _props.className,
          style = _props.style,
          lineParams = _props.lineParams,
          badgeParams = _props.badgeParams,
          dotParams = _props.dotParams,
          others = (0, _objectWithoutProperties3.default)(_props, ['list', 'className', 'style', 'lineParams', 'badgeParams', 'dotParams']);

      if (!list) return null;
      var listDOM = list.map(function (item, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: 'timeline-case' + (item.active ? ' active' : '') },
          _react2.default.createElement(
            'div',
            (0, _extends3.default)({}, badgeParams, { className: 'timeline-badge' + (badgeParams.className ? ' ' + badgeParams.className : '') }),
            item.icon || _react2.default.createElement(_Dot2.default, (0, _extends3.default)({}, dotParams, { className: item.active ? 'active ' + dotParams.className : dotParams.className }))
          ),
          item.content,
          item.children
        );
      });
      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: 'timeline' + (className ? ' ' + className : ''), style: style }, others),
        _react2.default.createElement('span', (0, _extends3.default)({}, lineParams, { className: 'timeline-line' + (lineParams.className ? ' ' + lineParams.className : '') })),
        listDOM
      );
    }
  }]);
  return Timeline;
}(_react.Component);

Timeline.propTypes = {
  list: _propTypes2.default.array, // [{content: node,icon: node(默认Dot), active: bool, children: node}]
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  lineParams: _propTypes2.default.object,

  badgeParams: _propTypes2.default.object,

  dotParams: _propTypes2.default.object
};
Timeline.defaultProps = {
  lineParams: {},
  badgeParams: {},
  dotParams: {
    className: ''
  }
};
exports.default = Timeline;
module.exports = exports['default'];