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

    _this.update = function () {
      if (!_this.props.times) return;
      for (var i = 0, time; time = _this.props.times[i++];) {
        // eslint-disable-line
        if (time.className && time.startTime && time.endTime) {
          _this.instance.addProgress(time.startTime, time.endTime, time.className, time.data || null, time.cover || false);
        }
      }
      // onChange
      _this.onChange();
    };

    _this.onChange = function () {
      var times = _this.instance.getTimes();
      var part = _this.instance.container.querySelector('.timepart-part.active');
      if (part) {
        times.push({
          className: part.className.replace('timepart-part ', ''),
          startTime: part.startTime,
          endTime: part.endTime,
          data: part.getAttribute('data') || ''
        });
      }
      if (_this.props.onChange) _this.props.onChange(times);
    };

    return _this;
  }

  (0, _createClass3.default)(Timepart, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.times && prevProps.times.length !== this.props.times.length) {
        this.update();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var clickCount = 0;
      var instance = new _instance2.default(this.$el, {
        startTime: this.props.startTime,
        endTime: this.props.endTime,
        onClickPart: function onClickPart(s) {
          if (s.target.classList.contains('active')) {
            s.target.classList.remove('active');
            clickCount = 0;
            // onChange
            _this2.onChange();
            return;
          }
          // 如果不允许多选,发现有已选中的先清除
          if (!_this2.props.multiple) {
            if (s.container.querySelectorAll('.progress-legend.active').length) {
              s.removeProgress('active');
              clickCount = 0;
              // onChange
              _this2.onChange();
              return;
            }
          }
          // 选中
          clickCount++;
          if (clickCount === 1) {
            // 如果点击了一次
            _this2.part1 = s.target;
            _this2.part1.classList.add('active');
            // onChange
            _this2.onChange();
          } else if (clickCount === 2) {
            // 如果点击了两次
            _this2.part1.classList.remove('active');
            _this2.part2 = s.target;
            var times = s.getTimesByParts(_this2.part1, _this2.part2);
            s.addProgress(times.startTime, times.endTime, 'active');
            clickCount = 0;
            // onChange
            _this2.onChange();
          }
        },
        onContain: function onContain(e) {
          clickCount = 0;
          if (_this2.props.onError) _this2.props.onError({ msg: '已包含其它时间段' });
        },
        onCross: function onCross(e) {
          if (_this2.props.onError) _this2.props.onError({ msg: '与其它时间段相交' });
        },
        onClickProgress: function onClickProgress(s) {
          if (s.target.classList.contains('active')) {
            // 根据data-id删除
            var id = s.target.getAttribute('data-id');
            [].slice.call(s.container.querySelectorAll('.timepart-progress[data-id="' + id + '"]')).forEach(function (el) {
              el.parentNode.removeChild(el);
            });
            // onChange
            _this2.onChange();
          }
        },
        onClickWhite: function onClickWhite(s) {}
      });
      this.instance = instance;
      this.update();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style;

      return _react2.default.createElement('div', { ref: function ref(el) {
          _this3.$el = el;
        }, className: 'timepart' + (className ? ' ' + className : ''), style: style });
    }
  }]);
  return Timepart;
}(_react.Component);

Timepart.propTypes = {
  multiple: _propTypes2.default.bool, // 是否支持多选
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,

  startTime: _propTypes2.default.string,
  endTime: _propTypes2.default.string,
  times: _propTypes2.default.array, // [{className: string, startTime: 'hh:ss', endTime: 'hh:ss', data: string, cover: bool}]

  onChange: _propTypes2.default.func, // onChange(times)
  onError: _propTypes2.default.func
};
Timepart.defaultProps = {
  startTime: '07:00',
  endTime: '22:00'
};
exports.default = Timepart;
module.exports = exports['default'];