'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var Preview = function (_Component) {
  (0, _inherits3.default)(Preview, _Component);

  function Preview(props) {
    (0, _classCallCheck3.default)(this, Preview);
    return (0, _possibleConstructorReturn3.default)(this, (Preview.__proto__ || (0, _getPrototypeOf2.default)(Preview)).call(this, props));
  }

  (0, _createClass3.default)(Preview, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!this.instance) return false;
      if (this.props.src !== prevProps.src || this.props.layerHTML !== prevProps.layerHTML) {
        this.instance.setSrc(this.props.src);
        this.instance.setLayerHTML(this.props.layerHTML);
        this.instance.update();
      }
      if (this.props.show !== prevProps.show) {
        if (this.props.show) this.instance.show();else this.instance.hide();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.instance) return;
      var instance = new _instance2.default({
        mask: this.$el,
        showHeader: this.props.showHeader,
        src: this.props.src,
        layerHTML: this.props.layerHTML,
        onClickBack: this.props.onClickBack,
        onClick: this.props.onClickBack
      });
      this.instance = instance;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          portal = _props.portal,
          show = _props.show,
          src = _props.src,
          layerHTML = _props.layerHTML,
          onClickBack = _props.onClickBack,
          others = (0, _objectWithoutProperties3.default)(_props, ['portal', 'show', 'src', 'layerHTML', 'onClickBack']);

      if (!src) {
        return null;
      }
      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: function ref(el) {
            _this2.$el = el;
          }, className: 'preview-mask' }, others),
        _react2.default.createElement(
          'div',
          { className: 'preview-header' },
          _react2.default.createElement('div', { className: 'preview-header-back' })
        ),
        _react2.default.createElement('div', { className: 'preview-container' })
      ), portal || document.getElementById('root'));
    }
  }]);
  return Preview;
}(_react.Component);

Preview.propTypes = {
  portal: _propTypes2.default.object,
  show: _propTypes2.default.bool,
  showHeader: _propTypes2.default.bool,

  src: _propTypes2.default.string,
  layerHTML: _propTypes2.default.string,

  onClickBack: _propTypes2.default.func
};
Preview.defaultProps = {
  show: false,
  showHeader: false
};
exports.default = Preview;
module.exports = exports['default'];