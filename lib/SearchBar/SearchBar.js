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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchBar = function (_Component) {
  (0, _inherits3.default)(SearchBar, _Component);

  function SearchBar(props, context) {
    (0, _classCallCheck3.default)(this, SearchBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBar.__proto__ || (0, _getPrototypeOf2.default)(SearchBar)).call(this, props, context));

    _this.componentDidUpdate = function (prevProps) {
      if (prevProps.value !== _this.props.value) {
        _this.setState({
          value: _this.props.value,
          showClear: true
        });
      }
    };

    _this.onClear = function () {
      _this.setState({
        value: '',
        showClear: false
      });
      _this.searchInput.focus();
      if (_this.props.onClear) _this.props.onClear();
    };

    _this.onChange = function () {
      if (_this.searchInput.value.length === 0) {
        _this.setState({ showClear: false });
      } else {
        _this.setState({ showClear: true });
      }
      _this.searchInput.focus();
      _this.setState({
        value: _this.searchInput.value
      });
      if (_this.props.onChange) _this.props.onChange(_this.searchInput.value);
    };

    _this.onSubmit = function (e) {
      e.preventDefault();
      _this.props.onSubmit(_this.state.value);
      _this.searchInput.blur();
    };

    _this.state = {
      value: props.value || '',
      showClear: false
    };
    return _this;
  }

  (0, _createClass3.default)(SearchBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.searchInput.focus();
      if (this.searchInput.value) {
        this.setState({
          showClear: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          style = _props.style,
          placeholder = _props.placeholder,
          onClickCancel = _props.onClickCancel;

      return _react2.default.createElement(
        'div',
        { className: 'searchbar' + (className ? ' ' + className : ''), style: style },
        _react2.default.createElement(
          'form',
          { className: 'searchbar-form', onSubmit: this.onSubmit },
          _react2.default.createElement('i', { className: 'icon searchbar-icon-search' }),
          _react2.default.createElement('input', { type: 'search', ref: function ref(input) {
              return _this2.searchInput = input;
            }, className: 'searchbar-input', placeholder: placeholder, onChange: this.onChange, value: this.state.value }),
          this.state.showClear && _react2.default.createElement('i', { className: 'searchbar-icon-clear', onClick: this.onClear })
        ),
        onClickCancel && _react2.default.createElement(
          'div',
          { className: 'searchbar-button', onClick: onClickCancel },
          '\u53D6\u6D88'
        )
      );
    }
  }]);
  return SearchBar;
}(_react.Component);

SearchBar.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string,
  onClear: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,
  onClickCancel: _propTypes2.default.func
};
exports.default = SearchBar;
module.exports = exports['default'];