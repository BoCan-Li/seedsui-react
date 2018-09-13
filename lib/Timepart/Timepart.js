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

var _instance = require('./instance.js');

var _instance2 = _interopRequireDefault(_instance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timepart = function (_Component) {
  (0, _inherits3.default)(Timepart, _Component);

  function Timepart(props) {
    (0, _classCallCheck3.default)(this, Timepart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Timepart.__proto__ || (0, _getPrototypeOf2.default)(Timepart)).call(this, props));

    _this.onChange = function () {
      console.log(_this.state.instance.getActiveTimes());
      var _this$props = _this.props,
          disabledTimes = _this$props.disabledTimes,
          customTimes = _this$props.customTimes;

      if (_this.props.onChange) _this.props.onChange({
        disabledTimes: disabledTimes,
        customTimes: customTimes,
        selectedTimes: _this.state.instance.getActiveTimes()
      });
    };

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(Timepart, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (this.props.disabledTimes && prevProps.disabledTimes.length !== this.props.disabledTimes.length) {
        this.props.disabledTimes.forEach(function (time) {
          _this2.state.instance.disableTimes(time.startTime, time.endTime, time.className, time.data);
        });
      }
      if (this.props.customTimes && prevProps.customTimes.length !== this.props.customTimes.length) {
        this.props.customTimes.forEach(function (time) {
          _this2.state.instance.chooseTimes(time.startTime, time.endTime, time.className || 'active', time.data);
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var instance = new _instance2.default(this.$el, {
        startTime: this.props.startTime,
        endTime: this.props.endTime,
        onClick: function onClick(e) {},
        onConflictOver: function onConflictOver(e) {
          _this3.onError('不能跨选禁用时间段', e);
        },
        onConflictContain: function onConflictContain(e) {
          _this3.error && _this3.error('时间段冲突', e.target);
        },
        onClickActive: function onClickActive(e) {
          // 点击选中区域
          if (!_this3.props.multiple) e.removeAllActive();
        },
        onClickDisabled: function onClickDisabled(e) {// 点击禁用区域
        },
        onClickChoose: function onClickChoose(e) {
          var data = JSON.parse(e.target.getAttribute('data-progress'));
          console.log('点击选择区域，数据：{startTime:' + data.startTime + ',endTime:' + data.endTime + '}');
        },
        onClickValid: function onClickValid(s) {
          // 点击空白有效区域
          console.log('有效区域');
          console.log(s.params.activeClass);
          if (s.clickCount === 1) {
            // 如果点击了一次
            _this3.part1 = s.target;
            _this3.part1.classList.add(s.params.activeClass);
          } else if (s.clickCount === 2) {
            // 如果点击了两次
            _this3.part2 = s.target;
            // 选中
            var times = s.getTimesByParts(_this3.part1, _this3.part2);
            s.activeTimes(times.startTime, times.endTime);
          } else if (s.clickCount === 3) {
            // 如果点击了三次
            s.removeAllActive();
          }
        }
      });
      // 禁用时间
      if (this.props.disabledTimes) {
        this.props.disabledTimes.forEach(function (time) {
          instance.disableTimes(time.startTime, time.endTime, time.className, time.data);
        });
      }
      // 自定义时间
      if (this.props.customTimes) {
        this.props.customTimes.forEach(function (time) {
          instance.chooseTimes(time.startTime, time.endTime, time.className || 'active', time.data);
        });
      }
      // 选中时间
      if (this.props.selectedTimes) {
        var selectedTimes = this.props.selectedTimes;
        if (!this.props.multiple) selectedTimes = [this.props.selectedTimes[0]];
        selectedTimes.forEach(function (time) {
          instance.activeTimes(time.startTime, time.endTime, time.className || 'active', time.data);
        });
      }
      this.setState({
        instance: instance
      }, function () {
        _this3.onChange();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style;

      return _react2.default.createElement('div', { ref: function ref(el) {
          _this4.$el = el;
        }, className: 'timepart' + (className ? ' ' + className : ''), style: style });
    }
  }]);
  return Timepart;
}(_react.Component);

Timepart.propTypes = {
  multiple: _propTypes2.default.bool, // 是否支持多选
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  startTime: _propTypes2.default.string, // hh:ss
  endTime: _propTypes2.default.string,

  disabledTimes: _propTypes2.default.array, // [{startTime: 'hh:ss', endTime: 'hh:ss', className: string, data: string}]
  selectedTimes: _propTypes2.default.array, // 同上
  customTimes: _propTypes2.default.array, // 同上

  onChange: _propTypes2.default.func, // onChange({})
  onError: _propTypes2.default.func
};
Timepart.defaultProps = {
  startTime: '7:00',
  endTime: '22:00'
};
exports.default = Timepart;
module.exports = exports['default'];