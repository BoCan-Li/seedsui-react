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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chat = function (_Component) {
  (0, _inherits3.default)(Chat, _Component);

  function Chat(props) {
    (0, _classCallCheck3.default)(this, Chat);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Chat.__proto__ || (0, _getPrototypeOf2.default)(Chat)).call(this, props));

    _this.onClick = function (e) {
      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(Object.getArgs(e, _this.props.args));
        e.stopPropagation();
      }
    };

    _this.onClickContent = function (e) {
      if (_this.props.onClickContent) {
        _this.props.onClickContent(Object.getArgs(e, _this.props.args));
        e.stopPropagation();
      }
    };

    _this.onClickAvatar = function (e) {
      if (_this.props.onClickAvatar) {
        _this.props.onClickAvatar(Object.getArgs(e, _this.props.args));
        e.stopPropagation();
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Chat, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          showAvatar = _props.showAvatar,
          avatarSrc = _props.avatarSrc,
          avatarClassName = _props.avatarClassName,
          avatarStyle = _props.avatarStyle,
          avatarAfter = _props.avatarAfter,
          author = _props.author,
          authorClassName = _props.authorClassName,
          authorStyle = _props.authorStyle,
          contentClassName = _props.contentClassName,
          contentStyle = _props.contentStyle,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'chat' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
        showAvatar && _react2.default.createElement(
          'div',
          { className: 'chat-photo', onClick: this.onClickAvatar },
          _react2.default.createElement(
            'div',
            { className: 'chat-avatar' + (avatarClassName ? ' ' + avatarClassName : ''), style: (0, _assign2.default)(avatarSrc ? { backgroundImage: 'url(' + avatarSrc + ')' } : {}, avatarStyle) },
            avatarAfter
          ),
          author && _react2.default.createElement(
            'div',
            { className: 'chat-author' + (authorClassName ? ' ' + authorClassName : ''), style: authorStyle },
            author
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'chat-content-box' },
          _react2.default.createElement(
            'div',
            { onClick: this.onClickContent, className: 'chat-content' + (contentClassName ? ' ' + contentClassName : ''), style: contentStyle },
            children
          )
        )
      );
    }
  }]);
  return Chat;
}(_react.Component);

Chat.propTypes = {
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,

  showAvatar: _propTypes2.default.bool,
  avatarClassName: _propTypes2.default.string,
  avatarStyle: _propTypes2.default.object,
  avatarSrc: _propTypes2.default.string,
  avatarAfter: _propTypes2.default.node,
  onClickAvatar: _propTypes2.default.func,

  author: _propTypes2.default.string,
  authorClassName: _propTypes2.default.string,
  authorStyle: _propTypes2.default.object,

  contentClassName: _propTypes2.default.string,
  contentStyle: _propTypes2.default.object,
  onClickContent: _propTypes2.default.func,

  children: _propTypes2.default.node
};
Chat.defaultProps = {
  args: null
};
exports.default = Chat;
module.exports = exports['default'];