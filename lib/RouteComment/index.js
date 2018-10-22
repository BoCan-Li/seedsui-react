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

    _this.onSubmit = function () {
      if (_this.props.onSubmit) _this.props.onSubmit(_this.$textarea.value);
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
          submitStyle = _props.submitStyle;

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
            { style: { padding: '10px 0', backgroundColor: 'white' }, className: 'border-b' },
            _react2.default.createElement('textarea', { ref: function ref(el) {
                _this2.$textarea = el;
              }, style: { display: 'block', width: '100%', lineHeight: '22px', border: '0', padding: '0 12px', boxSizing: 'border-box', height: '100px' }, placeholder: placeholder, onChange: this.onChange })
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.onSubmit, className: 'lg primary', disabled: !this.state.isEnable, style: (0, _assign2.default)({ margin: '30px 60px', borderRadius: '4px' }, submitStyle) },
            '\u63D0\u4EA4'
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
  onSubmit: _propTypes2.default.func,
  submitStyle: _propTypes2.default.object
};
RouteComment.defaultProps = {
  title: '填写意见',
  placeholder: '点击输入'
};
exports.default = RouteComment;
module.exports = exports['default'];