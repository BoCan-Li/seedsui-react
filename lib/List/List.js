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

var List = function (_Component) {
  (0, _inherits3.default)(List, _Component);

  function List(props) {
    (0, _classCallCheck3.default)(this, List);

    var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this, props));

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
      var _this$props = _this.props,
          onClick = _this$props.onClick,
          onClickLicon = _this$props.onClickLicon,
          onClickRicon = _this$props.onClickRicon,
          onClickRcaption = _this$props.onClickRcaption;

      var classList = e.target.classList;
      if (classList.contains('licon') && onClickLicon) {
        onClickLicon(_this.getArgs(e));
        e.stopPropagation();
      } else if (classList.contains('ricon') && onClickRicon) {
        onClickRicon(_this.getArgs(e));
        e.stopPropagation();
      } else if (classList.contains('list-rcaption') && onClickRcaption) {
        onClickRcaption(_this.getArgs(e));
        e.stopPropagation();
      } else if (onClick) {
        onClick(_this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onClickContainer = function (e) {
      if (_this.props.onClickContainer) {
        _this.props.onClickContainer(_this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onClickThumbnail = function (e) {
      if (_this.props.onClickThumbnail) {
        _this.props.onClickThumbnail(_this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.onClickAvatar = function (e) {
      if (_this.props.onClickAvatar) {
        _this.props.onClickAvatar(_this.getArgs(e));
        e.stopPropagation();
      }
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(List, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          licon = _props.licon,
          liconSrc = _props.liconSrc,
          liconClassName = _props.liconClassName,
          liconStyle = _props.liconStyle,
          ricon = _props.ricon,
          riconSrc = _props.riconSrc,
          riconClassName = _props.riconClassName,
          riconStyle = _props.riconStyle,
          showThumbnail = _props.showThumbnail,
          thumbnailSrc = _props.thumbnailSrc,
          thumbnailClassName = _props.thumbnailClassName,
          thumbnailStyle = _props.thumbnailStyle,
          thumbnailAfter = _props.thumbnailAfter,
          showAvatar = _props.showAvatar,
          avatarSrc = _props.avatarSrc,
          avatarStyle = _props.avatarStyle,
          avatarAfter = _props.avatarAfter,
          caption = _props.caption,
          captionClassName = _props.captionClassName,
          captionStyle = _props.captionStyle,
          rcaption = _props.rcaption,
          rcaptionClassName = _props.rcaptionClassName,
          rcaptionStyle = _props.rcaptionStyle,
          sndcaption = _props.sndcaption,
          sndcaptionClassName = _props.sndcaptionClassName,
          sndcaptionStyle = _props.sndcaptionStyle,
          containerClassName = _props.containerClassName,
          containerStyle = _props.containerStyle,
          containerAfter = _props.containerAfter;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'list-li' + (className ? ' ' + className : ''), style: style, onClick: this.onClick },
        (liconSrc || liconClassName) && _react2.default.createElement(_Icon2.default, { className: 'licon' + (liconClassName ? ' ' + liconClassName : ''), src: liconSrc, style: liconStyle }),
        licon && licon,
        showThumbnail && _react2.default.createElement(
          'div',
          { className: 'list-thumbnail' + (thumbnailClassName ? ' ' + thumbnailClassName : ''), style: thumbnailStyle, onClick: this.onClickThumbnail },
          thumbnailSrc && _react2.default.createElement('span', { className: 'list-thumbnail-img', style: { backgroundImage: 'url(' + thumbnailSrc + ')' } }),
          thumbnailAfter
        ),
        showAvatar && _react2.default.createElement(
          'div',
          { className: 'list-avatar', style: avatarStyle, onClick: this.onClickAvatar },
          avatarSrc && _react2.default.createElement('span', { className: 'list-avatar-img', style: { backgroundImage: 'url(' + avatarSrc + ')' } }),
          avatarAfter
        ),
        _react2.default.createElement(
          'div',
          { className: 'list-container' + (containerClassName ? ' ' + containerClassName : ''), style: containerStyle, onClick: this.onClickContainer },
          caption && _react2.default.createElement(
            'div',
            { className: 'list-caption' + (captionClassName ? ' ' + captionClassName : ''), style: captionStyle },
            caption
          ),
          sndcaption && _react2.default.createElement(
            'div',
            { className: 'list-sndcaption' + (sndcaptionClassName ? ' ' + sndcaptionClassName : ''), style: sndcaptionStyle },
            sndcaption
          ),
          containerAfter
        ),
        rcaption && _react2.default.createElement(
          'div',
          { className: 'list-rcaption' + (rcaptionClassName ? ' ' + rcaptionClassName : ''), style: rcaptionStyle },
          rcaption
        ),
        (riconSrc || riconClassName) && _react2.default.createElement(_Icon2.default, { className: 'ricon size16' + (riconClassName ? ' ' + riconClassName : ''), src: riconSrc, style: riconStyle }),
        ricon && ricon
      );
    }
  }]);
  return List;
}(_react.Component);

List.propTypes = {
  args: _propTypes2.default.any,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,

  onClickContainer: _propTypes2.default.func,

  licon: _propTypes2.default.node,
  liconSrc: _propTypes2.default.string,
  liconClassName: _propTypes2.default.string,
  liconStyle: _propTypes2.default.object,
  onClickLicon: _propTypes2.default.func,

  ricon: _propTypes2.default.node,
  riconSrc: _propTypes2.default.string,
  riconClassName: _propTypes2.default.string,
  riconStyle: _propTypes2.default.object,
  onClickRicon: _propTypes2.default.func,

  showThumbnail: _propTypes2.default.bool,
  thumbnailStyle: _propTypes2.default.object,
  thumbnailSrc: _propTypes2.default.string,
  thumbnailAfter: _propTypes2.default.node,
  onClickThumbnail: _propTypes2.default.func,

  showAvatar: _propTypes2.default.bool,
  avatar: _propTypes2.default.bool,
  avatarStyle: _propTypes2.default.object,
  avatarSrc: _propTypes2.default.string,
  avatarAfter: _propTypes2.default.node,
  onClickAvatar: _propTypes2.default.func,

  caption: _propTypes2.default.node,
  captionClassName: _propTypes2.default.string,
  captionStyle: _propTypes2.default.object,

  rcaption: _propTypes2.default.node,
  rcaptionClassName: _propTypes2.default.string,
  rcaptionStyle: _propTypes2.default.object,
  onClickRcaption: _propTypes2.default.func,

  sndcaption: _propTypes2.default.node,
  sndcaptionClassName: _propTypes2.default.string,
  sndcaptionStyle: _propTypes2.default.object,

  containerClassName: _propTypes2.default.string,
  containerStyle: _propTypes2.default.object,
  containerAfter: _propTypes2.default.node
};
List.defaultProps = {
  args: null
};
exports.default = List;
module.exports = exports['default'];