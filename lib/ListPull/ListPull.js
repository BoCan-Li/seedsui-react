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

var _instance = require('./instance');

var _instance2 = _interopRequireDefault(_instance);

var _Button = require('./../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListPull = function (_Component) {
  (0, _inherits3.default)(ListPull, _Component);

  function ListPull(props) {
    (0, _classCallCheck3.default)(this, ListPull);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ListPull.__proto__ || (0, _getPrototypeOf2.default)(ListPull)).call(this, props));

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(ListPull, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var instance = new _instance2.default(this.$el, {
        onClick: function onClick(e) {
          var index = e.target.getAttribute('data-index');
          var args1 = _this2.props.list[index];
          var args2 = null;
          var i = e.target.getAttribute('data-i');
          var direction = e.target.getAttribute('data-direction');
          if (i && direction) {
            if (direction === 'left') {
              args2 = args1.lButtons[i];
            } else {
              args2 = args1.rButtons[i];
            }
          }
          if (_this2.props.onClick) _this2.props.onClick(args1, args2);
        },
        onShowedLeft: this.props.onShowedLeft,
        onShowedRight: this.props.onShowedRight
      });
      this.setState({
        instance: instance
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          list = _props.list,
          style = _props.style,
          className = _props.className;

      return _react2.default.createElement(
        'ul',
        { ref: function ref(el) {
            _this3.$el = el;
          }, className: 'list-pull' + (className ? ' ' + className : ''), style: style },
        list.map(function (item, index) {
          return _react2.default.createElement(
            'li',
            { key: 'button' + index, 'data-index': '' + index, className: 'border-b list-pull-li' },
            item.lButtons && item.lButtons.length && _react2.default.createElement(
              'div',
              { className: 'list-pull-left' },
              item.lButtons.map(function (button, i) {
                return _react2.default.createElement(
                  _Button2.default,
                  { key: 'button' + i, 'data-index': '' + index, 'data-i': '' + i, 'data-direction': 'left', className: 'list-pull-button' + (button.className ? ' ' + button.className : ''), style: button.style },
                  button.value
                );
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'list-pull-handler', 'data-index': '' + index },
              item.container
            ),
            item.rButtons && item.rButtons.length && _react2.default.createElement(
              'div',
              { className: 'list-pull-right' },
              item.rButtons.map(function (button, i) {
                return _react2.default.createElement(
                  _Button2.default,
                  { key: 'button' + i, 'data-index': '' + index, 'data-i': '' + i, 'data-direction': 'right', className: 'list-pull-button' + (button.className ? ' ' + button.className : ''), style: button.style },
                  button.value
                );
              })
            )
          );
        })
      );
    }
  }]);
  return ListPull;
}(_react.Component);

ListPull.propTypes = {
  list: _propTypes2.default.array, // [{container: node, lButtons: [{onClick: fn, value: string, className: 'warn'}], rButtons: 同lButtons}]
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  onShowedLeft: _propTypes2.default.func,
  onShowedRight: _propTypes2.default.func
};
ListPull.defaultProps = {};
exports.default = ListPull;
module.exports = exports['default'];