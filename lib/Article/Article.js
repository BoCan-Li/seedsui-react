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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Article = function (_Component) {
  (0, _inherits3.default)(Article, _Component);

  function Article(props, context) {
    (0, _classCallCheck3.default)(this, Article);
    return (0, _possibleConstructorReturn3.default)(this, (Article.__proto__ || (0, _getPrototypeOf2.default)(Article)).call(this, props, context));
  }

  (0, _createClass3.default)(Article, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          captionClassName = _props.captionClassName,
          captionStyle = _props.captionStyle,
          sndcaption = _props.sndcaption,
          sndcaptionClassName = _props.sndcaptionClassName,
          sndcaptionStyle = _props.sndcaptionStyle,
          paragraphs = _props.paragraphs,
          paragraphClassName = _props.paragraphClassName,
          paragraphStyle = _props.paragraphStyle,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { className: 'article-box' },
        caption && _react2.default.createElement(
          'div',
          { className: 'article-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle },
          { caption: caption }
        ),
        sndcaption && _react2.default.createElement(
          'div',
          { className: 'article-sndcaption' + (sndcaptionClassName ? ' ' + sndcaptionClassName : ''), style: sndcaptionStyle },
          { sndcaption: sndcaption }
        ),
        paragraphs.map(function (paragraph) {
          return _react2.default.createElement(
            'div',
            { className: 'article-paragraph' + (paragraphClassName ? ' ' + paragraphClassName : ''), style: paragraphStyle },
            { paragraph: paragraph }
          );
        }),
        children
      );
    }
  }]);
  return Article;
}(_react.Component);

Article.propTypes = {
  caption: _propTypes2.default.node, // 标题
  captionClassName: _propTypes2.default.string,
  captionStyle: _propTypes2.default.node,

  sndcaption: _propTypes2.default.node, // 内容
  sndcaptionClassName: _propTypes2.default.string,
  sndcaptionStyle: _propTypes2.default.node,

  paragraphs: _propTypes2.default.array, // 段落
  paragraphClassName: _propTypes2.default.string,
  paragraphStyle: _propTypes2.default.node,
  children: _propTypes2.default.node
};
Article.defaultProps = {};
exports.default = Article;
module.exports = exports['default'];