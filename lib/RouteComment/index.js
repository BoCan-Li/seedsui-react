'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _Page = require('./../Page');

var _Page2 = _interopRequireDefault(_Page);

var _Header = require('./../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Titlebar = require('./../Titlebar');

var _Titlebar2 = _interopRequireDefault(_Titlebar);

var _Container = require('./../Container');

var _Container2 = _interopRequireDefault(_Container);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteComment = function (_Component) {
  (0, _inherits3.default)(RouteComment, _Component);

  function RouteComment(props) {
    (0, _classCallCheck3.default)(this, RouteComment);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RouteComment.__proto__ || (0, _getPrototypeOf2.default)(RouteComment)).call(this, props));

    _this.onChange = function (e) {
      var target = e.target;
      if (target.value && !_this.state.isEnable) {
        _this.setState({
          isEnable: true
        });
      } else if (!target.value && _this.state.isEnable) {
        _this.setState({
          isEnable: false
        });
      }
    };

    _this.onClick = function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          item = _ref2[0],
          index = _ref2[1];

      if (item.onClick) {
        item.onClick(_this.$textarea.value, item, index);
      }
    };

    _this.state = {
      isEnable: false
    };
    return _this;
  }

  (0, _createClass3.default)(RouteComment, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          title = _props.title,
          placeholder = _props.placeholder,
          buttons = _props.buttons,
          children = _props.children,
          others = (0, _objectWithoutProperties3.default)(_props, ['title', 'placeholder', 'buttons', 'children']);

      return _react2.default.createElement(
        _Page2.default,
        null,
        _react2.default.createElement(
          _Header2.default,
          null,
          _react2.default.createElement(_Titlebar2.default, { caption: title })
        ),
        _react2.default.createElement(
          _Container2.default,
          null,
          _react2.default.createElement(
            'div',
            { className: 'route-comment-input-box' },
            _react2.default.createElement('textarea', (0, _extends3.default)({ ref: function ref(el) {
                _this2.$textarea = el;
              }, className: 'route-comment-input', placeholder: placeholder, onChange: this.onChange }, others))
          ),
          children,
          buttons && buttons.length === 1 && buttons.map(function (item, index) {
            return _react2.default.createElement(
              _Button2.default,
              { key: index, args: [item, index], onClick: _this2.onClick, className: 'route-comment-button-single ' + (item.className || ''), disabled: item.valid && !_this2.state.isEnable, style: item.style },
              item.caption
            );
          }),
          buttons && buttons.length > 1 && _react2.default.createElement(
            'div',
            { className: 'route-comment-button-box' },
            buttons.map(function (item, index) {
              return _react2.default.createElement(
                _Button2.default,
                { key: index, args: [item, index], onClick: _this2.onClick, className: 'route-comment-button ' + (item.className || ''), disabled: item.valid && !_this2.state.isEnable, style: item.style },
                item.caption
              );
            })
          )
        )
      );
    }
  }]);
  return RouteComment;
}(_react.Component);

RouteComment.propTypes = {
  title: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,

  buttons: _propTypes2.default.array,
  /*
  {
    valid: PropTypes.bool,
    caption: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }*/

  children: _propTypes2.default.node
};
RouteComment.defaultProps = {
  title: '填写意见',
  placeholder: '点击输入'
};
exports.default = RouteComment;
module.exports = exports['default'];