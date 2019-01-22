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

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Marquee = function (_Component) {
  (0, _inherits3.default)(Marquee, _Component);

  function Marquee(props) {
    (0, _classCallCheck3.default)(this, Marquee);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Marquee.__proto__ || (0, _getPrototypeOf2.default)(Marquee)).call(this, props));

    _this.componentDidUpdate = function (prevProps) {
      if (!_this.props.list.equals(prevProps.list)) {
        _this.update();
      }
    };

    _this.componentDidMount = function () {
      if (_this.instance || _this.props.list.length === 0) return;
      _this.init();
    };

    _this.update = function () {
      _this.instance.setStart(0);
      _this.instance.setEnd(_this.props.step * (_this.props.list.length - 1));
      _this.instance.update();
      _this.instance.play();
    };

    _this.init = function () {
      var _this$props = _this.props,
          list = _this$props.list,
          step = _this$props.step,
          duration = _this$props.duration,
          delay = _this$props.delay,
          direction = _this$props.direction,
          loop = _this$props.loop;

      var instance = new _instance2.default(_this.$el, {
        start: 0,
        end: step * (list.length - 1),
        step: step,
        duration: duration,
        delay: delay,
        direction: direction,
        loop: loop
      });
      instance.play();
      _this.instance = instance;
    };

    _this.onClick = function (item, index) {
      if (_this.props.onClick) _this.props.onClick(item, index);
    };

    return _this;
  }

  (0, _createClass3.default)(Marquee, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          list = _props.list,
          contentClassName = _props.contentClassName,
          contentStyle = _props.contentStyle,
          step = _props.step;

      return _react2.default.createElement(
        'ul',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'marquee' + (className ? ' ' + className : ''), style: style },
        list && list.map(function (item, index) {
          return _react2.default.createElement(
            'li',
            { className: 'marquee-li' + (contentClassName ? ' ' + contentClassName : ''), style: (0, _assign2.default)({ height: step + 'px' }, contentStyle), key: index, onClick: function onClick() {
                _this2.onClick(item, index);
              } },
            item.value
          );
        })
      );
    }
  }]);
  return Marquee;
}(_react.Component);

Marquee.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  list: _propTypes2.default.array, // [{key: 'xx', value: ''}]

  contentStyle: _propTypes2.default.object,
  contentClassName: _propTypes2.default.string,

  step: _propTypes2.default.number,
  duration: _propTypes2.default.number,
  delay: _propTypes2.default.number,
  direction: _propTypes2.default.string, // top | bottom | left | right
  loop: _propTypes2.default.bool,
  onClick: _propTypes2.default.func
};
Marquee.defaultProps = {
  step: 50,
  duration: 300,
  delay: 2000,
  direction: 'top',
  loop: true
};
exports.default = Marquee;
module.exports = exports['default'];