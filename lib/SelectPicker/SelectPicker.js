'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window._seeds_lang) window._seeds_lang = {}; // 国际化数据

var SelectPicker = function (_Component) {
  (0, _inherits3.default)(SelectPicker, _Component);

  function SelectPicker(props) {
    (0, _classCallCheck3.default)(this, SelectPicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectPicker.__proto__ || (0, _getPrototypeOf2.default)(SelectPicker)).call(this, props));

    _this.componentDidMount = function () {};

    _this.componentDidUpdate = function (prevProps) {
      if (_this.$el && _this.props.show !== prevProps.show) {
        var selectedKeys = (0, _values2.default)(_this.getSelected() || []) || [];
        [].slice.call(_this.$el.querySelectorAll('.selectpicker-option')).forEach(function (n, i) {
          if (selectedKeys.indexOf(_this.props.list[i].key) !== -1) {
            n.classList.add('active');
          } else {
            n.classList.remove('active');
          }
        });
      }
    };

    _this.getSelected = function () {
      var selected = _this.props.valueForKey || _this.props.value;
      var selectedName = _this.props.valueForKey ? 'key' : 'value';
      if (selected) {
        var options = selected.split(_this.props.split || ',').map(function (value) {
          for (var i = 0, li; li = _this.props.list[i++];) {
            // eslint-disable-line
            if (li[selectedName] === value) {
              return li.key;
            }
          }
          return '';
        });
        return options;
      } else {
        return [];
      }
    };

    _this.onClick = function (e) {
      if (e.target.classList.contains('picker-mask')) {
        // 点击遮罩
        if (_this.props.onClickMask) _this.props.onClickMask(e);
      } else if (e.target.classList.contains('selectpicker-option')) {
        // 点击项
        if (_this.props.onClickOption) _this.props.onClickOption(e);
        var index = e.target.getAttribute('data-index');
        if (!_this.props.multiple && _this.props.onClickSubmit) {
          _this.props.onClickSubmit([_this.props.list[index]], Number(index));
        } else {
          e.target.classList.toggle('active');
        }
      } else if (e.target.classList.contains('picker-submit')) {
        // 点击确定按钮
        var selected = [];
        [].slice.call(_this.$el.querySelectorAll('.selectpicker-option.active')).forEach(function (n) {
          var index = n.getAttribute('data-index');
          selected.push(_this.props.list[index]);
        });
        if (_this.props.onClickSubmit) _this.props.onClickSubmit(selected);
      } else if (e.target.classList.contains('picker-cancel')) {
        // 点击取消按钮
        if (_this.props.onClickCancel) _this.props.onClickCancel(e);
      }
    };

    return _this;
  }

  (0, _createClass3.default)(SelectPicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          show = _props.show,
          list = _props.list,
          multiple = _props.multiple,
          maskClassName = _props.maskClassName,
          maskStyle = _props.maskStyle,
          className = _props.className,
          style = _props.style;

      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { className: 'mask picker-mask' + (maskClassName ? ' ' + maskClassName : '') + (show ? ' active' : ''), style: maskStyle, ref: function ref(el) {
            _this2.$el = el;
          }, onClick: this.onClick },
        _react2.default.createElement(
          'div',
          { className: 'selectpicker' + (className ? ' ' + className : '') + (show ? ' active' : ''), style: style },
          _react2.default.createElement(
            'div',
            { className: 'picker-header' },
            _react2.default.createElement(
              'a',
              { className: 'picker-cancel' },
              window._seeds_lang['cancel'] || '取消'
            ),
            _react2.default.createElement(
              'a',
              { className: 'picker-submit' + (multiple ? '' : ' disabled') },
              window._seeds_lang['finish'] || '完成'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'selectpicker-wrapper' },
            list && list.length && list.map(function (item, index) {
              return _react2.default.createElement(
                'div',
                { key: index, className: 'selectpicker-option', 'data-index': index },
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

  maskClassName: _propTypes2.default.string,
  maskStyle: _propTypes2.default.object,
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