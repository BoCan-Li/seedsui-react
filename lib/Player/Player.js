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

var _Device = require('../Device');

var _Device2 = _interopRequireDefault(_Device);

var _FullScreen = require('../FullScreen');

var _FullScreen2 = _interopRequireDefault(_FullScreen);

var _MediaUtil = require('../MediaUtil');

var _MediaUtil2 = _interopRequireDefault(_MediaUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Player = function (_Component) {
  (0, _inherits3.default)(Player, _Component);

  function Player(props) {
    (0, _classCallCheck3.default)(this, Player);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Player.__proto__ || (0, _getPrototypeOf2.default)(Player)).call(this, props));

    _this.onClick = function (e) {
      if (_this.props.onClick) {
        _this.props.onClick(Object.getArgs(e, _this.props.args));
      } else {
        var target = e.currentTarget.querySelector('video');
        _FullScreen2.default.enter(target);

        setTimeout(function () {
          target.play();
        }, 500);
      }
      e.stopPropagation();
    };

    _this.getType = function () {
      var src = _this.props.src;

      return _MediaUtil2.default.sourceType(src);
    };

    return _this;
  }

  (0, _createClass3.default)(Player, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var video = this.$video;
      _FullScreen2.default.addHandler(video, function (e) {
        if (_FullScreen2.default.isFull(video)) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          args = _props.args,
          children = _props.children,
          style = _props.style,
          className = _props.className,
          src = _props.src,
          onClick = _props.onClick,
          others = (0, _objectWithoutProperties3.default)(_props, ['args', 'children', 'style', 'className', 'src', 'onClick']);
      // Andriod

      if (_Device2.default.os === 'andriod' || onClick) {
        return _react2.default.createElement(
          'div',
          { ref: function ref(el) {
              _this2.$el = el;
            }, className: 'player-thumbnail' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
          !onClick && _react2.default.createElement(
            'video',
            (0, _extends3.default)({ ref: function ref(el) {
                _this2.$video = el;
              } }, others),
            _react2.default.createElement('source', { src: src, type: this.getType() }),
            '\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E\u3002'
          ),
          this.props.poster && _react2.default.createElement('div', { style: { backgroundImage: 'url(' + this.props.poster + ')' }, className: 'player-thumbnail-poster' }),
          _react2.default.createElement('div', { className: 'player-thumbnail-button' }),
          children
        );
      }
      // Ios
      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'player-thumbnail' + (className ? ' ' + className : ''), style: style },
        _react2.default.createElement(
          'video',
          (0, _extends3.default)({ controls: true, ref: function ref(el) {
              _this2.$video = el;
            } }, others),
          _react2.default.createElement('source', { src: src, type: this.getType() }),
          '\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E\u3002'
        ),
        children
      );
    }
  }]);
  return Player;
}(_react.Component);

Player.propTypes = {
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,

  src: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};
Player.defaultProps = {};
exports.default = Player;
module.exports = exports['default'];