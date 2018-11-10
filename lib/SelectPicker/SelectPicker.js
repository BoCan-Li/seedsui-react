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

var SelectPicker = function (_Component) {
  (0, _inherits3.default)(SelectPicker, _Component);

  function SelectPicker(props) {
    (0, _classCallCheck3.default)(this, SelectPicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectPicker.__proto__ || (0, _getPrototypeOf2.default)(SelectPicker)).call(this, props));

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
          _this.setDefaults();
          _this.state.instance.show();
        } else _this.state.instance.hide();
      }
    };

    _this.setDefaults = function () {
      var selected = _this.props.valueForKey || _this.props.value;
      var selectedName = _this.props.valueForKey ? 'key' : 'value';
      if (selected) {
        var options = selected.split(_this.props.split || ',').map(function (value) {
          for (var i = 0, li; li = _this.props.list[i++];) {
            // eslint-disable-line
            if (li[selectedName] === value) {
              return li;
            }
          }
          return {
            key: value,
            value: value
          };
        });
        _this.state.instance.setActiveOptions(options);
      } else {
        _this.state.instance.setActiveOptions([]);
      }
    };

    _this.initInstance = function () {
      if (_this.state.instance) return;
      // render数据
      var instance = new _instance2.default({
        multiple: _this.props.multiple || false,
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
        onClickOption: function onClickOption(e) {
          if (!_this.props.multiple && _this.props.onClickSubmit) _this.props.onClickSubmit(e);
        },
        onHid: function onHid(e) {}
      });
      _this.setState({
        instance: instance
      }, function () {
        _this.setDefaults();
        if (_this.props.show && instance) {
          instance.show();
        }
      });
    };

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(SelectPicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          list = _props.list,
          multiple = _props.multiple,
          className = _props.className,
          style = _props.style;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { className: 'mask picker-mask', ref: function ref(el) {
            _this2.$el = el;
          } },
        _react2.default.createElement(
          'div',
          { className: 'selectpicker' + (className ? ' ' + className : ''), style: style },
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
              { className: 'picker-submit' + (multiple ? '' : ' disabled') },
              '\u5B8C\u6210'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selectpicker-wrapper' },
            list && list.length && list.map(function (item, index) {
              return _react2.default.createElement(
                'div',
                { key: index, className: 'selectpicker-option', 'data-key': item.key, 'data-value': item.value },
                _react2.default.createElement(
                  'p',
                  { className: 'selectpicker-option-caption' },
                  item.value
                ),
                _react2.default.createElement('i', { className: 'selectpicker-option-icon' })
              );
            })
          )
        )
      ), this.props.portal || document.getElementById('root'));
    }
  }]);
  return SelectPicker;
}(_react.Component);

SelectPicker.propTypes = {
  portal: _propTypes2.default.object,
  multiple: _propTypes2.default.bool, // 是否允许多选
  list: _propTypes2.default.array, // [key: 'xx', value: 'xx']
  split: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  valueForKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  slotClassName: _propTypes2.default.string,
  show: _propTypes2.default.bool,
  onClickMask: _propTypes2.default.func,
  onClickCancel: _propTypes2.default.func,
  onClickSubmit: _propTypes2.default.func
};
SelectPicker.defaultProps = {
  split: ',',
  slotClassName: 'text-center'
};
exports.default = SelectPicker;
module.exports = exports['default'];