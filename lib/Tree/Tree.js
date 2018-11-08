'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var Tree = function (_Component) {
  (0, _inherits3.default)(Tree, _Component);

  function Tree(props) {
    (0, _classCallCheck3.default)(this, Tree);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Tree.__proto__ || (0, _getPrototypeOf2.default)(Tree)).call(this, props));

    _this.shouldComponentUpdate = function (nextProps) {
      if (!nextProps.list.length) {
        return false;
      }
      if (_this.props.list.length !== nextProps.list.length) {
        return true;
      }
      if (!_this.$tree.children.length) {
        return true;
      }
      return false;
    };

    _this.componentDidUpdate = function () {
      var _this$props = _this.props,
          selected = _this$props.selected,
          list = _this$props.list;
      //渲染

      if (list.length) {
        // 设置已选中
        if (Array.isArray(selected) && selected.length) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(selected), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var opt = _step.value;

              _this.state.instance.addSelected(opt);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
        // 开始渲染
        _this.state.instance.setData(list);
        _this.state.instance.update();
        _this.state.instance.addAllExtand();
      }
    };

    _this.componentDidMount = function () {
      if (_this.state.instance) return;
      var _this$props2 = _this.props,
          checkbox = _this$props2.checkbox,
          bar = _this$props2.bar,
          buttonAddHTML = _this$props2.buttonAddHTML,
          buttonAddClassName = _this$props2.buttonAddClassName,
          buttonAddSrc = _this$props2.buttonAddSrc,
          onClickAdd = _this$props2.onClickAdd,
          buttonDelHTML = _this$props2.buttonDelHTML,
          buttonDelClassName = _this$props2.buttonDelClassName,
          buttonDelSrc = _this$props2.buttonDelSrc,
          onClickDel = _this$props2.onClickDel,
          onClickLastChild = _this$props2.onClickLastChild;

      var instance = new _instance2.default(_this.$tree, {
        checkbox: checkbox,
        bar: bar,
        buttonAddHTML: buttonAddHTML,
        buttonAddClassName: buttonAddClassName,
        buttonAddSrc: buttonAddSrc,
        onClickAdd: onClickAdd,
        buttonDelHTML: buttonDelHTML,
        buttonDelClassName: buttonDelClassName,
        buttonDelSrc: buttonDelSrc,
        onClickDel: onClickDel,
        onClickLastChild: onClickLastChild // 没有子节点
      });
      _this.setState({
        instance: instance
      });
    };

    _this.state = {
      instance: null
    };
    return _this;
  }

  (0, _createClass3.default)(Tree, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          treeStyle = _props.treeStyle,
          treeClassName = _props.treeClassName;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            _this2.$el = el;
          }, className: 'tree-box' + (className ? ' ' + className : ''), style: style },
        _react2.default.createElement('ul', { ref: function ref(el) {
            _this2.$tree = el;
          }, className: 'tree' + (treeClassName ? ' ' + treeClassName : ''), style: treeStyle })
      );
    }
  }]);
  return Tree;
}(_react.Component);

Tree.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  treeStyle: _propTypes2.default.object,
  treeClassName: _propTypes2.default.string,

  checkbox: _propTypes2.default.bool,
  bar: _propTypes2.default.oneOfType([// 选中栏
  _propTypes2.default.string, _propTypes2.default.node]),
  selected: _propTypes2.default.array, // [{id: '', name: '', parentid: ''}]
  list: _propTypes2.default.array, // [{id: '', name: '', parentid: ''}]

  buttonAddHTML: _propTypes2.default.string,
  buttonAddClassName: _propTypes2.default.string,
  buttonAddSrc: _propTypes2.default.string,
  onClickAdd: _propTypes2.default.func,

  buttonDelHTML: _propTypes2.default.string,
  buttonDelClassName: _propTypes2.default.string,
  buttonDelSrc: _propTypes2.default.string,
  onClickDel: _propTypes2.default.func,

  onClickLastChild: _propTypes2.default.func
};
Tree.defaultProps = {
  list: []
};
exports.default = Tree;
module.exports = exports['default'];