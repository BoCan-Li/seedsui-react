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

var Dialog = function (_Component) {
  (0, _inherits3.default)(Dialog, _Component);

  function Dialog(props) {
    (0, _classCallCheck3.default)(this, Dialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dialog.__proto__ || (0, _getPrototypeOf2.default)(Dialog)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {};

    _this.componentDidMount = function () {};

    _this.onClickMask = function (e) {
      if (_this.props.onClickMask) _this.props.onClickMask(Object.getArgs(e, _this.props.args));
      e.stopPropagation();
    };

    _this.onClickDialog = function (e) {
      e.stopPropagation();
    };

    return _this;
  }
  /* shouldComponentUpdate = (nextProps) => { // 因为是容器,不能使用此方法,不然会影响内部元素的更新
    if (this.props.show === nextProps.show) {
      return false;
    }
    return true;
  } */


  (0, _createClass3.default)(Dialog, [{
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
          animation = _props.animation,
          children = _props.children;

      var transformOrigin = 'middle';
      switch (animation) {
        case 'slideLeft':
          transformOrigin = 'right-middle';
          break;
        case 'slideRight':
          transformOrigin = 'left-middle';
          break;
        case 'slideUp':
          transformOrigin = 'bottom-center';
          break;
        case 'slideDown':
          transformOrigin = 'top-center';
          break;
        case 'zoom':
          transformOrigin = 'middle';
          break;
        case 'fade':
          transformOrigin = 'middle';
          break;
        default:
          transformOrigin = 'middle';
      }
      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'mask dialog-mask' + (maskClassName ? ' ' + maskClassName : '') + (show ? ' active' : ''), style: (0, _assign2.default)(duration !== undefined ? { WebkitTransitionDuration: duration + 'ms' } : {}, maskStyle), onClick: this.onClickMask },
        _react2.default.createElement(
          'div',
          { className: 'dialog' + (transformOrigin ? ' ' + transformOrigin : '') + (className ? ' ' + className : '') + (show ? ' active' : ''), style: (0, _assign2.default)(duration !== undefined ? { WebkitTransitionDuration: duration + 'ms' } : {}, style), 'data-animation': animation, onClick: this.onClickDialog },
          children && children
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Dialog;
}(_react.Component);

Dialog.propTypes = {
  portal: _propTypes2.default.object,
  args: _propTypes2.default.any,
  show: _propTypes2.default.bool,

  animation: _propTypes2.default.string, // slideLeft | slideRight | slideUp | slideDown | zoom | fade
  duration: _propTypes2.default.number,
  isClickMaskHide: _propTypes2.default.bool,
  onClickMask: _propTypes2.default.func,
  onShowed: _propTypes2.default.func,
  onHid: _propTypes2.default.func,

  maskClassName: _propTypes2.default.string,
  maskStyle: _propTypes2.default.object,

  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  children: _propTypes2.default.node
};
Dialog.defaultProps = {
  args: null,
  isClickMaskHide: false,
  animation: 'fade'
};
exports.default = Dialog;
module.exports = exports['default'];