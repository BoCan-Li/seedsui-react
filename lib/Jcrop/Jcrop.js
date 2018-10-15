'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _jcrop = require('jcrop');

var _jcrop2 = _interopRequireDefault(_jcrop);

require('jcrop/dist/jcrop.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Jcrop

var Jcrop = function (_Component) {
  (0, _inherits3.default)(Jcrop, _Component);

  function Jcrop(props) {
    (0, _classCallCheck3.default)(this, Jcrop);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Jcrop.__proto__ || (0, _getPrototypeOf2.default)(Jcrop)).call(this, props));

    _this.formatPos = function (argPos) {
      var pos = argPos;
      for (var n in argPos) {
        if (n === 'h') pos['height'] = argPos[n];else if (n === 'w') pos['width'] = argPos[n];
      }
      return pos;
    };

    _this.update = function () {
      if (!_this.props.src) return;
      var _this$props = _this.props,
          rect = _this$props.rect,
          scale = _this$props.scale;

      _jcrop2.default.load(_this.$el).then(function (img) {
        var jcp = _jcrop2.default.attach(img, _this.props.options);
        var frame = null;
        var pos = {};
        // 按尺寸创建
        if (rect) {
          pos = {
            x: rect[0],
            y: rect[1],
            w: rect[2],
            h: rect[3]
          };
          frame = _jcrop2.default.Rect.create(pos.x, pos.y, pos.w, pos.h);
          jcp.newWidget(frame);
          // 按比例创建
        } else {
          var _frame;

          frame = _jcrop2.default.Rect.sizeOf(jcp.el);
          pos = (_frame = frame).scale.apply(_frame, (0, _toConsumableArray3.default)(scale)).center(frame.w, frame.h);
          jcp.newWidget(pos);
        }
        if (_this.props.onChange) _this.props.onChange({ pos: _this.formatPos(pos), src: _this.props.src });
        jcp.listen('crop.change', function (widget, e) {
          pos = _this.formatPos(widget.pos);
          if (_this.props.onChange) _this.props.onChange({ pos: pos, src: _this.props.src });
        });
      }).catch(function (err) {
        console.error(err);
      });
    };

    return _this;
  }

  (0, _createClass3.default)(Jcrop, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          rect = _props.rect,
          scale = _props.scale,
          options = _props.options,
          onChange = _props.onChange,
          src = _props.src,
          style = _props.style,
          className = _props.className,
          others = (0, _objectWithoutProperties3.default)(_props, ['rect', 'scale', 'options', 'onChange', 'src', 'style', 'className']);

      return _react2.default.createElement('img', (0, _extends3.default)({ alt: '', ref: function ref(el) {
          _this2.$el = el;
        }, className: className, style: (0, _assign2.default)({ maxWidth: '100%' }, style), src: src }, others));
    }
  }]);
  return Jcrop;
}(_react.Component);

Jcrop.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  src: _propTypes2.default.string,
  rect: _propTypes2.default.array, // [10,10,100,100]
  scale: _propTypes2.default.array, // [.7,.5]
  options: _propTypes2.default.object,
  onChange: _propTypes2.default.func
};
Jcrop.defaultProps = {
  scale: [.7, .5],
  options: {
    multi: false
  }
};
exports.default = Jcrop;
module.exports = exports['default'];