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

var PickerDate = function (_Component) {
  (0, _inherits3.default)(PickerDate, _Component);

  function PickerDate(props) {
    (0, _classCallCheck3.default)(this, PickerDate);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PickerDate.__proto__ || (0, _getPrototypeOf2.default)(PickerDate)).call(this, props));

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
      var def = _this.getDefault();
      _this.state.instance.setDefaults(def);
      _this.state.instance.update();
    };

    _this.getDefault = function () {
      var _this$props = _this.props,
          type = _this$props.type,
          onError = _this$props.onError;

      var defaultValue = _this.props.value;
      var defaultYear = '';
      var defaultMonth = '';
      var defaultDay = '';
      var defaultHour = '';
      var defaultMinute = '';
      // 默认值
      if (type === 'date') {
        // 如果不是合法的日期格式
        if (!defaultValue || !defaultValue.isDate()) {
          if (onError) onError('请传入合法的日期');
          defaultValue = new Date().format('yyyy-MM-dd');
        }
        var dateValues = defaultValue.split('-');
        defaultYear = dateValues[0];
        defaultMonth = dateValues[1];
        defaultDay = dateValues[2] || '01';
      } else if (type === 'month') {
        // 如果不是合法的日期格式
        if (!defaultValue.isMonth()) {
          if (onError) onError('请传入合法的年月日期');
          defaultValue = new Date().format('yyyy-MM');
        }
        var monthValues = defaultValue.split('-');
        defaultYear = monthValues[0];
        defaultMonth = monthValues[1];
      } else if (type === 'datetime') {
        // 如果不是合法的日期格式
        if (!defaultValue.isMonth()) {
          if (onError) onError('请传入合法的日期时间');
          defaultValue = new Date().format('yyyy-MM-dd hh:mm');
        }
        var values = defaultValue.split(' ');
        var _dateValues = values[0].split('-');
        var timeValues = values[1].split(':');
        defaultYear = _dateValues[0];
        defaultMonth = _dateValues[1];
        defaultDay = _dateValues[2];
        defaultHour = timeValues[0];
        defaultMinute = timeValues[1];
      } else if (type === 'time') {
        // 如果不是合法的日期格式
        if (!defaultValue.isTime()) {
          if (onError) onError('请传入合法的时间');
          defaultValue = new Date().format('hh:mm');
        }
        var _timeValues = defaultValue.split(':');
        defaultHour = _timeValues[0];
        defaultMinute = _timeValues[1];
      }
      return {
        year: defaultYear,
        month: defaultMonth,
        day: defaultDay,
        hour: defaultHour,
        minute: defaultMinute
      };
    };

    _this.getData = function () {
      // 自定义数据
      var yearsData = null;
      var monthsData = null;
      var daysData = null;
      var hoursData = null;
      var minutesData = null;
      if (_this.props.data) {
        if (_this.props.data.year) {
          yearsData = _this.props.data.year.map(function (n) {
            return {
              'key': '' + n,
              'value': '' + n + '年'
            };
          });
        }
        if (_this.props.data.month) {
          monthsData = _this.props.data.month.map(function (n) {
            return {
              'key': '' + n,
              'value': '' + n + '月'
            };
          });
        }
        if (_this.props.data.day) {
          daysData = _this.props.data.day.map(function (n) {
            return {
              'key': '' + n,
              'value': '' + n + '日'
            };
          });
        }
        if (_this.props.data.hour) {
          hoursData = _this.props.data.hour.map(function (n) {
            return {
              'key': '' + n,
              'value': '' + n + '时'
            };
          });
        }
        if (_this.props.data.minute) {
          minutesData = _this.props.data.minute.map(function (n) {
            return {
              'key': '' + n,
              'value': '' + n + '分'
            };
          });
        }
      }
      return {
        yearsData: yearsData,
        monthsData: monthsData,
        daysData: daysData,
        hoursData: hoursData,
        minutesData: minutesData
      };
    };

    _this.initInstance = function () {
      var data = _this.getData();
      var def = _this.getDefault();
      // render数据
      var instance = new _instance2.default({
        mask: _this.$el,
        viewType: _this.props.type,
        yearsData: data.yearsData,
        monthsData: data.monthsData,
        daysData: data.daysData,
        hoursData: data.hoursData,
        minutesData: data.minutesData,
        defaultYear: def.year,
        defaultMonth: def.month,
        defaultDay: def.day,
        defaultHour: def.hour,
        defaultMinute: def.minute,
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

  (0, _createClass3.default)(PickerDate, [{
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
  return PickerDate;
}(_react.Component);

PickerDate.propTypes = {
  portal: _propTypes2.default.object,
  type: _propTypes2.default.string, // 'date','month','time','datetime'
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  data: _propTypes2.default.object, // {year: [], month: [], day: [], hour: [], minute: []}
  value: _propTypes2.default.string, // 例: 2018-02-26
  show: _propTypes2.default.bool,
  onClickMask: _propTypes2.default.func,
  onClickCancel: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func,
  onError: _propTypes2.default.func
};
PickerDate.defaultProps = {
  type: 'date'
};
exports.default = PickerDate;
module.exports = exports['default'];