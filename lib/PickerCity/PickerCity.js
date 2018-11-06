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

var _instanceData = require('./instance.data.js');

var _instanceData2 = _interopRequireDefault(_instanceData);

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickerCity = function (_Component) {
  (0, _inherits3.default)(PickerCity, _Component);

  function PickerCity(props) {
    (0, _classCallCheck3.default)(this, PickerCity);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PickerCity.__proto__ || (0, _getPrototypeOf2.default)(PickerCity)).call(this, props));

    _this.componentDidMount = function () {
      _this.initInstance();
    };

    _this.shouldComponentUpdate = function (nextProps) {
      if (nextProps.show === _this.props.show) return false;
      return true;
    };

    _this.componentDidUpdate = function (prevProps) {
      if (_this.state.instance) {
        if (_this.props.show) {
          _this.setDefault();
          _this.state.instance.show();
        } else _this.state.instance.hide();
      }
    };

    _this.setDefault = function () {
      var defaultValues = _this.getDefaults();
      _this.state.instance.setDefaults(defaultValues);
      _this.state.instance.update();
    };

    _this.getDefaults = function () {
      // 默认值
      var defaultValue = _this.props.value;
      var defaultValues = [];
      if (defaultValue) {
        defaultValues = defaultValue.split(_this.props.split).map(function (item) {
          return item.trim();
        });
      }
      return defaultValues;
    };

    _this.initInstance = function () {
      var defaultValues = _this.getDefaults();
      // render数据
      var instance = new _instance2.default({
        mask: _this.$el,
        split: _this.props.split,
        viewType: _this.props.type,
        data: _instanceData2.default,
        defaultProvince: defaultValues[0] || '',
        defaultCity: defaultValues[1] || '',
        defaultArea: defaultValues[2] || '',
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
      if (_this.props.show && instance) {
        setTimeout(function () {
          instance.show();
        }, 10);
      }
      _this.setState({
        instance: instance
      });
    };

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(PickerCity, [{
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
  return PickerCity;
}(_react.Component);

PickerCity.propTypes = {
  portal: _propTypes2.default.object,
  split: _propTypes2.default.string,
  type: _propTypes2.default.string, // area | city
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  value: _propTypes2.default.string,
  show: _propTypes2.default.bool,
  onClickMask: _propTypes2.default.func,
  onClickCancel: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func
};
PickerCity.defaultProps = {
  split: '-',
  type: 'area'
};
exports.default = PickerCity;
module.exports = exports['default'];