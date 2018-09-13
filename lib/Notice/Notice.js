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

var _Icon = require('./../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notice = function (_Component) {
  (0, _inherits3.default)(Notice, _Component);

  function Notice(props) {
    (0, _classCallCheck3.default)(this, Notice);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Notice.__proto__ || (0, _getPrototypeOf2.default)(Notice)).call(this, props));

    _this.getArgs = function (e) {
      var args = _this.props.args;
      if (args !== undefined) {
        if (typeof args === 'string' && args === '$event') {
          args = e;
        } else if (Array.isArray(args) && args.indexOf('$event') > -1) {
          args[args.indexOf('$event')] = e;
        }
      } else {
        args = e;
      }
      return args;
    };

    _this.onClick = function (e) {
      if (_this.props.onClick) {
        _this.props.onClick(_this.getArgs(e));
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Notice, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          show = _props.show,
          className = _props.className,
          style = _props.style,
          icon = _props.icon,
          iconSrc = _props.iconSrc,
          iconStyle = _props.iconStyle,
          iconClassName = _props.iconClassName,
          caption = _props.caption,
          sndcaption = _props.sndcaption,
          children = _props.children;

      return show ? _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'notice' + (className ? ' ' + className : ''), style: style },
        _react2.default.createElement(
          'div',
          { className: 'notice-content', onClick: this.onClick },
          (iconSrc || iconClassName) && _react2.default.createElement(_Icon2.default, { className: 'notice-icon' + (iconClassName ? ' ' + iconClassName : ''), src: iconSrc ? iconSrc : '', style: iconStyle }),
          icon,
          _react2.default.createElement(
            'div',
            { className: 'notice-caption' },
            caption
          ),
          sndcaption && _react2.default.createElement(
            'div',
            { className: 'notice-sndcaption' },
            sndcaption
          ),
          children
        )
      ) : null;
    }
  }]);
  return Notice;
}(_react.Component);

Notice.propTypes = {
  onClick: _propTypes2.default.func,
  show: _propTypes2.default.bool,
  // args: PropTypes.array

  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  icon: _propTypes2.default.node,
  iconSrc: _propTypes2.default.string,
  iconStyle: _propTypes2.default.object,
  iconClassName: _propTypes2.default.string, // notice-icon-nodata | notice-icon-error
  caption: _propTypes2.default.string,
  sndcaption: _propTypes2.default.string,
  children: _propTypes2.default.node
};
Notice.defaultProps = {
  args: null,
  show: true,
  caption: '',
  sndcaption: '',
  style: {}
};
exports.default = Notice;
module.exports = exports['default'];