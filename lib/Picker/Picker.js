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

var _reactDom = require('react-dom');

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Picker = function (_Component) {
  (0, _inherits3.default)(Picker, _Component);

  function Picker(props) {
    (0, _classCallCheck3.default)(this, Picker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Picker.__proto__ || (0, _getPrototypeOf2.default)(Picker)).call(this, props));

    _this.componentDidMount = function () {
      _this.initInstance();
    };

    _this.shouldComponentUpdate = function (nextProps) {
      if (nextProps.show === _this.props.show) return false;
      return true;
    };

    _this.componentDidUpdate = function () {
      if (_this.instance) {
        if (_this.props.show) {
          _this.setDefault();
          _this.instance.show();
        } else _this.instance.hide();
      } else {
        if (_this.props.list.length > 0) {
          _this.initInstance();
        }
      }
    };

    _this.setDefault = function () {
      var _this$props = _this.props,
          valueForKey = _this$props.valueForKey,
          list = _this$props.list;

      var key = valueForKey || '';
      if (!key) {
        var defaultOpt = _this.getDefaults();
        if (defaultOpt && defaultOpt.key) key = defaultOpt.key;
      }
      _this.instance.clearSlots();
      _this.instance.addSlot(list, key || '', _this.props.slotClassName); // 添加列,参数:数据,默认key,样式(lock样式为锁定列)
    };

    _this.getDefaults = function () {
      var _this$props2 = _this.props,
          list = _this$props2.list,
          valueForKey = _this$props2.valueForKey,
          value = _this$props2.value;

      if (!valueForKey && !value) {
        if (list && list[0]) return list[0];
        return [{ key: '', value: '' }];
      }
      var values = list.filter(function (item) {
        if (valueForKey) {
          if (valueForKey === item.key) return true;
        } else if (value) {
          if (item.value === value) return true;
        }
        return false;
      });
      return values[0];
    };

    _this.initInstance = function () {
      var list = _this.props.list;

      if (!list || list.length === 0 || _this.instance) return;
      // render数据
      var instance = new _instance2.default({
        mask: _this.$el,
        onClickMask: function onClickMask(e) {
          if (_this.props.onClickMask) _this.props.onClickMask(e);
        },
        onClickCancel: function onClickCancel(e) {
          // e.hide()
          if (_this.props.onClickCancel) _this.props.onClickCancel(e);
        },
        onClickSubmit: function onClickSubmit(e) {
          // e.hide()
          if (_this.props.onClickSubmit) _this.props.onClickSubmit(e);
        },
        onHid: function onHid(e) {}
      });
      // 默认项
      var defaultOpt = _this.getDefaults();
      var key = '';
      if (defaultOpt && defaultOpt.key) key = defaultOpt.key;
      instance.addSlot(list, key, _this.props.slotClassName);
      if (_this.props.show && instance) {
        instance.show();
      }
      _this.instance = instance;
    };

    return _this;
  }

  (0, _createClass3.default)(Picker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { className: 'mask picker-mask', ref: function ref(el) {
            _this2.$el = el;
          } },
        _react2.default.createElement(
          'div',
          { className: 'picker' + (className ? ' ' + className : ''), style: style },
          _react2.default.createElement(
            'div',
            { className: 'picker-header' },
            _react2.default.createElement(
              'a',
              { className: 'picker-cancel' },
              '\u53D6\u6D88'
            ),
            _react2.default.createElement(
              'a',
              { className: 'picker-submit' },
              '\u5B8C\u6210'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'picker-wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'picker-layer' },
              _react2.default.createElement('div', { className: 'picker-layer-frame' })
            ),
            _react2.default.createElement('div', { className: 'picker-slotbox' })
          )
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return Picker;
}(_react.Component);

Picker.propTypes = {
  portal: _propTypes2.default.object,
  list: _propTypes2.default.array, // [{key: '', value: ''}]
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  slotClassName: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  valueForKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  show: _propTypes2.default.bool,
  onClickMask: _propTypes2.default.func,
  onClickCancel: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func
};
Picker.defaultProps = {
  slotClassName: 'text-center'
};
exports.default = Picker;
module.exports = exports['default'];