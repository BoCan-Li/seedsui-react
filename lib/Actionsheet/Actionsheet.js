'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actionsheet = function (_Component) {
  (0, _inherits3.default)(Actionsheet, _Component);

  function Actionsheet(props) {
    (0, _classCallCheck3.default)(this, Actionsheet);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Actionsheet.__proto__ || (0, _getPrototypeOf2.default)(Actionsheet)).call(this, props));

    _this.componentDidMount = function () {};

    _this.onClick = function (e) {
      var target = e.target;
      if (target.classList.contains('actionsheet-mask')) {
        if (_this.props.onClickMask) {
          _this.props.onClickMask();
          e.stopPropagation();
        }
      } else if (target.classList.contains('actionsheet-option')) {
        var index = target.getAttribute('data-index');
        if (_this.props.onClick) {
          _this.props.onClick(_this.props.list[index], Number(index));
          e.stopPropagation();
        }
      } else if (target.classList.contains('actionsheet-cancel')) {
        if (_this.props.onClickCancel) {
          _this.props.onClickCancel();
          e.stopPropagation();
        }
      }
    };

    return _this;
  }

  (0, _createClass3.default)(Actionsheet, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          duration = _props.duration,
          show = _props.show,
          maskClassName = _props.maskClassName,
          maskStyle = _props.maskStyle,
          className = _props.className,
          style = _props.style,
          list = _props.list,
          groupStyle = _props.groupStyle,
          groupClassName = _props.groupClassName,
          optionStyle = _props.optionStyle,
          optionClassName = _props.optionClassName,
          cancelCaption = _props.cancelCaption,
          cancelStyle = _props.cancelStyle,
          cancelClassName = _props.cancelClassName,
          onClickCancel = _props.onClickCancel;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'mask actionsheet-mask' + (maskClassName ? ' ' + maskClassName : '') + (show ? ' active' : ''), style: (0, _assign2.default)(duration !== undefined ? { WebkitTransitionDuration: duration + 'ms' } : {}, maskStyle), onClick: this.onClick },
        _react2.default.createElement(
          'div',
          { className: 'actionsheet' + (className ? ' ' + className : '') + (show ? ' active' : ''), style: (0, _assign2.default)(duration !== undefined ? { WebkitTransitionDuration: duration + 'ms' } : {}, style), 'data-animation': 'slideUp' },
          _react2.default.createElement(
            'div',
            { className: 'actionsheet-group' + (groupClassName ? ' ' + groupClassName : ''), style: groupStyle },
            list && list.map(function (item, index) {
              return _react2.default.createElement(
                'a',
                { className: 'actionsheet-option' + (optionClassName ? ' ' + optionClassName : ''), style: optionStyle, key: index, 'data-index': index },
                item.caption
              );
            })
          ),
          onClickCancel && _react2.default.createElement(
            'a',
            { className: 'actionsheet-cancel' + (cancelClassName ? ' ' + cancelClassName : ''), style: cancelStyle },
            cancelCaption
          )
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Actionsheet;
}(_react.Component);

Actionsheet.propTypes = {
  portal: _propTypes2.default.object,
  args: _propTypes2.default.any,
  show: _propTypes2.default.bool,

  duration: _propTypes2.default.number,

  list: _propTypes2.default.array, // [{caption: string, onClick: func}]

  maskStyle: _propTypes2.default.object,
  maskClassName: _propTypes2.default.string,
  onClickMask: _propTypes2.default.func,

  style: _propTypes2.default.object,
  className: _propTypes2.default.string,

  groupStyle: _propTypes2.default.object,
  groupClassName: _propTypes2.default.string,

  optionStyle: _propTypes2.default.object,
  optionClassName: _propTypes2.default.string,

  cancelStyle: _propTypes2.default.object,
  cancelClassName: _propTypes2.default.string,
  cancelCaption: _propTypes2.default.node,
  onClickCancel: _propTypes2.default.func,

  onClick: _propTypes2.default.func
};
Actionsheet.defaultProps = {
  cancelCaption: '取消',
  optionClassName: 'border-b'
};
exports.default = Actionsheet;
module.exports = exports['default'];