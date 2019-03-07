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
      if (_this.instance) {
        if (_this.props.show) {
          if (_this.props.data) {
            _this.instance.setData(_this.props.data, {
              dataChildPropertyName: _this.props.dataChildPropertyName,
              dataKeyPropertyName: _this.props.dataKeyPropertyName,
              dataValuePropertyName: _this.props.dataValuePropertyName
            });
          }
          _this.setDefault();
          _this.instance.show();
        } else _this.instance.hide();
      }
    };

    _this.setDefault = function () {
      var _this$props = _this.props,
          valueForKey = _this$props.valueForKey,
          split = _this$props.split;

      if (valueForKey && valueForKey.split(split).length > 1 && valueForKey.split(split).some(function (key) {
        return !isNaN(key);
      })) {
        _this.instance.setDefaultKeys(valueForKey.split(split));
      } else {
        var defaultValues = _this.getDefaultValues();
        _this.instance.setDefaultValues(defaultValues);
      }
      _this.instance.update();
    };

    _this.getDefaultValues = function () {
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

    _this.getDefaultKeys = function () {
      var _this$props2 = _this.props,
          valueForKey = _this$props2.valueForKey,
          split = _this$props2.split;

      if (valueForKey && valueForKey.split(split).length > 1) {
        return valueForKey.split(split);
      }
      return ['', '', ''];
    };

    _this.initInstance = function () {
      var defaultValues = _this.getDefaultValues();
      var defaultKeys = _this.getDefaultKeys();
      // render数据
      var instance = new _instance2.default({
        data: _this.props.data || _instanceData2.default,
        dataKeyPropertyName: _this.props.dataKeyPropertyName,
        dataValuePropertyName: _this.props.dataValuePropertyName,
        dataChildPropertyName: _this.props.dataChildPropertyName,

        mask: _this.$el,
        split: _this.props.split,
        viewType: _this.props.type,
        defaultProvinceKey: defaultKeys[0] || '',
        defaultCityKey: defaultKeys[1] || '',
        defaultDistrictKey: defaultKeys[2] || '',
        defaultProvince: defaultValues[0] || '',
        defaultCity: defaultValues[1] || '',
        defaultDistrict: defaultValues[2] || '',
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
      _this.instance = instance;
    };

    return _this;
  }

  (0, _createClass3.default)(PickerCity, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          maskClassName = _props.maskClassName,
          maskStyle = _props.maskStyle,
          className = _props.className,
          style = _props.style;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { className: 'mask picker-mask' + (maskClassName ? ' ' + maskClassName : ''), style: maskStyle, ref: function ref(el) {
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
  data: _propTypes2.default.array,
  dataKeyPropertyName: _propTypes2.default.string,
  dataValuePropertyName: _propTypes2.default.string,
  dataChildPropertyName: _propTypes2.default.string,

  portal: _propTypes2.default.object,
  split: _propTypes2.default.string,
  type: _propTypes2.default.string, // district | city

  maskClassName: _propTypes2.default.string,
  maskStyle: _propTypes2.default.object,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  value: _propTypes2.default.string,
  valueForKey: _propTypes2.default.string,
  show: _propTypes2.default.bool,
  onClickMask: _propTypes2.default.func,
  onClickCancel: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func
};
PickerCity.defaultProps = {
  data: null,
  dataKeyPropertyName: 'key',
  dataValuePropertyName: 'value',
  dataChildPropertyName: 'children',

  split: '-',
  type: 'district'
};
exports.default = PickerCity;
module.exports = exports['default'];